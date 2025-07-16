import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnKelahiran } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deleteKelahiran,
  getAyah,
  getIbu,
  getKelahiran,
  showKelahiran,
  storeKelahiran,
  updateKelahiran,
} from "../services/KelahiranRequest";

const Kelahiran = () => {
  const [kelahiran, setKelahiran] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedKelahiran, setSelectedKelahiran] = useState([]);
  const [ayahDropdown, setAyahDropdown] = useState([]);
  const [ibuDropdown, setIbuDropdown] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [tempat, setTempat] = useState("");
  const [ayah, setAyah] = useState("");
  const [ibu, setIbu] = useState("");

  useEffect(() => {
    document.title = "Kelahiran";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getKelahiran("");
      setKelahiran(data.data);
    };
    const loadAyah = async () => {
      const data = await getAyah("");
      setAyahDropdown(data.data);
    };
    const loadIbu = async () => {
      const data = await getIbu("");
      setIbuDropdown(data.data);
    };
    loadData();
    loadAyah();
    loadIbu();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getKelahiran(search);
    setKelahiran(data.data);
  };

  const handleCreateModalOpen = () => {
    setError([]);
    setNama("");
    setTanggalLahir("");
    setTempat("");
    setAyah("");
    setIbu("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeKelahiran({
      nama: nama,
      tanggal_lahir: tanggalLahir,
      tempat: tempat,
      nik_ayah: ayah,
      nik_ibu: ibu,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedKelahiran) {
      setNama(selectedKelahiran.nama || "");
      setTanggalLahir(selectedKelahiran.tanggal_lahir || "");
      setTempat(selectedKelahiran.tempat || "");
      setAyah(selectedKelahiran.nik_ayah || "");
      setIbu(selectedKelahiran.nik_ibu || "");
    }
  }, [selectedKelahiran]);

  const handleEdit = async (id) => {
    setSelectedKelahiran([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showKelahiran(id);
      setSelectedKelahiran(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateKelahiran(
      {
        nama: nama,
        tanggal_lahir: tanggalLahir,
        tempat: tempat,
        nik_ayah: ayah,
        nik_ibu: ibu,
      },
      selectedKelahiran.id_kelahiran
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
      setSelectedKelahiran([]);
      const data = await showKelahiran(id);
      setSelectedKelahiran(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteKelahiran(selectedKelahiran.id_kelahiran);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Kependudukan`}
        breadcrumbsPath={`Kelahiran`}
        heading={`Kelola Kelahiran`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnKelahiran} />
          <Table.Body>
            {kelahiran.map((val, i) => (
              <tr key={val.id_kelahiran}>
                <td data-label="#" className="number-cell">
                  {(i += 1)}
                </td>
                <td data-label="Nama">{val.nama}</td>
                <td data-label="Tanggal Lahir">{val.tanggal_lahir}</td>
                <td data-label="Tempat">{val.tempat}</td>
                <td data-label="Ayah">{val.ayah}</td>
                <td data-label="Ibu">{val.ibu}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_kelahiran)}
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
                    onClick={() => handleDeleteModal(val.id_kelahiran)}
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
          modalTitle={`Create Kelahiran`}
          modalDesc={`For create kelahiran data.`}
        >
          <Field
            placeHolder={`Masukkan nama ...`}
            type={`text`}
            data={`create_nama`}
            contentLabel={`Nama`}
            setValue={nama}
            setOnChange={(e) => setNama(e.target.value)}
            setError={error.nama}
          />
          <Field
            type={`date`}
            contentLabel={`Tanggal Lahir`}
            setValue={tanggalLahir}
            data={`create_tanggal_lahir`}
            setOnChange={(e) => setTanggalLahir(e.target.value)}
            setError={error.tanggal_lahir}
          />
          <Field
            placeHolder={`Masukkan tempat ...`}
            type={`text`}
            data={`create_tempat`}
            contentLabel={`Tempat`}
            setValue={tempat}
            setOnChange={(e) => setTempat(e.target.value)}
            setError={error.tempat}
          />
          <Field
            type={`select`}
            data={`create_ayah`}
            contentLabel={`Ayah`}
            selectDefaultValue={``}
            setOnChange={(e) => setAyah(e.target.value)}
            setError={error.nik_ayah}
          >
            <option value="" disabled hidden>
              Pilih Ayah
            </option>
            {ayahDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`create_ibu`}
            contentLabel={`Ibu`}
            selectDefaultValue={``}
            setOnChange={(e) => setIbu(e.target.value)}
            setError={error.nik_ibu}
          >
            <option value="" disabled hidden>
              Pilih Ibu
            </option>
            {ibuDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Kelahiran`}
          modalDesc={`For edit kelahiran data.`}
        >
          <Field
            placeHolder={`Masukkan nama ...`}
            type={`text`}
            data={`update_nama`}
            contentLabel={`Nama`}
            setValue={nama}
            setOnChange={(e) => setNama(e.target.value)}
            setError={error.nama}
          />
          <Field
            type={`date`}
            contentLabel={`Tanggal Lahir`}
            setValue={tanggalLahir}
            data={`update_tanggal_lahir`}
            setOnChange={(e) => setTanggalLahir(e.target.value)}
            setError={error.tanggal_lahir}
          />
          <Field
            placeHolder={`Masukkan tempat ...`}
            type={`text`}
            data={`update_tempat`}
            contentLabel={`Tempat`}
            setValue={tempat}
            setOnChange={(e) => setTempat(e.target.value)}
            setError={error.tempat}
          />
          <Field
            type={`select`}
            data={`update_ayah`}
            contentLabel={`Ayah`}
            selectValue={ayah}
            setOnChange={(e) => setAyah(e.target.value)}
            setError={error.nik_ayah}
          >
            <option value="" disabled hidden>
              Pilih Ayah
            </option>
            {ayahDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`update_ibu`}
            contentLabel={`Ibu`}
            selectValue={ibu}
            setOnChange={(e) => setIbu(e.target.value)}
            setError={error.nik_ibu}
          >
            <option value="" disabled hidden>
              Pilih Ibu
            </option>
            {ibuDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Kelahiran`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedKelahiran.nama ? selectedKelahiran.nama : ""
          }.`}
        />
      </Layout.Main>
      {loading && (
        <Layout.Toast>
          <Toast type="loading" content="Loading ..." />
        </Layout.Toast>
      )}
    </Layout>
  );
};

export default Kelahiran;
