import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

/**
 * Página 404 - No encontrado
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-center px-4">
        {/* Número 404 */}
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
          404
        </h1>

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold  mb-4">
          ¡Página no encontrada!
        </h2>

        {/* Descripción */}
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe. Quizás se haya movido o
          el enlace esté roto.
        </p>

        {/* Botón de vuelta al home */}
        <button
          onClick={handleGoHome}
          className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600  font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Volver al Home
        </button>
      </div>
    </div>
  );
}
