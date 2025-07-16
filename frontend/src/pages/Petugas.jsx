import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnPetugas } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deletePetugas,
  getPetugas,
  showPetugas,
  storePetugas,
  updatePetugas,
} from "../services/PetugasRequest";

const Petugas = () => {
  const [petugas, setPetugas] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedPetugas, setSelectedPetugas] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [namaPetugas, setNamaPetugas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Petugas";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPetugas("");
      setPetugas(data.data);
    };
    loadData();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getPetugas(search);
    setPetugas(data.data);
  };

  const handleCreateModalOpen = () => {
    setError([]);
    setNamaPetugas("");
    setUsername("");
    setPassword("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storePetugas({
      nama_petugas: namaPetugas,
      username: username,
      password: password,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedPetugas) {
      setNamaPetugas(selectedPetugas.nama_petugas || "");
      setUsername(selectedPetugas.username || "");
      setPassword("");
    }
  }, [selectedPetugas]);

  const handleEdit = async (id) => {
    setSelectedPetugas([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showPetugas(id);
      setSelectedPetugas(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updatePetugas(
      {
        nama_petugas: namaPetugas,
        username: username,
        password: password,
      },
      selectedPetugas.id_petugas
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
      setSelectedPetugas([]);
      const data = await showPetugas(id);
      setSelectedPetugas(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deletePetugas(selectedPetugas.id_petugas);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Pengguna`}
        breadcrumbsPath={`Petugas`}
        heading={`Kelola Petugas`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnPetugas} />
          <Table.Body>
            {petugas.map((val, i) => (
              <tr key={val.id_petugas}>
                <td data-label="#" className="number-cell">
                  {(i += 1)}
                </td>
                <td data-label="Nama Petugas">{val.nama_petugas}</td>
                <td data-label="Username">{val.username}</td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="edit"
                    onClick={() => handleEdit(val.id_petugas)}
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
                    onClick={() => handleDeleteModal(val.id_petugas)}
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
          modalTitle={`Create Petugas`}
          modalDesc={`For create petugas data.`}
        >
          <Field
            placeHolder={`Masukkan nama petugas ...`}
            type={`text`}
            data={`create_nape`}
            contentLabel={`Nama Petugas`}
            setValue={namaPetugas}
            setOnChange={(e) => setNamaPetugas(e.target.value)}
            setError={error.nama_petugas}
          />
          <Field
            placeHolder={`Masukkan username ...`}
            type={`text`}
            data={`create_username`}
            contentLabel={`Username`}
            setValue={username}
            setOnChange={(e) => setUsername(e.target.value)}
            setError={error.username}
          />
          <Field
            placeHolder={`Masukkan password ...`}
            type={`text`}
            data={`create_password`}
            contentLabel={`Password`}
            setValue={password}
            setOnChange={(e) => setPassword(e.target.value)}
            setError={error.password}
          />
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Petugas`}
          modalDesc={`For edit petugas data.`}
        >
          <Field
            placeHolder={`Masukkan nama petugas ...`}
            type={`text`}
            data={`update_nape`}
            contentLabel={`Nama Petugas`}
            setValue={namaPetugas}
            setOnChange={(e) => setNamaPetugas(e.target.value)}
            setError={error.nama_petugas}
          />
          <Field
            placeHolder={`Masukkan username ...`}
            type={`text`}
            data={`update_username`}
            contentLabel={`Username`}
            setValue={username}
            setOnChange={(e) => setUsername(e.target.value)}
            setError={error.username}
          />
          <Field
            placeHolder={`Masukkan password ...`}
            type={`text`}
            data={`update_password`}
            contentLabel={`Password`}
            setValue={password}
            setOnChange={(e) => setPassword(e.target.value)}
            setError={error.password}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Petugas`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedPetugas.username ? selectedPetugas.username : ""
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

export default Petugas;
