import { Outlet } from "react-router-dom";
import { useState } from "react";

import MenuModal from "../Pop-ups/MenuModal";
import CartModalWrapper from "../Pop-ups/CartModalWrapper";
import BookingModal from "../Pop-ups/BookingModal";
import { useScrollLock } from "../../hooks/useScrollLock";
import { Loader } from "../LoaderComponents/Loader";
import { LoaderProvider } from "../../context/LoaderContext";

/**
 * Layout principal de la aplicación
 * Contiene header y otros componentes que aparecen en todas las páginas
 * Los modales se renderizan aquí según el estado global
 */
export default function MainLayout() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Bloquea el scroll del home cuando algún modal está abierto
  useScrollLock();

  return (
    <div className="h-full bg-black overflow-hidden">
      {/* Contenido de las páginas - Siempre renderizado, visible detrás del loader */}
      <Outlet />

      {/* Modal del menú - Controlado por estado global */}
      <MenuModal />

      {/* Modal del carrito - Controlado por estado global */}
      {/*  <CartModalWrapper /> */}

      {/* Modal de reserva - Controlado por estado global */}
      {/* <BookingModal /> */}
    </div>
  );
}
