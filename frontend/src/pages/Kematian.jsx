import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnKematian } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deleteKematian,
  getKematian,
  getPenduduk,
  showKematian,
  storeKematian,
  updateKematian,
} from "../services/KematianRequest";
import { showPendudukAlt } from "../services/PendudukRequest";
import CardProfile from "../components/CardProfile/CardProfile";

const Kematian = () => {
  const [kematian, setKematian] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedKematian, setSelectedKematian] = useState([]);
  const [selectedPenduduk, setSelectedPenduduk] = useState([]);
  const [pendudukDropdown, setPendudukDropdown] = useState([]);
  const [isSeeModalOpen, setSeeModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [penduduk, setPenduduk] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [alasan, setAlasan] = useState("");

  useEffect(() => {
    document.title = "Kematian";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getKematian("");
      setKematian(data.data);
    };
    const loadPenduduk = async () => {
      const data = await getPenduduk();
      setPendudukDropdown(data.data);
    };
    loadData();
    loadPenduduk();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getKematian(search);
    setKematian(data.data);
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
    setPenduduk("");
    setTanggal("");
    setAlasan("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeKematian({
      NIK: penduduk,
      tanggal: tanggal,
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
    if (selectedKematian) {
      setPenduduk(selectedKematian.NIK || "");
      setTanggal(selectedKematian.tanggal || "");
      setAlasan(selectedKematian.alasan || "");
    }
  }, [selectedKematian]);

  const handleEdit = async (id) => {
    setSelectedKematian([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showKematian(id);
      setSelectedKematian(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateKematian(
      {
        NIK: penduduk,
        tanggal: tanggal,
        alasan: alasan,
      },
      selectedKematian.id_kematian
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
      setSelectedKematian([]);
      const data = await showKematian(id);
      setSelectedKematian(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteKematian(selectedKematian.id_kematian);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Kependudukan`}
        breadcrumbsPath={`Kematian`}
        heading={`Kelola Kematian`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnKematian} />
          <Table.Body>
            {kematian.map((val, i) => (
              <tr key={val.id_kematian}>
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
                <td data-label="Nama">{val.viewpenduduk.nama}</td>
                <td data-label="Gender">
                  {val.viewpenduduk.jk === "L" ? "Laki - Laki" : "Perempuan"}
                </td>
                <td data-label="Agama">{val.viewpenduduk.agama}</td>
                <td data-label="Tanggal Meninggal">{val.tanggal}</td>
                <td data-label="Alasan">{val.alasan}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_kematian)}
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
                    onClick={() => handleDeleteModal(val.id_kematian)}
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
          modalTitle={`Create Kematian`}
          modalDesc={`For create kematian data.`}
        >
          <Field
            type={`select`}
            data={`create_penduduk`}
            contentLabel={`Penduduk`}
            selectDefaultValue={``}
            setOnChange={(e) => setPenduduk(e.target.value)}
            setError={error.NIK}
          >
            <option value="" disabled hidden>
              Pilih Penduduk
            </option>
            {pendudukDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama}
              </option>
            ))}
          </Field>
          <Field
            type={`date`}
            contentLabel={`Tanggal`}
            setValue={tanggal}
            data={`create_tanggal`}
            setOnChange={(e) => setTanggal(e.target.value)}
            setError={error.tanggal}
          />
          <Field
            placeHolder={`Masukkan alasan ...`}
            type={`text`}
            data={`create_alasan`}
            contentLabel={`Alasan`}
            setValue={alasan}
            setOnChange={(e) => setAlasan(e.target.value)}
            setError={error.alasan}
          />
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Kematian`}
          modalDesc={`For edit kematian data.`}
        >
          <Field
            type={`select`}
            data={`update_penduduk`}
            contentLabel={`Penduduk`}
            selectValue={penduduk}
            setOnChange={(e) => setPenduduk(e.target.value)}
            setError={error.NIK}
          >
            <option value="" disabled hidden>
              Pilih Penduduk
            </option>
            {pendudukDropdown.map((val) => (
              <option value={val.NIK} key={val.NIK}>
                {val.NIK} - {val.nama}
              </option>
            ))}
          </Field>
          <Field
            type={`date`}
            contentLabel={`Tanggal`}
            setValue={tanggal}
            data={`update_tanggal`}
            setOnChange={(e) => setTanggal(e.target.value)}
            setError={error.tanggal}
          />
          <Field
            placeHolder={`Masukkan alasan ...`}
            type={`text`}
            data={`update_alasan`}
            contentLabel={`Alasan`}
            setValue={alasan}
            setOnChange={(e) => setAlasan(e.target.value)}
            setError={error.alasan}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Kematian`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedKematian.NIK ? selectedKematian.NIK : ""
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

export default Kematian;
