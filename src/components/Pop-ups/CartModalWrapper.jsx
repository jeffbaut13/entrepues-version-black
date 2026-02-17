import useCartStore from "../../store/cartStore";
import useMenuStore from "../../store/menuStore";
import CartModal from "./CartModal";

/**
 * Wrapper del CartModal para ser usado en MainLayout
 * Maneja el estado global del modal del carrito
 */
export default function CartModalWrapper() {
  const { isCartOpen, closeCart, openOrigin } = useCartStore();

  return <CartModal isOpen={isCartOpen} onClose={closeCart} originOpen={openOrigin} />;
}
