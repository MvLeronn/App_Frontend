import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

// Componente de login
const Login = () => {
  const [email, setEmail] = useState("");
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
  
    const loginData = { email, password };
  
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao fazer login");
        return;
      }
  
      const data = await response.json();
  
      // Armazena o token retornado pela API
      localStorage.setItem("token", data.token);
  
      console.log("Login realizado com sucesso, redirecionando para /perguntas");
  
      // Redireciona para a página de perguntas
      navigate("/perguntas");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Ocorreu um erro ao fazer login.");
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
            onChange={(e) => setEmail(e.target.value)}
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
