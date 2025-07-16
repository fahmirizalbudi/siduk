import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnKecamatan } from "../utils/utils";
import {
  getKecamatan,
  getKotaKabupaten,
  storeKecamatan,
  showKecamatan,
  updateKecamatan,
  deleteKecamatan,
} from "../services/KecamatanRequest";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";

const Kecamatan = () => {
  const [kecamatan, setKecamatan] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState([]);
  const [kotaKabupatenDropdown, setKotaKabupatenDropdown] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [namaKecamatan, setNamaKecamatan] = useState("");
  const [kotaKabupaten, setKotaKabupaten] = useState("");

  useEffect(() => {
    document.title = "Kecamatan";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getKecamatan("");
      setKecamatan(data.data);
    };
    loadData();
  }, [refresh]);

  const handleSearch = async (search) => {
      const data = await getKecamatan(search);
      setKecamatan(data.data);
    };

  useEffect(() => {
    const loadKotaKabupaten = async () => {
      const data = await getKotaKabupaten();
      setKotaKabupatenDropdown(data.data);
    };
    loadKotaKabupaten();
  }, []);

  const handleCreateModalOpen = () => {
    setError([]);
    setNamaKecamatan("");
    setKotaKabupaten("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeKecamatan({
      nama_kecamatan: namaKecamatan,
      id_kota_kabupaten: kotaKabupaten,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedKecamatan) {
      setNamaKecamatan(selectedKecamatan.nama_kecamatan || "");
      setKotaKabupaten(selectedKecamatan.id_kota_kabupaten || "");
    }
  }, [selectedKecamatan]);

  const handleEdit = async (id) => {
    setSelectedKecamatan([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showKecamatan(id);
      setSelectedKecamatan(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateKecamatan(
      { nama_kecamatan: namaKecamatan, id_kota_kabupaten: kotaKabupaten },
      selectedKecamatan.id_kecamatan
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
      setSelectedKecamatan([]);
      const data = await showKecamatan(id);
      setSelectedKecamatan(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteKecamatan(selectedKecamatan.id_kecamatan);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Wilayah`}
        breadcrumbsPath={`Kecamatan`}
        heading={`Kelola Kecamatan`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnKecamatan} />
          <Table.Body>
            {kecamatan.map((val, i) => (
              <tr key={val.id_kecamatan}>
                <td data-label="#" className="number-cell">{(i += 1)}</td>
                <td data-label="Nama Kecamatan">{val.nama_kecamatan}</td>
                <td data-label="Kota & Kabupaten">{val.kotakabupaten.kota_kabupaten}</td>
                <td data-label="Provinsi">{val.kotakabupaten.provinsi.nama_provinsi}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_kecamatan)}
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
                    onClick={() => handleDeleteModal(val.id_kecamatan)}
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
          modalTitle={`Create Kecamatan`}
          modalDesc={`For create kecamatan data.`}
        >
          <Field
            placeHolder={`Masukkan nama kecamatan ...`}
            type={`text`}
            data={`create_kecamatan`}
            contentLabel={`Kecamatan`}
            setValue={namaKecamatan}
            setOnChange={(e) => setNamaKecamatan(e.target.value)}
            setError={error.nama_kecamatan}
          />
          <Field
            type={`select`}
            data={`create_kota_kabupaten`}
            contentLabel={`Kota & Kabupaten`}
            selectDefaultValue={``}
            setOnChange={(e) => setKotaKabupaten(e.target.value)}
            setError={error.id_kota_kabupaten}
          >
            <option value="" disabled hidden>
              Pilih Kota & Kabupaten
            </option>
            {kotaKabupatenDropdown.map((val) => (
              <option key={val.id_kota_kabupaten} value={val.id_kota_kabupaten}>
                {val.kota_kabupaten} - {val.provinsi.nama_provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Kecamatan`}
          modalDesc={`For edit kecamatan data.`}
        >
          <Field
            placeHolder={`Masukkan nama kecamatan ...`}
            type={`text`}
            data={`update_kecamatan`}
            contentLabel={`Kecamatan`}
            setValue={namaKecamatan}
            setOnChange={(e) => setNamaKecamatan(e.target.value)}
            setError={error.nama_kecamatan}
          />
          <Field
            type={`select`}
            data={`update_kota_kabupaten`}
            contentLabel={`Kota & Kabupaten`}
            selectValue={kotaKabupaten}
            setOnChange={(e) => setKotaKabupaten(e.target.value)}
            setError={error.id_kota_kabupaten}
          >
            <option value="" disabled hidden>
              Pilih Kota & Kabupaten
            </option>
            {kotaKabupatenDropdown.map((val) => (
              <option key={val.id_kota_kabupaten} value={val.id_kota_kabupaten}>
                {val.kota_kabupaten} - {val.provinsi.nama_provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Kecamatan`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedKecamatan.nama_kecamatan ? selectedKecamatan.nama_kecamatan : ""
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

export default Kecamatan;
