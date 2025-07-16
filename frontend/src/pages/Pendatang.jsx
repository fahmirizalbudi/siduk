import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnPendatang, ColumnRT } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  getPendatang,
  getTempat,
  getPendidikan,
  getPekerjaan,
  storePendatang,
  showPendatang,
  updatePendatang,
  deletePendatang,
} from "../services/PendatangRequest";
import { showPendudukAlt } from "../services/PendudukRequest";
import CardProfile from "../components/CardProfile/CardProfile";

const Pendatang = () => {
  const [pendatang, setPendatang] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedPendatang, setSelectedPendatang] = useState([]);
  const [selectedPenduduk, setSelectedPenduduk] = useState([]);
  const [isSeeModalOpen, setSeeModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tempatDropdown, setTempatDropdown] = useState([]);
  const [pekerjaanDropdown, setPekerjaanDropdown] = useState([]);
  const [pendidikanDropdown, setPendidikanDropdown] = useState([]);
  const [NIK, setNIK] = useState("");
  const [nama, setNama] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggaLahir, setTanggalLahir] = useState("");
  const [jk, setJk] = useState("");
  const [alamat, setAlamat] = useState("");
  const [agama, setAgama] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [golonganDarah, setGolonganDarah] = useState("");
  const [tanggalDatang, setTanggalDatang] = useState("");
  const [alasan, setAlasan] = useState("");

  useEffect(() => {
    document.title = "Pendatang";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPendatang("");
      setPendatang(data.data);
    };
    const loadTempat = async () => {
      const data = await getTempat();
      setTempatDropdown(data.data);
    };
    const loadPendidikan = async () => {
      const data = await getPendidikan();
      setPendidikanDropdown(data.data);
    };
    const loadPekerjaan = async () => {
      const data = await getPekerjaan();
      setPekerjaanDropdown(data.data);
    };
    loadData();
    loadTempat();
    loadPendidikan();
    loadPekerjaan();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getPendatang(search);
    setPendatang(data.data);
  };

  const handleSeeModalOpen = async (id) => {
    setSelectedPenduduk([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showPendudukAlt(id);
      setSelectedPenduduk(data.data);
      setSeeModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleCreateModalOpen = () => {
    setError([]);
    setNIK("");
    setNama("");
    setTempatLahir("");
    setTanggalLahir("");
    setJk("");
    setAgama("");
    setAlamat("");
    setPekerjaan("");
    setPendidikan("");
    setKewarganegaraan("");
    setGolonganDarah("");
    setTanggalDatang("");
    setAlasan("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storePendatang({
      NIK: NIK,
      nama: nama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggaLahir,
      jk: jk,
      alamat: alamat,
      agama: agama,
      id_pendidikan: pendidikan,
      id_pekerjaan: pekerjaan,
      kewarganegaraan: kewarganegaraan,
      golongan_darah: golonganDarah,
      tanggal_datang: tanggalDatang,
      alasan: alasan,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedPendatang) {
      setNIK(selectedPendatang.NIK || "");
      setNama(selectedPendatang.penduduk?.nama || "");
      setTempatLahir(selectedPendatang.penduduk?.tempat_lahir || "");
      setTanggalLahir(selectedPendatang.penduduk?.tanggal_lahir || "");
      setJk(selectedPendatang.penduduk?.jk || "");
      setAlamat(selectedPendatang.penduduk?.alamat || "");
      setAgama(selectedPendatang.penduduk?.agama || "");
      setPendidikan(selectedPendatang.penduduk?.id_pendidikan || "");
      setPekerjaan(selectedPendatang.penduduk?.id_pekerjaan || "");
      setKewarganegaraan(selectedPendatang.penduduk?.kewarganegaraan || "");
      setGolonganDarah(selectedPendatang.penduduk?.golongan_darah || "");
      setTanggalDatang(selectedPendatang.tanggal_datang || "");
      setAlasan(selectedPendatang.alasan || "");
    }
  }, [selectedPendatang]);

  const handleEdit = async (id) => {
    setSelectedPendatang([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showPendatang(id);
      setSelectedPendatang(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updatePendatang(
      {
        NIK: NIK,
        nama: nama,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggaLahir,
        jk: jk,
        alamat: alamat,
        agama: agama,
        id_pendidikan: pendidikan,
        id_pekerjaan: pekerjaan,
        kewarganegaraan: kewarganegaraan,
        golongan_darah: golonganDarah,
        tanggal_datang: tanggalDatang,
        alasan: alasan,
      },
      selectedPendatang.id_pendatang
    );
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setEditModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  const handleDeleteModal = async (id) => {
    setLoading(true);
    setTimeout(async () => {
      setSelectedPendatang([]);
      const data = await showPendatang(id);
      setSelectedPendatang(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deletePendatang(selectedPendatang.id_pendatang);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Mutasi`}
        breadcrumbsPath={`Pendatang`}
        heading={`Kelola Pendatang`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnPendatang} />
          <Table.Body>
            {pendatang.map((val, i) => (
              <tr key={val.id_pendatang}>
                <td data-label="#" className="number-cell">
                  {(i += 1)}
                </td>
                <td data-label="NIK">
                  <div
                    className="txt-nik"
                    onClick={() => handleSeeModalOpen(val.NIK)}
                  >
                    {val.NIK}
                  </div>
                </td>
                <td data-label="Nama">{val.penduduk.nama}</td>
                <td data-label="Tanggal Datang">{val.tanggal_datang}</td>
                <td data-label="Alasan">{val.alasan}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_pendatang)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3rem"
                      height="1.3rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                  </div>
                  <div
                    className="delete"
                    onClick={() => handleDeleteModal(val.id_pendatang)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.3rem"
                      height="1.3rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          setSubmit={handleCreate}
          modalTitle={`Create Pendatang`}
          modalDesc={`For create pendatang data.`}
          wide={true}
        >
          <div className="form-row">
            <Field
              placeHolder={`Masukkan NIK ...`}
              type={`numeric`}
              data={`create_nik`}
              contentLabel={`NIK`}
              setValue={NIK}
              setOnChange={(e) => setNIK(e.target.value)}
              setError={error.NIK}
            />
            <Field
              placeHolder={`Masukkan nama ...`}
              type={`text`}
              data={`create_nama`}
              contentLabel={`Nama`}
              setValue={nama}
              setOnChange={(e) => setNama(e.target.value)}
              setError={error.nama}
            />
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`create_tempat_lahir`}
              contentLabel={`Tempat Lahir`}
              selectDefaultValue={``}
              setOnChange={(e) => setTempatLahir(e.target.value)}
              setError={error.tempat_lahir}
            >
              <option value="" disabled hidden>
                Pilih Tempat
              </option>
              {tempatDropdown.map((val) => (
                <option
                  value={val.id_kota_kabupaten}
                  key={val.id_kota_kabupaten}
                >
                  {val.kota_kabupaten}
                </option>
              ))}
            </Field>
            <Field
              type={`date`}
              data={`create_tanggal_lahir`}
              contentLabel={`Tanggal Lahir`}
              setValue={tanggaLahir}
              setOnChange={(e) => setTanggalLahir(e.target.value)}
              setError={error.tanggal_lahir}
            />
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`create_jk`}
              contentLabel={`Gender`}
              selectDefaultValue={``}
              setOnChange={(e) => setJk(e.target.value)}
              setError={error.jk}
            >
              <option value="" disabled hidden>
                Pilih Gender
              </option>
              <option value="L">Laki - Laki</option>
              <option value="P">Perempuan</option>
            </Field>
            <Field
              placeHolder={`Masukkan alamat ...`}
              type={`text`}
              data={`create_alamat`}
              contentLabel={`Alamat`}
              setValue={alamat}
              setOnChange={(e) => setAlamat(e.target.value)}
              setError={error.alamat}
            />
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`create_agama`}
              contentLabel={`Agama`}
              selectDefaultValue={``}
              setOnChange={(e) => setAgama(e.target.value)}
              setError={error.agama}
            >
              <option value="" disabled hidden>
                Pilih Agama
              </option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Buddha">Buddha</option>
              <option value="Hindu">Hindu</option>
              <option value="Konghucu">Konghucu</option>
            </Field>
            <Field
              type={`select`}
              data={`create_pendidikan`}
              contentLabel={`Pendidikan`}
              selectDefaultValue={``}
              setOnChange={(e) => setPendidikan(e.target.value)}
              setError={error.id_pendidikan}
            >
              <option value="" disabled hidden>
                Pilih Pendidikan
              </option>
              {pendidikanDropdown.map((val) => (
                <option value={val.id_pendidikan} key={val.id_pendidikan}>
                  {val.keterangan}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`create_pekerjaan`}
              contentLabel={`Pekerjaan`}
              selectDefaultValue={``}
              setOnChange={(e) => setPekerjaan(e.target.value)}
              setError={error.id_pekerjaan}
            >
              <option value="" disabled hidden>
                Pilih Pekerjaan
              </option>
              {pekerjaanDropdown.map((val) => (
                <option value={val.id_pekerjaan} key={val.id_pekerjaan}>
                  {val.keterangan}
                </option>
              ))}
            </Field>
            <Field
              type={`select`}
              data={`create_kewarganegaraan`}
              contentLabel={`Kewarganegaraan`}
              selectDefaultValue={``}
              setOnChange={(e) => setKewarganegaraan(e.target.value)}
              setError={error.kewarganegaraan}
            >
              <option value="" disabled hidden>
                Pilih Kewarganegaraan
              </option>
              <option value="WNI">WNI</option>
              <option value="WNA">WNA</option>
            </Field>
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`create_goldar`}
              contentLabel={`Golongan Darah`}
              selectDefaultValue={``}
              setOnChange={(e) => setGolonganDarah(e.target.value)}
              setError={error.golongan_darah}
            >
              <option value="" disabled hidden>
                Pilih Golongan Darah
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="Tidak Tahu">Tidak Tahu</option>
            </Field>
            <Field
              type={`date`}
              data={`create_tanggal_datang`}
              contentLabel={`Tanggal Datang`}
              setValue={tanggalDatang}
              setOnChange={(e) => setTanggalDatang(e.target.value)}
              setError={error.tanggal_datang}
            />
          </div>
          <div className="form-row">
            <Field
              placeHolder={`Masukkan alasan ...`}
              type={`text`}
              data={`create_alasan`}
              contentLabel={`Alasan`}
              setValue={alasan}
              setOnChange={(e) => setAlasan(e.target.value)}
              setError={error.alasan}
            />
          </div>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Pendatang`}
          modalDesc={`For edit pendatang data.`}
          wide={true}
        >
          <div className="form-row">
            <Field
              placeHolder={`Masukkan NIK ...`}
              type={`numeric`}
              data={`update_nik`}
              contentLabel={`NIK`}
              setValue={NIK}
              setOnChange={(e) => setNIK(e.target.value)}
              setError={error.NIK}
            />
            <Field
              placeHolder={`Masukkan nama ...`}
              type={`text`}
              data={`update_nama`}
              contentLabel={`Nama`}
              setValue={nama}
              setOnChange={(e) => setNama(e.target.value)}
              setError={error.nama}
            />
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`update_tempat_lahir`}
              contentLabel={`Tempat Lahir`}
              selectValue={tempatLahir}
              setOnChange={(e) => setTempatLahir(e.target.value)}
              setError={error.tempat_lahir}
            >
              <option value="" disabled hidden>
                Pilih Tempat
              </option>
              {tempatDropdown.map((val) => (
                <option
                  value={val.id_kota_kabupaten}
                  key={val.id_kota_kabupaten}
                >
                  {val.kota_kabupaten}
                </option>
              ))}
            </Field>
            <Field
              type={`date`}
              data={`update_tanggal_lahir`}
              contentLabel={`Tanggal Lahir`}
              setValue={tanggaLahir}
              setOnChange={(e) => setTanggalLahir(e.target.value)}
              setError={error.tanggal_lahir}
            />
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`update_jk`}
              contentLabel={`Gender`}
              selectValue={jk}
              setOnChange={(e) => setJk(e.target.value)}
              setError={error.jk}
            >
              <option value="" disabled hidden>
                Pilih Gender
              </option>
              <option value="L">Laki - Laki</option>
              <option value="P">Perempuan</option>
            </Field>
            <Field
              placeHolder={`Masukkan alamat ...`}
              type={`text`}
              data={`update_alamat`}
              contentLabel={`Alamat`}
              setValue={alamat}
              setOnChange={(e) => setAlamat(e.target.value)}
              setError={error.alamat}
            />
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`update_agama`}
              contentLabel={`Agama`}
              selectValue={agama}
              setOnChange={(e) => setAgama(e.target.value)}
              setError={error.agama}
            >
              <option value="" disabled hidden>
                Pilih Agama
              </option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Buddha">Buddha</option>
              <option value="Hindu">Hindu</option>
              <option value="Konghucu">Konghucu</option>
            </Field>
            <Field
              type={`select`}
              data={`update_pendidikan`}
              contentLabel={`Pendidikan`}
              selectValue={pendidikan}
              setOnChange={(e) => setPendidikan(e.target.value)}
              setError={error.id_pendidikan}
            >
              <option value="" disabled hidden>
                Pilih Pendidikan
              </option>
              {pendidikanDropdown.map((val) => (
                <option value={val.id_pendidikan} key={val.id_pendidikan}>
                  {val.keterangan}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`update_pekerjaan`}
              contentLabel={`Pekerjaan`}
              selectValue={pekerjaan}
              setOnChange={(e) => setPekerjaan(e.target.value)}
              setError={error.id_pekerjaan}
            >
              <option value="" disabled hidden>
                Pilih Pekerjaan
              </option>
              {pekerjaanDropdown.map((val) => (
                <option value={val.id_pekerjaan} key={val.id_pekerjaan}>
                  {val.keterangan}
                </option>
              ))}
            </Field>
            <Field
              type={`select`}
              data={`update_kewarganegaraan`}
              contentLabel={`Kewarganegaraan`}
              selectValue={kewarganegaraan}
              setOnChange={(e) => setKewarganegaraan(e.target.value)}
              setError={error.kewarganegaraan}
            >
              <option value="" disabled hidden>
                Pilih Kewarganegaraan
              </option>
              <option value="WNI">WNI</option>
              <option value="WNA">WNA</option>
            </Field>
          </div>
          <div className="form-row">
            <Field
              type={`select`}
              data={`update_goldar`}
              contentLabel={`Golongan Darah`}
              selectValue={golonganDarah}
              setOnChange={(e) => setGolonganDarah(e.target.value)}
              setError={error.golongan_darah}
            >
              <option value="" disabled hidden>
                Pilih Golongan Darah
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="Tidak Tahu">Tidak Tahu</option>
            </Field>
            <Field
              type={`date`}
              data={`update_tanggal_datang`}
              contentLabel={`Tanggal Datang`}
              setValue={tanggalDatang}
              setOnChange={(e) => setTanggalDatang(e.target.value)}
              setError={error.tanggal_datang}
            />
          </div>
          <div className="form-row">
            <Field
              placeHolder={`Masukkan alasan ...`}
              type={`text`}
              data={`update_alasan`}
              contentLabel={`Alasan`}
              setValue={alasan}
              setOnChange={(e) => setAlasan(e.target.value)}
              setError={error.alasan}
            />
          </div>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Pendatang`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedPendatang.penduduk ? selectedPendatang.penduduk?.nama : ""
          }.`}
        />
        <Modal
          isOpen={isSeeModalOpen}
          onClose={() => setSeeModalOpen(false)}
          wide={true}
        >
          <CardProfile penduduk={selectedPenduduk || {}} />
        </Modal>
      </Layout.Main>
      {loading && (
        <Layout.Toast>
          <Toast type="loading" content="Loading ..." />
        </Layout.Toast>
      )}
    </Layout>
  );
};

export default Pendatang;
