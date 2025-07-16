import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnPindah } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deletePindah,
  getPenduduk,
  getPindah,
  showPindah,
  storePindah,
  updatePindah,
} from "../services/PindahRequest";
import CardProfile from "../components/CardProfile/CardProfile";
import { showPendudukAlt } from "../services/PendudukRequest";

const Pindah = () => {
  const [pindah, setPindah] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedPindah, setSelectedPindah] = useState([]);
  const [selectedPenduduk, setSelectedPenduduk] = useState([]);
  const [pendudukDropdown, setPendudukDropdown] = useState([]);
  const [isSeeModalOpen, setSeeModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [penduduk, setPenduduk] = useState("");
  const [tanggalPindah, setTanggalPindah] = useState("");
  const [alasan, setAlasan] = useState("");

  useEffect(() => {
    document.title = "Pindah";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPindah("");
      setPindah(data.data);
    };
    const loadPenduduk = async () => {
      const data = await getPenduduk();
      setPendudukDropdown(data.data);
    };
    loadData();
    loadPenduduk();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getPindah(search);
    setPindah(data.data);
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
    setTanggalPindah("");
    setAlasan("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storePindah({
      NIK: penduduk,
      tanggal_pindah: tanggalPindah,
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
    if (selectedPindah) {
      setPenduduk(selectedPindah.NIK || "");
      setTanggalPindah(selectedPindah.tanggal_pindah || "");
      setAlasan(selectedPindah.alasan || "");
    }
  }, [selectedPindah]);

  const handleEdit = async (id) => {
    setSelectedPindah([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showPindah(id);
      setSelectedPindah(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updatePindah(
      {
        NIK: penduduk,
        tanggal_pindah: tanggalPindah,
        alasan: alasan,
      },
      selectedPindah.id_pindah
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
      setSelectedPindah([]);
      const data = await showPindah(id);
      setSelectedPindah(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deletePindah(selectedPindah.id_pindah);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Mutasi`}
        breadcrumbsPath={`Pindah`}
        heading={`Kelola Pindah`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnPindah} />
          <Table.Body>
            {pindah.map((val, i) => (
              <tr key={val.id_pindah}>
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
                <td data-label="Tanggal Pindah">{val.tanggal_pindah}</td>
                <td data-label="Alasan">{val.alasan}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_pindah)}
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
                    onClick={() => handleDeleteModal(val.id_pindah)}
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
          modalTitle={`Create Pindah`}
          modalDesc={`For create pindah data.`}
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
            contentLabel={`Tanggal Pindah`}
            setValue={tanggalPindah}
            data={`create_tanggal_pindah`}
            setOnChange={(e) => setTanggalPindah(e.target.value)}
            setError={error.tanggal_pindah}
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
          modalTitle={`Edit Pindah`}
          modalDesc={`For edit pindah data.`}
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
            contentLabel={`Tanggal Pindah`}
            setValue={tanggalPindah}
            data={`update_tanggal_pindah`}
            setOnChange={(e) => setTanggalPindah(e.target.value)}
            setError={error.tanggal_pindah}
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
          modalTitle={`Delete Pindah`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedPindah.NIK ? selectedPindah.NIK : ""
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

export default Pindah;
