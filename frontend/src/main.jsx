import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Configurando router
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Página de erro
import ErrorPage from './Components/Error/ErrorPage';
// Página de perguntas (rota protegida)
import Perguntas from './Components/Perguntas/Perguntas';
// Componente de rota protegida
import ProtectedRoute from './Components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/perguntas",
    element: (
      <ProtectedRoute>
        <Perguntas />
      </ProtectedRoute>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
