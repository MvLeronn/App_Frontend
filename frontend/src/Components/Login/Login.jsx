import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o sistema</h1>
        <div className="input-field">
          <input type="email" placeholder="E-mail"
          onChange={(e) => setUsername(e.target.value)}
          required />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input type="password" placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)} 
          required />
          <FaLock className="icon" />
        </div>
        <button>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
