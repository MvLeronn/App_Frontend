import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSync } from "react-icons/fa";
import "./perguntas.css";

const Perguntas = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("paraResponder");
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});

  // Função para buscar as perguntas
  const fetchPerguntas = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/perguntas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.perguntas)) {
          setPerguntas(data.perguntas);
        } else {
          console.error("Resposta inesperada do servidor:", data);
          setPerguntas([]);
        }
      })
      .catch((err) => console.error("Erro ao buscar perguntas:", err));
  };

  // Busca as perguntas na montagem do componente
  useEffect(() => {
    fetchPerguntas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Função para atualizar a resposta
  const handleAnswerChange = (id, value) => {
    setRespostas({ ...respostas, [id]: value });
  };

  // Função para enviar a resposta
  const submitAnswer = (id) => {
    const novaResposta = respostas[id];
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/perguntas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resposta: novaResposta }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        // Após responder, atualiza a lista de perguntas
        fetchPerguntas();
        setRespostas((prev) => {
          const newRespostas = { ...prev };
          delete newRespostas[id];
          return newRespostas;
        });
      })
      .catch((err) => {
        console.error("Erro ao enviar resposta:", err);
        alert("Ocorreu um erro ao enviar a resposta");
      });
  };

  // Divide as perguntas em "paraResponder" e "respondidas"
  const perguntasParaResponder = perguntas.filter(
    (q) => !q.resposta || q.resposta.trim() === ""
  );
  const perguntasRespondidas = perguntas.filter(
    (q) => q.resposta && q.resposta.trim() !== ""
  );

  return (
    <div className="perguntas-container">
      <div className="perguntas-header">
        <h1>Perguntas</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "paraResponder" ? "active" : ""}`}
          onClick={() => setActiveTab("paraResponder")}
        >
          Perguntas para Responder
        </button>
        <button
          className={`tab-btn ${activeTab === "respondidas" ? "active" : ""}`}
          onClick={() => setActiveTab("respondidas")}
        >
          Perguntas Respondidas
        </button>
        <button className="refresh-btn" onClick={fetchPerguntas}>
          <FaSync />
        </button>
      </div>

      <div>
        {activeTab === "paraResponder" && (
          <div>
            {perguntasParaResponder.length === 0 ? (
              <p className="empty-message">Não há perguntas pendentes.</p>
            ) : (
              perguntasParaResponder.map((q) => (
                <div key={q.id} className="question-item">
                  <div className="question-id">Id: {q.id}</div>
                  <div className="question-text">Pergunta: {q.pergunta}</div>
                  <input
                    className="answer-input"
                    type="text"
                    placeholder="Sua resposta"
                    value={respostas[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                  <button
                    className="submit-btn"
                    onClick={() => submitAnswer(q.id)}
                  >
                    Enviar
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "respondidas" && (
          <div>
            {perguntasRespondidas.length === 0 ? (
              <p className="empty-message">Nenhuma pergunta respondida.</p>
            ) : (
              perguntasRespondidas.map((q) => (
                <div key={q.id} className="question-item">
                  <div className="question-id">Id: {q.id}</div>
                  <div className="question-text">Pergunta: {q.pergunta}</div>
                  <div className="question-answer">Resposta: {q.resposta}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perguntas;
