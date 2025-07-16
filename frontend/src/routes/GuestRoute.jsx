import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(res.ok);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="loader"></div>;
  }

  return isAuthenticated ? <Navigate to="/admin/home" /> : <Outlet />;
};

export default GuestRoute;