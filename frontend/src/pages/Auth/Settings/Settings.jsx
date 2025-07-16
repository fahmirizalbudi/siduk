import { useEffect, useState, useRef } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import "./Settings.css";
import AppBar from "../../../components/AppBar/AppBar";
import Field from "../../../components/Field/Field";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState([]);
  const [auth, setAuth] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [avatarURL, setAvatarURL] = useState(null);
  const [active, setActive] = useState("Profile");
  const [avatar, setAvatar] = useState("");
  const avatarRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Settings";
  }, []);

  async function Authorization() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    getAvatar(data.id_petugas);
    setAuth(data);
  }

  const getAvatar = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/avatar/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setAvatarURL(url);
  };

  useEffect(() => {
    Authorization();
  }, [active]);

  useEffect(() => {
    if (auth) {
      setNama(auth?.nama_petugas || "");
      setUsername(auth?.username || "");
    }
  }, [auth]);

  async function handleChangeProfile() {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("nama_petugas", nama)
    data.append("username", username)
    if(oldPassword != null) {
      data.append("old_password", oldPassword)
    }
    if(newPassword != null) {
      data.append("new_password", newPassword);
    }
    const res = await fetch("/api/updateprofile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    await res.json();
    navigate(0);
  }

  async function handleChangeAvatar() {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", avatar);
    const res = await fetch("/api/updateavatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    await res.json();
    navigate(0);
  }

  return (
    <section id="settings">
      <PageHeader
        hasGroup={false}
        breadcrumbsLink={`Back to Home`}
        breadcrumbsPath={`Settings`}
        heading={`Settings`}
        navigateTo={'/admin/home'}
      />
      <hr className="garis" />
      <div className="container-profile">
        <nav className="profile-side">
          <div className="wrapper">
            <a
              className={`settings-link ${
                active === "Profile" ? "active" : null
              }`}
              onClick={() => setActive("Profile")}
            >
              <span>Profile</span>
            </a>
            <a
              className={`settings-link ${
                active === "Avatar" ? "active" : null
              }`}
              onClick={() => setActive("Avatar")}
            >
              <span>Avatar</span>
            </a>
            <a
              className={`settings-link exit`}
              onClick={() => navigate('/admin/home', { replace: true })}
            >
              <span>Exit</span>
            </a>
          </div>
        </nav>
        <aside className="utama">
          {active === "Profile" && (
            <>
              <div className="headernya">
                <h2 className="headnya">Profile</h2>
                <p className="deskripsi">Atur bagian profile anda disini.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangeProfile();
                }}
              >
                <div className="isian">
                  <div className="form-row">
                    <Field
                      placeHolder={`Masukkan nama ...`}
                      type={`text`}
                      data={`nama`}
                      contentLabel={`Nama`}
                      setValue={nama}
                      setOnChange={(e) => setNama(e.target.value)}
                      setError={error?.nama}
                    />
                  </div>
                  <div className="form-row">
                    <Field
                      placeHolder={`Masukkan username ...`}
                      type={`text`}
                      data={`username`}
                      contentLabel={`Username`}
                      setValue={username}
                      setOnChange={(e) => setUsername(e.target.value)}
                      setError={error?.username}
                    />
                  </div>
                  <div className="form-row">
                    <Field
                      placeHolder={`Masukkan password lama ...`}
                      type={`text`}
                      data={`old_password`}
                      contentLabel={`Old Password`}
                      setValue={oldPassword}
                      setOnChange={(e) => setOldPassword(e.target.value)}
                      setError={error?.password}
                    />
                    <Field
                      placeHolder={`Masukkan password baru ...`}
                      type={`text`}
                      data={`new_password`}
                      contentLabel={`New Password`}
                      setValue={newPassword}
                      setOnChange={(e) => setNewPassword(e.target.value)}
                      setError={error?.password}
                    />
                  </div>
                </div>
                <div className="form-footer">
                  <button className="button primary" type="submit">
                    Change
                  </button>
                </div>
              </form>
            </>
          )}
          {active === "Avatar" && (
            <>
              <div className="headernya">
                <h2 className="headnya">Avatar</h2>
                <p className="deskripsi">Atur avatar anda disini.</p>
                <div className="isian">
                  <div className="avatar-wrapper">
                    <img src={avatarURL} ref={avatarRef} />
                    <form
                      className="formAvatar"
                      encType="multipart/form-data"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleChangeAvatar();
                      }}
                    >
                      <input
                        type="file"
                        id="inpAvatar"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setAvatarURL(url);
                            setAvatar(file);
                          }
                        }}
                      />
                      <label htmlFor="inpAvatar" className="button secondary">
                        Choose Avatar
                      </label>
                      <button type="submit" className="button primary">
                        Change Avatar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
};

export default Settings;
