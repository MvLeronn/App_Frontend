import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import ErrorPage from './Components/Error/ErrorPage';
import ProtectedRoute from './Components/ProtectedRoute';
import Perguntas from './Components/Perguntas/Perguntas';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rota raiz redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida para perguntas */}
        <Route
          path="/perguntas"
          element={
            <ProtectedRoute>
              <Perguntas />
            </ProtectedRoute>
          }
        />

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
