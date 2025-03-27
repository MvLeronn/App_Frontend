"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./perguntas.css" // Import the CSS file

const Perguntas = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("paraResponder")
  const [perguntas, setPerguntas] = useState([])
  const [respostas, setRespostas] = useState({})

  useEffect(() => {
    fetch("http://localhost:3001/perguntas")
      .then((res) => res.json())
      .then((data) => setPerguntas(data))
      .catch((err) => console.error("Erro ao buscar perguntas:", err))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  const handleAnswerChange = (id, value) => {
    setRespostas({ ...respostas, [id]: value })
  }

  const submitAnswer = (id) => {
    const novaResposta = respostas[id]
    fetch(`http://localhost:3001/perguntas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resposta: novaResposta }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`)
        }
        return res.json()
      })
      .then((updatedQuestion) => {
        setPerguntas(perguntas.map((q) => (q.id === id ? updatedQuestion : q)))
        setRespostas({ ...respostas, [id]: "" })
      })
      .catch((err) => console.error("Erro ao enviar resposta:", err))
  }

  const perguntasParaResponder = perguntas.filter((q) => !q.resposta || q.resposta.trim() === "")
  const perguntasRespondidas = perguntas.filter((q) => q.resposta && q.resposta.trim() !== "")

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
                  <button className="submit-btn" onClick={() => submitAnswer(q.id)}>
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
  )
}

export default Perguntas

