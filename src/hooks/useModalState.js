import { useEffect, useState } from "react";
import useReservaStore from "../store/reservaStore";
import useMenuStore from "../store/menuStore";
import useCartStore from "../store/cartStore";

/**
 * Hook centralizado que detecta cuando cualquier modal se activa
 * Retorna true si alguno de los 3 modales (Reserva, Menú, Carrito) está abierto
 * 
 * Uso en Header:
 * const isAnyModalOpen = useModalState();
 * className={`... ${isAnyModalOpen ? "active" : ""}`}
 */
export const useModalState = () => {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  // Suscribirse a los cambios de los stores
  const isBookingOpen = useReservaStore((state) => state.isBookingOpen);
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  // Actualizar estado cuando cualquier modal cambia
  useEffect(() => {
    setIsAnyModalOpen(isBookingOpen || isMenuOpen || isCartOpen);
  }, [isBookingOpen, isMenuOpen, isCartOpen]);

  return isAnyModalOpen;
};

export default useModalState;
