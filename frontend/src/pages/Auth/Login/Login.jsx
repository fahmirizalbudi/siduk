import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Field from "../../../components/Field/Field";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(250,250,250)";
  }, []);

  useEffect(() => {
    document.title = "Log In";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      navigate("/admin/home");
      document.body.style.backgroundColor = "#fff";
    } else {
      setError(data);
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <div className="form-logo">
          <svg
            className="logo-siPedu"
            width={250}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 200"
            fill="none"
          >
            <rect
              x={75}
              y={75}
              width={50}
              height={50}
              rx={10}
              ry={10}
              fill="#018c79"
            />
            <path
              d="M100 80 C110 90 110 110 100 120 C90 110 90 90 100 80 Z"
              fill="#ffffff"
            />
            <line
              x1={97}
              y1={85}
              x2={103}
              y2={115}
              stroke="#018c79"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <text
              x={138}
              y={108}
              fontFamily="Arial, sans-serif"
              fontSize={27}
              fill="#018c79"
              fontWeight="bold"
              style={{ letterSpacing: "1.2px" }}
            >
              siDuk
            </text>
          </svg>
        </div>
        <span className="form-desc">Silahkan login untuk melanjutkan.</span>
        {error && (
          <div class="alert-danger" id="customAlert">
            {error.message}
          </div>
        )}
        <form onSubmit={handleLogin} className="form-login">
          <Field
            placeHolder={`Masukkan username anda ...`}
            type={`text`}
            data={`username`}
            contentLabel={
              <>
                <p>
                  Username <span className="all">*</span>
                </p>
              </>
            }
            setValue={username}
            setOnChange={(e) => setUsername(e.target.value)}
          />
          <Field
            placeHolder={`Masukkan password anda ...`}
            type={`password`}
            data={`password`}
            contentLabel={
              <>
                <p>
                  Password <span className="all">*</span>
                </p>
              </>
            }
            setValue={password}
            setOnChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-login" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
