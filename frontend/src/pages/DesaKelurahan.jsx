import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnDesaKelurahan } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deleteDesaKelurahan,
  getDaerah,
  getDesaKelurahan,
  showDesaKelurahan,
  storeDesaKelurahan,
  updateDesaKelurahan,
} from "../services/DesaKelurahanRequest";

const DesaKelurahan = () => {
  const [desaKelurahan, setDesaKelurahan] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedDesaKelurahan, setSelectedDesaKelurahan] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [kodePos, setKodePos] = useState("");
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [kecamatan, setKecamatan] = useState("");

  useEffect(() => {
    document.title = "Desa & Kelurahan";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getDesaKelurahan("");
      setDesaKelurahan(data.data);
    };
    loadData();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getDesaKelurahan(search);
    setDesaKelurahan(data.data);
  };

  useEffect(() => {
    const loadDaerah = async () => {
      const data = await getDaerah();
      setDropdown(data.data);
    };
    loadDaerah();
  }, []);

  const handleCreateModalOpen = () => {
    setError([]);
    setKodePos("");
    setNama("");
    setJenis("");
    setKecamatan("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeDesaKelurahan({
      kode_pos: kodePos,
      nama: nama,
      jenis: jenis,
      id_kecamatan: kecamatan,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedDesaKelurahan) {
      setKodePos(selectedDesaKelurahan.kode_pos || "");
      setNama(selectedDesaKelurahan.nama || "");
      setJenis(selectedDesaKelurahan.jenis || "");
      setKecamatan(selectedDesaKelurahan.id_kecamatan || "");
    }
  }, [selectedDesaKelurahan]);

  const handleEdit = async (id) => {
    setSelectedDesaKelurahan([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showDesaKelurahan(id);
      setSelectedDesaKelurahan(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateDesaKelurahan(
      { kode_pos: kodePos, nama: nama, jenis: jenis, id_kecamatan: kecamatan },
      selectedDesaKelurahan.kode_pos
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
      setSelectedDesaKelurahan([]);
      const data = await showDesaKelurahan(id);
      setSelectedDesaKelurahan(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteDesaKelurahan(selectedDesaKelurahan.kode_pos);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Wilayah`}
        breadcrumbsPath={`Desa & Kelurahan`}
        heading={`Kelola Desa & Kelurahan`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnDesaKelurahan} />
          <Table.Body>
            {desaKelurahan.map((val, i) => (
              <tr key={val.kode_pos}>
                <td data-label="#" className="number-cell">{(i += 1)}</td>
                <td data-label="Kode Pos">{val.kode_pos}</td>
                <td data-label="Desa & Kelurahan">{val.desa_kelurahan}</td>
                <td data-label="Kecamatan">{val.nama_kecamatan}</td>
                <td data-label="Kota & Kabupaten">{val.kota_kabupaten}</td>
                <td data-label="Provinsi">{val.nama_provinsi}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.kode_pos)}
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
                    onClick={() => handleDeleteModal(val.kode_pos)}
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
          modalTitle={`Create Desa & Kelurahan`}
          modalDesc={`For create desa & kelurahan data.`}
        >
          <Field
            placeHolder={`Masukkan kode pos ...`}
            type={`numeric`}
            data={`create_kode_pos`}
            contentLabel={`Kode Pos`}
            setValue={kodePos}
            setOnChange={(e) => setKodePos(e.target.value)}
            setError={error.kode_pos}
          />
          <Field
            placeHolder={`Masukkan nama desa & kelurahan ...`}
            type={`text`}
            data={`create_desa_kelurahan`}
            contentLabel={`Desa & Kelurahan`}
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
            <option value="Desa">Desa</option>
            <option value="Kelurahan">Kelurahan</option>
          </Field>
          <Field
            type={`select`}
            data={`create_kecamatan`}
            contentLabel={`Kecamatan`}
            selectDefaultValue={``}
            setOnChange={(e) => setKecamatan(e.target.value)}
            setError={error.id_kecamatan}
          >
            <option value="" disabled hidden>
              Pilih Kecamatan
            </option>
            {dropdown.map((val) => (
              <option key={val.id_kecamatan} value={val.id_kecamatan}>
                {val.nama_kecamatan} - {val.kotakabupaten.kota_kabupaten} -{" "}
                {val.kotakabupaten.provinsi.nama_provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Desa & Kelurahan`}
          modalDesc={`For edit desa & kelurahan data.`}
        >
          <Field
            placeHolder={`Masukkan kode pos ...`}
            type={`numeric`}
            data={`update_kode_pos`}
            contentLabel={`Kode Pos`}
            setValue={kodePos}
            setOnChange={(e) => setKodePos(e.target.value)}
            setError={error.kode_pos}
          />
          <Field
            placeHolder={`Masukkan nama desa & kelurahan ...`}
            type={`text`}
            data={`update_desa_kelurahan`}
            contentLabel={`Desa & Kelurahan`}
            setValue={nama}
            setOnChange={(e) => setNama(e.target.value)}
            setError={error.nama}
          />
          <Field
            type={`select`}
            data={`create_jenis`}
            contentLabel={`Jenis`}
            selectValue={jenis}
            setOnChange={(e) => setJenis(e.target.value)}
            setError={error.jenis}
          >
            <option value="" disabled hidden>
              Pilih Jenis
            </option>
            <option value="Desa">Desa</option>
            <option value="Kelurahan">Kelurahan</option>
          </Field>
          <Field
            type={`select`}
            data={`update_kecamatan`}
            contentLabel={`Kecamatan`}
            selectValue={kecamatan}
            setOnChange={(e) => setKecamatan(e.target.value)}
            setError={error.id_kecamatan}
          >
            <option value="" disabled hidden>
              Pilih Kecamatan
            </option>
            {dropdown.map((val) => (
              <option key={val.id_kecamatan} value={val.id_kecamatan}>
                {val.nama_kecamatan} - {val.kotakabupaten.kota_kabupaten} -{" "}
                {val.kotakabupaten.provinsi.nama_provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Desa & Kelurahan`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedDesaKelurahan.nama ? selectedDesaKelurahan.nama : ""
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

export default DesaKelurahan;
