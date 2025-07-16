import Layout from "../layouts/Layout";
import Table from "../components/Table/Table";
import { ColumnKeluarga } from "../utils/utils";
import { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import PageHeader from "../components/PageHeader/PageHeader";
import Field from "../components/Field/Field";
import Toast from "../components/Toast/Toast";
import {
  getKeluarga,
  getRw,
  getRt,
  getDaerah,
  storeKeluarga,
  showKeluarga,
  updateKeluarga,
  deleteKeluarga,
} from "../services/KeluargaRequest";

const Keluarga = () => {
  const [keluarga, setKeluarga] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [selectedKeluarga, setSelectedKeluarga] = useState([]);
  const [rtDropdown, setRtDropdown] = useState([]);
  const [rwDropdown, setRwDropdown] = useState([]);
  const [daerahDropdown, setDaerahDropdown] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [NOKK, setNOKK] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [daerah, setDaerah] = useState("");

  useEffect(() => {
    document.title = "Keluarga";
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getKeluarga("");
      setKeluarga(data.data);
    };
    const loadRt = async () => {
      const data = await getRt();
      setRtDropdown(data.data);
    };
    const loadRw = async () => {
      const data = await getRw();
      setRwDropdown(data.data);
    };
    const loadDaerah = async () => {
      const data = await getDaerah();
      setDaerahDropdown(data.data);
    };
    loadData();
    loadRt();
    loadRw();
    loadDaerah();
  }, [refresh]);

  const handleSearch = async (search) => {
    const data = await getKeluarga(search);
    setKeluarga(data.data);
  };

  const handleCreateModalOpen = () => {
    setError([]);
    setNOKK("");
    setAlamat("");
    setRt("");
    setRw("");
    setDaerah("");
    setCreateModalOpen(true);
  };

  const handleCreate = async () => {
    const res = await storeKeluarga({
      NOKK: NOKK,
      alamat: alamat,
      id_rt: rt,
      id_rw: rw,
      kode_pos: daerah,
    });
    if (res.status == 422) {
      setError(res.data);
    } else if (res.status == 200) {
      setCreateModalOpen(false);
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    if (selectedKeluarga) {
      setNOKK(selectedKeluarga.NOKK || "");
      setAlamat(selectedKeluarga.alamat || "");
      setRt(selectedKeluarga.id_rt || "");
      setRw(selectedKeluarga.id_rw || "");
      setDaerah(selectedKeluarga.kode_pos || "");
    }
  }, [selectedKeluarga]);

  const handleEdit = async (id) => {
    setSelectedKeluarga([]);
    setError([]);
    setLoading(true);
    setTimeout(async () => {
      const data = await showKeluarga(id);
      setSelectedKeluarga(data.data);
      setEditModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleUpdate = async () => {
    const res = await updateKeluarga(
      {
        NOKK: NOKK,
        alamat: alamat,
        id_rt: rt,
        id_rw: rw,
        kode_pos: daerah,
      },
      selectedKeluarga.NOKK
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
      setSelectedKeluarga([]);
      const data = await showKeluarga(id);
      setSelectedKeluarga(data.data);
      setDeleteModalOpen(true);
      setLoading(false);
    }, 450);
  };

  const handleDelete = async () => {
    await deleteKeluarga(selectedKeluarga.NOKK);
    setDeleteModalOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <PageHeader
        hasGroup={true}
        breadcrumbsLink={`Kependudukan`}
        breadcrumbsPath={`Keluarga`}
        heading={`Kelola Keluarga`}
        handleEvent={handleCreateModalOpen}
        handleSearch={(e) => handleSearch(e.target.value)}
      />
      <Layout.Main>
        <Table>
          <Table.Head cols={ColumnKeluarga} />
          <Table.Body>
            {keluarga.map((val, i) => (
              <tr key={val.NOKK}>
                <td data-label="#" className="number-cell">
                  {(i += 1)}
                </td>
                <td data-label="No KK">{val.NOKK}</td>
                <td data-label="Alamat">{val.alamat}</td>
                <td data-label="RT/RW">
                  {val.rt?.rt || "-"}/{val.rw?.rw || "-"}
                </td>
                <td data-label="Desa & Kelurahan">
                  {val.desakelurahan?.desa_kelurahan || "-"}
                </td>
                <td data-label="Actions" className="action-group">
                  <div
                    className="see"
                    onClick={() =>
                      (window.location.href = `/admin/keluarga/${val.NOKK}`)
                    }
                    style={{ cursor: "pointer" }}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-users-group"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                    </svg>
                  </div>
                  <div className="edit" onClick={() => handleEdit(val.NOKK)}>
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
                    onClick={() => handleDeleteModal(val.NOKK)}
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
          modalTitle={`Create Keluarga`}
          modalDesc={`For create keluarga data.`}
        >
          <Field
            placeHolder={`Masukkan no kk ...`}
            type={`numeric`}
            data={`create_nokk`}
            contentLabel={`No KK`}
            setValue={NOKK}
            setOnChange={(e) => setNOKK(e.target.value)}
            setError={error.NOKK}
          />
          <Field
            placeHolder={`Masukkan alamat ...`}
            type={`text`}
            data={`create_alamat`}
            contentLabel={`Alamat`}
            setValue={alamat}
            setOnChange={(e) => setAlamat(e.target.value)}
            setError={error.alamat}
          />
          <Field
            type={`select`}
            data={`create_rt`}
            contentLabel={`Rt`}
            selectDefaultValue={``}
            setOnChange={(e) => setRt(e.target.value)}
            setError={error.id_rt}
          >
            <option value="" disabled hidden>
              Pilih Rt
            </option>
            {rtDropdown.map((val) => (
              <option value={val.id_rt} key={val.id_rt}>
                {val.rt}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`create_rw`}
            contentLabel={`Rw`}
            selectDefaultValue={``}
            setOnChange={(e) => setRw(e.target.value)}
            setError={error.id_rw}
          >
            <option value="" disabled hidden>
              Pilih Rw
            </option>
            {rwDropdown.map((val) => (
              <option value={val.id_rw} key={val.id_rw}>
                {val.rw}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`create_daerah`}
            contentLabel={`Daerah`}
            selectDefaultValue={``}
            setOnChange={(e) => setDaerah(e.target.value)}
            setError={error.kode_pos}
          >
            <option value="" disabled hidden>
              Pilih Daerah
            </option>
            {daerahDropdown.map((val) => (
              <option value={val.kode_pos} key={val.kode_pos}>
                {val.kode_pos}
                {`   -   `}
                {val.desa_kelurahan}
                {val.kecamatan}
                {`   -   `}
                {val.kota_kabupaten}
                {`   -   `}
                {val.provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          setSubmit={handleUpdate}
          modalTitle={`Edit Keluarga`}
          modalDesc={`For edit keluarga data.`}
        >
          <Field
            placeHolder={`Masukkan no kk ...`}
            type={`numeric`}
            data={`update_nokk`}
            contentLabel={`No KK`}
            setValue={NOKK}
            setOnChange={(e) => setNOKK(e.target.value)}
            setError={error.NOKK}
          />
          <Field
            placeHolder={`Masukkan alamat ...`}
            type={`text`}
            data={`update_alamat`}
            contentLabel={`Alamat`}
            setValue={alamat}
            setOnChange={(e) => setAlamat(e.target.value)}
            setError={error.alamat}
          />
          <Field
            type={`select`}
            data={`update_rt`}
            contentLabel={`Rt`}
            selectValue={rt}
            setOnChange={(e) => setRt(e.target.value)}
            setError={error.id_rt}
          >
            <option value="" disabled hidden>
              Pilih Rt
            </option>
            {rtDropdown.map((val) => (
              <option value={val.id_rt} key={val.id_rt}>
                {val.rt}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`update_rw`}
            contentLabel={`Rw`}
            selectValue={rw}
            setOnChange={(e) => setRw(e.target.value)}
            setError={error.id_rw}
          >
            <option value="" disabled hidden>
              Pilih Rw
            </option>
            {rwDropdown.map((val) => (
              <option value={val.id_rw} key={val.id_rw}>
                {val.rw}
              </option>
            ))}
          </Field>
          <Field
            type={`select`}
            data={`update_daerah`}
            contentLabel={`Daerah`}
            selectValue={daerah}
            setOnChange={(e) => setDaerah(e.target.value)}
            setError={error.kode_pos}
          >
            <option value="" disabled hidden>
              Pilih Daerah
            </option>
            {daerahDropdown.map((val) => (
              <option value={val.kode_pos} key={val.kode_pos}>
                {val.kode_pos}
                {`   -   `}
                {val.desa_kelurahan}
                {val.kecamatan}
                {`   -   `}
                {val.kota_kabupaten}
                {`   -   `}
                {val.provinsi}
              </option>
            ))}
          </Field>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          setSubmit={handleDelete}
          modalTitle={`Delete Keluarga`}
          modalDesc={`Anda yakin ingin menghapus ${
            selectedKeluarga.NOKK ? selectedKeluarga.NOKK : ""
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

export default Keluarga;
