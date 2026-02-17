import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  Notebook,
  ShoppingCart,
  Clock,
  Handbag,
  ConciergeBell,
} from "lucide-react";
import useCartStore from "../../store/cartStore";
import useReservaStore from "../../store/reservaStore";
import useMenuStore from "../../store/menuStore";
import { useEffect, useState } from "react";
import { ModalLayout } from "../layout/ModalLayout";

import { Button } from "../ui/Button";
import { useIsMobile } from "../../hooks/useIsMobile";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import {
  handleContinuarComprandoFromCart,
  handleOpenCart,
} from "../../logic/modalNavigation";
import { AbrirMenu } from "../common/AbrirMenu";
import { CardItems } from "../carrito/cardItems";

/**
 * Modal del carrito de compras con persistencia
 * Guarda automáticamente carrito y reserva en localStorage
 * Al proceder al pago, abre el modal de reserva
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 */
export const CartModal = ({ isOpen, onClose, openOrigin }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
    clearCart,
  } = useCartStore();
  const isMobile = useIsMobile();
  const {
    updateReservaData,
    openBookingWithOrigin,
    closeBooking,
    isBookingOpen,
  } = useReservaStore();
  const { openMenuWithContext, closeMenu, isMenuOpen } = useMenuStore();
  const [isCarritoPersistido, setIsCarritoPersistido] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito:items:v1");
    if (carritoGuardado) {
      setIsCarritoPersistido(true);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(
        "carrito:items:v1",
        JSON.stringify({ state: { cartItems }, version: 0 })
      );
      setIsCarritoPersistido(true);
    }
  }, [cartItems]);

  const total = getCartTotal();
  const cantidadItems = getCartItemsCount();

  // Manejar continuar comprando - cierra carrito y abre menu o reserva
  const handleContinuarComprando = () => {
    onClose();
    openMenuWithContext("home");
    closeBooking();
  };

  // Manejar limpiar carrito
  const handleLimpiarCarrito = () => {
    clearCart();
    onClose();
  };

  // Manejar completar reserva - abre BookingModal
  /* const handleCompletarReserva = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // Guardar items del carrito en reserva de forma segura
    updateReservaData({
      carritoGuardado: cartItems,
      cantidadProductos: cantidadItems,
      montoTotal: total,
      estado: "en_checkout",
    });

    // Cerrar carrito y abrir reserva
    onClose();
    closeMenu();
    openBookingWithOrigin("Volver al inicio");
  }; */
  const handleCompletarReserva = () => {
    closeMenu();
    openBookingWithOrigin("Volver al inicio");
  };

  return (
    <>
      <ModalLayout
        activeModal={isOpen}
        closeModal={onClose}
        Title="Mi Carrito"
        originBack={""}
        zIndex="z-1000"
        close={true}
      >
        <div className="flex flex-col md:max-w-140 md:max-h-160 max-h-[80vh] mx-auto bg-[#141414] rounded-2xl overflow-hidden">
          {/* Contenido del carrito */}
          <div className="flex-1 relative overflow-hidden md:min-h-[300px] min-h-[200px]">
            <div className="bg-gradient-to-b to-[#141414] z-50 to-95% from-80% sticky top-0 left-0 h-96 w-full pointer-events-none" />
            <div className="flex-1 absolute top-0 left-0 size-full">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-secondary/60">
                  <p >Tu carrito está vacío</p>

                  <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-sm text-secondary/70 my-10">
                      Te invitamos a agregar productos desde nuestro menú.
                    </p>
                    <Button
                      type="button-primary"
                      onClick={handleContinuarComprando}
                      Icon={Notebook}
                      title="Explorar el menú"
                      width="ajustado"
                      fontSize={isMobile ? "sm" : "base"}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full md:pt-14 pt-6 md:pb-7 pb-3 md:px-12 px-2 space-y-3">
                  <CardItems />
                </div>
              )}
            </div>
          </div>

          {/* Footer con totales y acciones */}
          {cartItems.length > 0 && (
            <div className="md:px-18 px-8 md:pb-14 pb-6 space-y-4">
              {/* Desglose */}
              <div className="space-y-2 border-t md:pt-7 pt-3 border-secondary/20 ">
                <div className="flex justify-between text-sm text-secondary/70">
                  <span>Cantidad de productos:</span>
                  <span>{cantidadItems}</span>
                </div>
                <div className="flex justify-between font-bold text-secondary">
                  <span>Total:</span>
                  <span>${total.toLocaleString("es-CO")}</span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-between gap-3 pt-4">
                <Button
                  type="button-primary"
                  onClick={handleCompletarReserva}
                  title="Completar Reserva"
                  width="full"
                  props={{ "aria-label": "Completar reserva" }}
                />

                <AbrirMenu handleClick={handleContinuarComprando} />
              </div>
            </div>
          )}
        </div>
      </ModalLayout>

      <MiniCart
        isCartModalOpen={isOpen}
        handleCompletarReserva={handleCompletarReserva}
      />
    </>
  );
};

export default CartModal;

/**
 * MiniCart flotante
 * Se muestra cuando:
 * - cartItems tiene al menos 1 elemento
 * - isMenuOpen es true
 * Permite abrir carrito o ir a reserva
 */
const MiniCart = ({ isCartModalOpen, handleCompletarReserva }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
  const isSidebarCartOpen = useCartStore((state) => state.isCartOpen);
  const isBookingOpen = useReservaStore((state) => state.isBookingOpen);
  const { openBookingWithOrigin } = useReservaStore();
  const isMobile = useIsMobile();
  const [isClosed, setIsClosed] = useState(false);

  const cantidadItems = cartItems.length;
  // Solo mostrar si: hay items AND menú abierto AND carrito cerrado AND reserva cerrada AND es mobile
  /* const shouldShow =
    cantidadItems > 0 &&
    isMenuOpen &&
    !isCartOpen &&
    !isBookingOpen &&
    !isClosed &&
    isMobile; */

  const shouldShow = isMenuOpen && isSidebarCartOpen;

  // Resetear cuando cierre CartModal
  useEffect(() => {
    if (!isCartModalOpen) {
      setIsClosed(false);
    }
  }, [isCartModalOpen]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1001] flex items-center gap-6 bg-black border border-white/15 rounded-full px-6 py-4"
        >
          {/* Botón ir a reserva */}
          <Button
            type="button-primary"
            onClick={handleCompletarReserva}
            title={"Quiero resevar"}
            Icon={ConciergeBell}
            customClass="px-6 !rounded-full"
            fontSize={isMobile ? "md" : "sm"}
            width="ajustado"
          />

          {/* Botón cerrar */}
          {/*  <button
            onClick={() => setIsClosed(true)}
            className="ml-2 text-secondary/60 hover:text-secondary transition-colors"
            aria-label="Cerrar mini carrito"
          >
            <X className="size-4" />
          </button> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
