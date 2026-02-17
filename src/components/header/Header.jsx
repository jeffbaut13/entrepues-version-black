import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Handbag } from "lucide-react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useModalState } from "../../hooks/useModalState";
import { useObserverVisibility } from "../../hooks/useObserverVisibility";
import { useLoaderContext } from "../../context/LoaderContext";
import useCartStore from "../../store/cartStore";
import { Button } from "../ui/Button";
import { handleOpenCart, handleCloseCart } from "../../logic/modalNavigation";
import { Logo } from "../ui/Logo";

export const Header = ({ loading }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, isCartOpen, closeCart } = useCartStore();
  const isAnyModalOpen = useModalState();
  const isSectionTwoVisible = useObserverVisibility(".hide-logo-section");
  const { loadingComplete } = useLoaderContext();

  // Cerrar con ESC
  useEscapeKey(() => {
    setMenuOpen(false);
    handleCloseCart();
  }, menuOpen || isCartOpen);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (menuOpen || isCartOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen, isCartOpen]);

  // Calcular delay basado en si el loader ha completado
  const getAnimationDelay = () => {
    return loadingComplete ? 1 : 2;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: getAnimationDelay() }}
            className={`w-full h-auto fixed z-1001 top-0 left-0 text-secondary flex flex-col items-center justify-between`}
          >
            <div className="mx-auto max-w-7xl w-full md:px-0 h-22 grid grid-cols-3 items-center gap-4">
              {/* Columna izquierda (vacía) */}
              <div />

              {/* Columna centro - Logo centrado */}
              <a
                href={location.pathname !== "/" ? "/" : "#"}
                className="h-22 flex justify-center py-2 mt-6"
              >
                {!isSectionTwoVisible && (
                  <picture className="h-full w-auto">
                    <Logo color="white" size="md" />
                  </picture>
                )}
              </a>

              {/* Columna derecha - Carrito */}
              <div className="flex md:gap-10 gap-4 justify-end items-center">
                {/* <ButtonCart cartItems={cartItems} /> */}
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

const ButtonCart = ({ cartItems }) => {
  const handleClick = () => {
    handleOpenCart();
  };

  return (
    <div onClick={handleClick} className="relative w-fit cursor-pointer">
      <Button
        type="just-icon"
        props={{
          disabled: cartItems.length === 0,
          "aria-label": "Carrito de compras",
        }}
        Icon={Handbag}
      />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};
