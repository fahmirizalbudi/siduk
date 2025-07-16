import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnPenduduk } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deletePenduduk,
  getPekerjaan,
  getPendidikan,
  getPenduduk,
  getTempat,
  showPenduduk,
  showPendudukAlt,
  storePenduduk,
  updatePenduduk,
} from "../services/PendudukRequest";
import CardProfile from "../components/CardProfile/CardProfile";

const Penduduk = () => {
  const [penduduk, setPenduduk] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedPenduduk, setSelectedPenduduk] = useState([]);
  const [tempatDropdown, setTempatDropdown] = useState([]);
  const [pekerjaanDropdown, setPekerjaanDropdown] = useState([]);
  const [pendidikanDropdown, setPendidikanDropdown] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSeeModalOpen, setSeeModalOpen] = useState(false);
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

  useEffect(() => {
    document.title = "Penduduk";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPenduduk("");
      setPenduduk(data.data);
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
    const data = await getPenduduk(search);
    setPenduduk(data.data);
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
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storePenduduk({
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
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedPenduduk) {
      setNIK(selectedPenduduk.NIK || "");
      setNama(selectedPenduduk.nama || "");
      setTempatLahir(selectedPenduduk.tempat_lahir || "");
      setTanggalLahir(selectedPenduduk.tanggal_lahir || "");
      setJk(selectedPenduduk.jk || "");
      setAlamat(selectedPenduduk.alamat || "");
      setAgama(selectedPenduduk.agama || "");
      setPendidikan(selectedPenduduk.id_pendidikan || "");
      setPekerjaan(selectedPenduduk.id_pekerjaan || "");
      setKewarganegaraan(selectedPenduduk.kewarganegaraan || "");
      setGolonganDarah(selectedPenduduk.golongan_darah || "");
    }
  }, [selectedPenduduk]);

  const handleEdit = async (id) => {
    setSelectedPenduduk([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showPenduduk(id);
      setSelectedPenduduk(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updatePenduduk(
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
      },
      selectedPenduduk.NIK
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
      setSelectedPenduduk([]);
      const data = await showPenduduk(id);
      setSelectedPenduduk(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deletePenduduk(selectedPenduduk.NIK);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Kependudukan`}
        breadcrumbsPath={`Penduduk`}
        heading={`Kelola Penduduk`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnPenduduk} />
          <Table.Body>
            {penduduk.map((val, i) => (
              <tr key={val.NIK}>
                <td data-label="#" className="number-cell">
                  {(i += 1)}
                </td>
                <td data-label="NIK">{val.NIK}</td>
                <td data-label="Nama">{val.nama}</td>
                <td data-label="Gender">
                  {val.jk === "L" ? "Laki - Laki" : "Perempuan"}
                </td>
                <td data-label="Alamat">{val.alamat}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="see"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSeeModalOpen(val.NIK)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.4rem"
                      height="1.4rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                  </div>
                  <div className="edit" onClick={() => handleEdit(val.NIK)}>
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
                    onClick={() => handleDeleteModal(val.NIK)}
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
          modalTitle={`Create Penduduk`}
          modalDesc={`For create penduduk data.`}
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
          </div>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Penduduk`}
          modalDesc={`For edit penduduk data.`}
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
          </div>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Penduduk`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedPenduduk.nama ? selectedPenduduk.nama : ""
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

export default Penduduk;
