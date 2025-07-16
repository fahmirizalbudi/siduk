import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnDetailKeluarga } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deleteDetail,
  getAyah,
  getDetail,
  getIbu,
  getNIK,
  showDetail,
  storeDetail,
  updateDetail,
} from "../services/DetailKeluargaRequest";
import { useParams } from "react-router-dom";
import { showPendudukAlt } from "../services/PendudukRequest";
import CardProfile from "../components/CardProfile/CardProfile";

const DetailKeluarga = () => {
  const [detailKeluarga, setDetailKeluarga] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState([]);
  const [selectedPenduduk, setSelectedPenduduk] = useState([]);
  const [NIKDropdown, setNIKDropdown] = useState([]);
  const [ayahDropdown, setAyahDropdown] = useState([]);
  const [ibuDropdown, setIbuDropdown] = useState([]);
  const [isSeeModalOpen, setSeeModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const [NIK, setNIK] = useState("");
  const [statusHubungan, setStatusHubungan] = useState("");
  const [ayah, setAyah] = useState("");
  const [ibu, setIbu] = useState("");

  useEffect(() => {
    document.title = `Detail Keluarga ${
      detailKeluarga?.find((val) => val.status_hubungan === "Kepala Keluarga")
        ?.nama || `No KK : ${id}`
    }`;
  }, [detailKeluarga]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getDetail(id);
      setDetailKeluarga(data.data);
    };
    const loadNIK = async () => {
      const data = await getNIK();
      setNIKDropdown(data.data);
    };
    const loadAyah = async () => {
      const data = await getAyah();
      setAyahDropdown(data.data);
    };
    const loadIbu = async () => {
      const data = await getIbu();
      setIbuDropdown(data.data);
    };
    loadData();
    loadNIK();
    loadAyah();
    loadIbu();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getDetail(id, search);
    setDetailKeluarga(data.data);
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
    setStatusHubungan("");
    setAyah("");
    setIbu("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeDetail({
      NOKK: id,
      NIK: NIK,
      status_hubungan: statusHubungan,
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
    if (selectedDetail) {
      setNIK(selectedDetail.NIK || "");
      setStatusHubungan(selectedDetail.status_hubungan || "");
      setAyah(selectedDetail.nik_ayah || "");
      setIbu(selectedDetail.nik_ibu || "");
    }
  }, [selectedDetail]);

  const handleEdit = async (id) => {
    setSelectedDetail([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showDetail(id);
      setSelectedDetail(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateDetail(
      {
        NOKK: id,
        NIK: NIK,
        status_hubungan: statusHubungan,
        nik_ayah: ayah,
        nik_ibu: ibu,
      },
      selectedDetail.id
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
      setSelectedDetail([]);
      const data = await showDetail(id);
      setSelectedDetail(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteDetail(selectedDetail.id);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Keluarga`}
        breadcrumbsPath={`No KK : ${id}`}
        heading={`Keluarga ${
          detailKeluarga?.find(
            (val) => val.status_hubungan === "Kepala Keluarga"
          )?.nama || `No KK : ${id}`
        }`}
        navigateTo={`/admin/keluarga`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnDetailKeluarga} />
          <Table.Body>
            {detailKeluarga.map((val, i) => (
              <tr key={val.NIK}>
                <td data-label="#" className="number-cell">
                  {(i += 1)}
                </td>
                <td data-label="NIK">{val.NIK}</td>
                <td data-label="Nama">{val.nama}</td>
                <td data-label="Gender">{val.gender}</td>
                <td data-label="Status Hubungan">{val.status_hubungan}</td>
                <td data-label="Ayah">{val.ayah}</td>
                <td data-label="Ibu">{val.ibu}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="selengkapnya"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSeeModalOpen(val.NIK)}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-user-screen"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19.03 17.818a3 3 0 0 0 1.97 -2.818v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8c0 1.317 .85 2.436 2.03 2.84" />
                      <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M8 21a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
                    </svg>
                  </div>
                  <div className="edit" onClick={() => handleEdit(val.id)}>
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
                    onClick={() => handleDeleteModal(val.id)}
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
          modalTitle={`Create Detail Keluarga`}
          modalDesc={`For create detail keluarga data.`}
        >
          <Field
            type={`select`}
            data={`create_nik`}
            contentLabel={`NIK`}
            selectDefaultValue={``}
            setOnChange={(e) => setNIK(e.target.value)}
            setError={error.NIK}
          >
            <option value="" disabled hidden>
              Pilih NIK
            </option>
            {NIKDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama} - {val.status}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`create_status_hubungan`}
            contentLabel={`Status Hubungan`}
            selectDefaultValue={``}
            setOnChange={(e) => setStatusHubungan(e.target.value)}
            setError={error.status_hubungan}
          >
            <option value="" disabled hidden>
              Pilih Status Hubungan
            </option>
            <option value="Kepala Keluarga">Kepala Keluarga</option>
            <option value="Istri">Istri</option>
            <option value="Anak">Anak</option>
            <option value="Menantu">Menantu</option>
            <option value="Cucu">Cucu</option>
            <option value="Orang Tua">Orang Tua</option>
            <option value="Mertua">Mertua</option>
            <option value="Famili Lain">Famili Lain</option>
          </Field>
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
                {val.NIK} - {val.nama} - {val.status}
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
                {val.NIK} - {val.nama} - {val.status}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Detail Keluarga`}
          modalDesc={`For edit detail keluarga data.`}
        >
          <Field
            type={`select`}
            data={`update_nik`}
            contentLabel={`NIK`}
            selectValue={NIK}
            setOnChange={(e) => setNIK(e.target.value)}
            setError={error.NIK}
          >
            <option value="" disabled hidden>
              Pilih NIK
            </option>
            {NIKDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama} - {val.status}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`update_status_hubungan`}
            contentLabel={`Status Hubungan`}
            selectValue={statusHubungan}
            setOnChange={(e) => setStatusHubungan(e.target.value)}
            setError={error.status_hubungan}
          >
            <option value="" disabled hidden>
              Pilih Status Hubungan
            </option>
            <option value="Kepala Keluarga">Kepala Keluarga</option>
            <option value="Istri">Istri</option>
            <option value="Anak">Anak</option>
            <option value="Menantu">Menantu</option>
            <option value="Cucu">Cucu</option>
            <option value="Orang Tua">Orang Tua</option>
            <option value="Mertua">Mertua</option>
            <option value="Famili Lain">Famili Lain</option>
          </Field>
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
                {val.NIK} - {val.nama} - {val.status}
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
                {val.NIK} - {val.nama} - {val.status}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Detail Keluarga`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedDetail.NIK ? selectedDetail.NIK : ""
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

export default DetailKeluarga;
