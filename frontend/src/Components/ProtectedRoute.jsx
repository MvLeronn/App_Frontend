// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Aqui usamos localStorage para verificar se o usuário está autenticado
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para o login
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
