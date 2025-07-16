import { useState, useEffect } from "react";
import AppBar from "../components/AppBar/AppBar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [petugas, setPetugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarURL, setAvatarURL] = useState(null);

  const handlePetugas = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    avatar(data.id_petugas);
    setPetugas(data);
    setLoading(false);
  };

  const avatar = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/avatar/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAvatarURL(url);
      window.avatarURL = url;
    } else {
      const url = '/avatarnone.webp';
      setAvatarURL(url);
      window.avatarURL = url;
    }
  };

  useEffect(() => {
    handlePetugas();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <AppBar
            toggleSidebar={toggleSidebar}
            auth={petugas}
            avatarURL={avatarURL}
          />
          <main>{children}</main>
        </>
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
}

Layout.Main = ({ children }) => (
  <section className="main-section">{children}</section>
);

Layout.Toast = ({ children }) => <div id="toast-container">{children}</div>;
