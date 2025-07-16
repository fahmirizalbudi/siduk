import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnPekerjaan } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import { deletePekerjaan, getPekerjaan, showPekerjaan, storePekerjaan, updatePekerjaan } from "../services/PekerjaanRequest";

const Pekerjaan = () => {
  const [pekerjaan, setPekerjaan] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedPekerjaan, setSelectedPekerjaan] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    document.title = "Pekerjaan";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPekerjaan("");
      setPekerjaan(data.data);
    };
    loadData();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getPekerjaan(search);
    setPekerjaan(data.data);
  };

  const handleCreateModalOpen = () => {
    setError([]);
    setInput("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storePekerjaan({
      keterangan: input,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedPekerjaan) {
      setInput(selectedPekerjaan.keterangan || "");
    }
  }, [selectedPekerjaan]);

  const handleEdit = async (id) => {
    setSelectedPekerjaan([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showPekerjaan(id);
      setSelectedPekerjaan(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updatePekerjaan({ keterangan: input }, selectedPekerjaan.id_pekerjaan);
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
      setSelectedPekerjaan([]);
      const data = await showPekerjaan(id);
      setSelectedPekerjaan(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deletePekerjaan(selectedPekerjaan.id_pekerjaan);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Riwayat`}
        breadcrumbsPath={`Pekerjaan`}
        heading={`Kelola Pekerjaan`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnPekerjaan} />
          <Table.Body>
            {pekerjaan.map((val, i) => (
              <tr key={val.id_pekerjaan}>
                <td data-label="#" className="number-cell">{(i += 1)}</td>
                <td data-label="Keterangan">{val.keterangan}</td>
                <td data-label="Actions" className="action-group">
                  <div className="edit" onClick={() => handleEdit(val.id_pekerjaan)}>
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
                    onClick={() => handleDeleteModal(val.id_pekerjaan)}
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
          modalTitle={`Create Pekerjaan`}
          modalDesc={`For create pekerjaan data.`}
        >
          <Field
            placeHolder={`Masukkan pekerjaan ...`}
            type={`text`}
            data={`create_pekerjaan`}
            contentLabel={`Pekerjaan`}
            setValue={input}
            setOnChange={(e) => setInput(e.target.value)}
            setError={error.keterangan}
          />
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Pekerjaan`}
          modalDesc={`For edit pekerjaan data.`}
        >
          <Field
            placeHolder={`Masukkan pekerjaan ...`}
            type={`text`}
            data={`update_pekerjaan`}
            contentLabel={`Pekerjaan`}
            setValue={input}
            setOnChange={(e) => setInput(e.target.value)}
            setError={error.keterangan}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Pekerjaan`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedPekerjaan.pekerjaan ? selectedPekerjaan.pekerjaan : ""
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

export default Pekerjaan;