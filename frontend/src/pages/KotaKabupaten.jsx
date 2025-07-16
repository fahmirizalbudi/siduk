import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnKotaKabupaten } from "../utils/utils";
import {
  getKotaKabupaten,
  getProvinsi,
  storeKotaKabupaten,
  showKotaKabupaten,
  updateKotaKabupaten,
  deleteKotaKabupaten,
} from "../services/KotaKabupatenRequest";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";

const KotaKabupaten = () => {
  const [kotaKabupaten, setKotaKabupaten] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedKotaKabupaten, setSelectedKotaKabupaten] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [provinsiDropdown, setProvinsiDropdown] = useState([]);
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [provinsi, setProvinsi] = useState("");

  useEffect(() => {
    document.title = "Kota & Kabupaten";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getKotaKabupaten("");
      setKotaKabupaten(data.data);
    };
    loadData();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getKotaKabupaten(search);
    setKotaKabupaten(data.data);
  };

  useEffect(() => {
    const loadProvinsi = async () => {
      const data = await getProvinsi();
      setProvinsiDropdown(data.data);
    };
    loadProvinsi();
  }, []);

  const handleCreateModalOpen = () => {
    setNama("");
    setJenis("");
    setProvinsi("");
    setError([]);
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeKotaKabupaten({
      nama: nama,
      jenis: jenis,
      id_provinsi: provinsi,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedKotaKabupaten) {
      setProvinsi(selectedKotaKabupaten.id_provinsi || "");
      setNama(selectedKotaKabupaten.nama || "");
      setJenis(String(selectedKotaKabupaten.jenis) || "");
    }
  }, [selectedKotaKabupaten]);

  const handleEdit = async (id) => {
    setSelectedKotaKabupaten([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showKotaKabupaten(id);
      setSelectedKotaKabupaten(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateKotaKabupaten(
      { nama: nama, jenis: jenis, id_provinsi: provinsi },
      selectedKotaKabupaten.id_kota_kabupaten
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
      setSelectedKotaKabupaten([]);
      const data = await showKotaKabupaten(id);
      setSelectedKotaKabupaten(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteKotaKabupaten(selectedKotaKabupaten.id_kota_kabupaten);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Wilayah`}
        breadcrumbsPath={`Kota & Kabupaten`}
        heading={`Kelola Kota & Kabupaten`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnKotaKabupaten} />
          <Table.Body>
            {kotaKabupaten.map((val, i) => (
              <tr key={val.id_kota_kabupaten}>
                <td data-label="#" className="number-cell">{(i += 1)}</td>
                <td data-label="Kota & Kabupaten">{val.kota_kabupaten}</td>
                <td data-label="Provinsi">{val.provinsi.nama_provinsi}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_kota_kabupaten)}
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
                    onClick={() => handleDeleteModal(val.id_kota_kabupaten)}
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
          modalTitle={`Create Kota & Kabupaten`}
          modalDesc={`For create kota & kabupaten data.`}
        >
          <Field
            placeHolder={`Masukkan nama kota & kabupaten ...`}
            type={`text`}
            data={`create_nama`}
            contentLabel={`Nama`}
            setValue={nama}
            setOnChange={(e) => setNama(e.target.value)}
            setError={error.nama}
          />
          <Field
            type={`select`}
            data={`create_jenis`}
            contentLabel={`Jenis`}
            selectDefaultValue={``}
            setOnChange={(e) => setJenis(e.target.value)}
            setError={error.jenis}
          >
            <option value="" disabled hidden>
              Pilih Jenis
            </option>
            <option value="Kota">Kota</option>
            <option value="Kabupaten">Kabupaten</option>
          </Field>
          <Field
            type={`select`}
            data={`create_provinsi`}
            contentLabel={`Provinsi`}
            selectDefaultValue={``}
            setOnChange={(e) => setProvinsi(e.target.value)}
            setError={error.id_provinsi}
          >
            <option value="" disabled hidden>
              Pilih Provinsi
            </option>
            {provinsiDropdown.map((val) => (
              <option key={val.id_provinsi} value={val.id_provinsi}>
                {val.nama_provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Create Kota & Kabupaten`}
          modalDesc={`For create kota & kabupaten data.`}
        >
          <Field
            placeHolder={`Masukkan nama kota & kabupaten ...`}
            type={`text`}
            data={`edit_nama`}
            contentLabel={`Nama`}
            setValue={nama}
            setOnChange={(e) => setNama(e.target.value)}
            setError={error.nama}
          />
          <Field
            type={`select`}
            data={`edit_jenis`}
            contentLabel={`Jenis`}
            selectValue={jenis}
            setOnChange={(e) => setJenis(e.target.value)}
            setError={error.jenis}
          >
            <option value="" disabled hidden>
              Pilih Jenis
            </option>
            <option value="Kota">Kota</option>
            <option value="Kabupaten">Kabupaten</option>
          </Field>
          <Field
            type={`select`}
            data={`edit_provinsi`}
            contentLabel={`Provinsi`}
            selectValue={provinsi}
            setOnChange={(e) => setProvinsi(e.target.value)}
            setError={error.id_provinsi}
          >
            <option value="" disabled hidden>
              Pilih Provinsi
            </option>
            {provinsiDropdown.map((val) => (
              <option key={val.id_provinsi} value={val.id_provinsi}>
                {val.nama_provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Kota & Kabupaten`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedKotaKabupaten.nama ? selectedKotaKabupaten.nama : ""
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

export default KotaKabupaten;
