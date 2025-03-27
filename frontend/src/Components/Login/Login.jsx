import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-background");

    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === "admin@gmail.com" && password === "admin") {
      // Seta a flag de autenticação (mudar para token dps)
      localStorage.setItem('isAuthenticated', true);
      navigate("/perguntas");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <button>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
