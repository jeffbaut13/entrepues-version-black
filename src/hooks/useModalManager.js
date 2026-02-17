import { useEffect, useRef } from "react";
import useReservaStore from "../store/reservaStore";
import useMenuStore from "../store/menuStore";
import useCartStore from "../store/cartStore";

/**
 * Hook centralizado para manejar la lógica de modales
 * 
 * REGLAS:
 * - Carrito es INDEPENDIENTE: se abre/cierra sin afectar otros modales
 * - Menu cierra Booking cuando se abre
 * - Booking cierra Menu cuando se abre
 */
export const useModalManager = () => {
  const isBookingOpen = useReservaStore((state) => state.isBookingOpen);
  const closeBooking = useReservaStore((state) => state.closeBooking);

  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const sourceContext = useMenuStore((state) => state.sourceContext);
  const clearSourceContext = useMenuStore((state) => state.clearSourceContext);

  const isCartOpen = useCartStore((state) => state.isCartOpen);

  // Track previous state para detectar cambios
  const prevMenuOpenRef = useRef(isMenuOpen);

  /**
   * Efecto: Detectar cierre del menú y restaurar origen
   * Si viene de reserva → reabre reserva
   * Si viene de carrito → reabre carrito (pero carrito ya está abierto, solo se cierra menu)
   */
  useEffect(() => {
    // Si el menú estaba abierto y ahora se cerró
    if (prevMenuOpenRef.current && !isMenuOpen && sourceContext) {
      // Solo limpia el contexto, no reabre nada
      // El carrito permanece abierto si estaba abierto
      // La reserva permanece abierta si estaba abierta
      clearSourceContext();
    }
    
    prevMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen, sourceContext, clearSourceContext]);

  /**
   * Efecto: Cuando se abre Booking
   * - Cierra Menu solo (Carrito es independiente)
   */
  useEffect(() => {
    if (isBookingOpen && isMenuOpen) {
      closeMenu();
    }
  }, [isBookingOpen, isMenuOpen, closeMenu]);

  /**
   * Efecto: Cuando se abre Menu
   * - Cierra Booking si está abierto
   * - NO toca Carrito (es independiente)
   */
  useEffect(() => {
    if (isMenuOpen && isBookingOpen) {
      closeBooking();
    }
  }, [isMenuOpen, isBookingOpen, closeBooking]);
};
