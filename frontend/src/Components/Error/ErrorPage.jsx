import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

// Componente de erro
const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Desculpe, ocorreu um erro inesperado.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
      <p>{error.error.message}</p>
    </div>
  );
};

export default ErrorPage;
