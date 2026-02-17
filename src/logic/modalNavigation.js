import useReservaStore from "../store/reservaStore";
import useMenuStore from "../store/menuStore";
import useCartStore from "../store/cartStore";

/**
 * Lógica centralizada para navegar entre modales
 * 
 * CARRITO: Independiente, se abre/cierra sin afectar otros modales
 * MENU: Cierra Reserva si está abierta y abre Menu
 * RESERVA: Cierra Menu si está abierta y abre Reserva
 */

/**
 * Abre el Carrito sin cerrar nada (independiente y siempre encima)
 */
export const handleOpenCart = () => {
  const { openCart } = useCartStore.getState();
  openCart();
};

/**
 * Cierra el modal de Reserva sin abrir nada
 */
export const handleCloseBooking = () => {
  const { closeBooking } = useReservaStore.getState();
  closeBooking();
};

/**
 * Cierra el modal de Menú sin abrir nada
 */
export const handleCloseMenu = () => {
  const { closeMenu } = useMenuStore.getState();
  closeMenu();
};

/**
 * Cierra el modal de Carrito (independiente, sin abrir nada)
 */
export const handleCloseCart = () => {
  const { closeCart } = useCartStore.getState();
  closeCart();
};

/**
 * Abre Menu desde un origen - cierra Reserva si está abierta
 */
export const handleOpenMenu = (origin = "") => {
  const { isBookingOpen, closeBooking } = useReservaStore.getState();
  const { openMenuWithContext } = useMenuStore.getState();

  // Si Reserva está abierta, cerrarla
  if (isBookingOpen) {
    closeBooking();
  }

  // Abrir Menu con el origen
  openMenuWithContext(origin || "");
};

/**
 * Abre Reserva desde un origen - cierra Menu si está abierta
 */
export const handleOpenBooking = (origin = "") => {
  const { isMenuOpen, closeMenu } = useMenuStore.getState();
  const { openBookingWithOrigin } = useReservaStore.getState();

  // Si Menu está abierto, cerrarlo
  if (isMenuOpen) {
    closeMenu();
  }

  // Abrir Reserva con el origen
  openBookingWithOrigin(origin || "");
};

/**
 * CartModal: Continuar comprando
 * Si Reserva está abierta: abre Menu
 * Si Menu está abierto: abre Reserva
 */
export const handleContinuarComprandoFromCart = () => {
  const { isBookingOpen } = useReservaStore.getState();
  const { isMenuOpen } = useMenuStore.getState();

  if (isBookingOpen) {
    // Si Reserva está abierta: abre Menu
    handleOpenMenu();
  } else if (isMenuOpen) {
    // Si Menu está abierto: abre Reserva
    handleOpenBooking();
  }
};
