import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      localStorage.removeItem("token");
      navigate("/auth/login", { replace: true });
    }
  }

  useEffect(() => {
    handleLogout();
  }, []);
};

export default Logout;
