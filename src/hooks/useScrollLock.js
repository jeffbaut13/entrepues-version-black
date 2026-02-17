import { useEffect } from "react";
import useReservaStore from "../store/reservaStore";
import useMenuStore from "../store/menuStore";
import useCartStore from "../store/cartStore";

/**
 * Hook que bloquea el scroll del documento cuando algún modal está abierto
 * Solo permite scroll dentro del contenido del modal
 * 
 * Uso:
 * En el componente más alto que envuelve los modales (MainLayout)
 */
export const useScrollLock = () => {
  // Suscribirse a los cambios de los stores
  const isBookingOpen = useReservaStore((state) => state.isBookingOpen);
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  // Detectar si algún modal está abierto
  const isAnyModalOpen = isBookingOpen || isMenuOpen || isCartOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      // Bloquear scroll del documento
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar scroll del documento
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    // Cleanup al desmontar o cuando se cierre el modal
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isAnyModalOpen]);
};

export default useScrollLock;
