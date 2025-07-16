import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnRW } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  deleteRw,
  getRw,
  showRw,
  storeRw,
  updateRw,
} from "../services/RWRequest";

const RW = () => {
  const [rw, setRw] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedRw, setSelectedRw] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    document.title = "RW";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getRw("");
      setRw(data.data);
    };
    loadData();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getRw(search);
    setRw(data.data);
  };

  const handleCreateModalOpen = () => {
    setError([]);
    setInput("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeRw({
      rw: input,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedRw) {
      setInput(selectedRw.rw || "");
    }
  }, [selectedRw]);

  const handleEdit = async (id) => {
    setSelectedRw([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showRw(id);
      setSelectedRw(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateRw({ rw: input }, selectedRw.id_rw);
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
      setSelectedRw([]);
      const data = await showRw(id);
      setSelectedRw(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteRw(selectedRw.id_rw);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Wilayah`}
        breadcrumbsPath={`RW`}
        heading={`Kelola RW`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnRW} />
          <Table.Body>
            {rw.map((val, i) => (
              <tr key={val.id_rw}>
                <td data-label="#" className="number-cell">{(i += 1)}</td>
                <td data-label="RW">{val.rw}</td>
                <td data-label="Actions" className="action-group">
                  <div className="edit" onClick={() => handleEdit(val.id_rw)}>
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
                    onClick={() => handleDeleteModal(val.id_rw)}
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
          modalTitle={`Create Rw`}
          modalDesc={`For create rw data.`}
        >
          <Field
            placeHolder={`Masukkan rw ...`}
            type={`text`}
            data={`create_rw`}
            contentLabel={`Rw`}
            setValue={input}
            setOnChange={(e) => setInput(e.target.value)}
            setError={error.rw}
          />
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Rw`}
          modalDesc={`For edit rw data.`}
        >
          <Field
            placeHolder={`Masukkan rw ...`}
            type={`text`}
            data={`update_rw`}
            contentLabel={`Rw`}
            setValue={input}
            setOnChange={(e) => setInput(e.target.value)}
            setError={error.rw}
          />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Rw`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedRw.rw ? selectedRw.rw : ""
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

export default RW;
