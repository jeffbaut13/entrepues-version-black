import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { forwardRef } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useModalManager } from "../../hooks/useModalManager";
import { Button } from "../ui/Button";
import { ButtonBack } from "../ui/ButtonBack";
import { BackgroundCards } from "../ui/BackgroundCards";

export const ModalLayout = forwardRef(
  (
    {
      activeModal,
      children,
      Title,
      originBack = "",
      BackModal,
      close,
      closeModal,
      header,
      zIndex = "z-50",
      fullWidth = "small",
    },
    scrollRef
  ) => {
    // Hook centralizado para sincronización de modales
    useModalManager();

    useEscapeKey(() => {
      if (activeModal) closeModal();
    }, activeModal);
    // Variantes de animación para el overlay
    const overlayVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };

    // Variantes de animación para el modal (sube desde abajo)
    const modalVariants = {
      hidden: {
        y: "100%",
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.8,
        },
      },
      exit: {
        y: "100%",
        opacity: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
    };

    return (
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              className={`fixed bottom-0 left-0 right-0 ${zIndex} h-full overflow-hidden`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Background */}

              <motion.div
                className="relative h-full z-1 scale-102"
                pointerEvents="none"
              >
                <motion.div
                  className={`size-full absolute inset-0 bg-black/50`}
                  onClick={closeModal}
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
                <img
                  src="/imagenes/background-reserva.webp"
                  alt="Background textura"
                  className="size-full object-cover object-center"
                />
              </motion.div>

              {/* Header de Titulo y botones de atras y cerrar y contenido */}

              <motion.div className="absolute z-10 top-0 left-0 w-full h-full pt-34 flex flex-col">
                <>
                  {/* Header */}
                  {header ? (
                    <>{header}</>
                  ) : (
                    <motion.div
                      className={`z-10 pb-4 relative grid grid-cols-3 items-center gap-4 w-full max-w-7xl mx-auto flex-shrink-0`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {BackModal ? (
                        <ButtonBack
                          closeModal={BackModal}
                          title={originBack}
                          close={false}
                        />
                      ) : (
                        <div className="w-10" />
                      )}
                      <motion.h2
                        className="tracking-[0.3rem] text-2xl text-center self-end scale-y-85"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {Title}
                      </motion.h2>

                      {close ? (
                        <ButtonBack closeModal={closeModal} close />
                      ) : (
                        <div className="w-10" />
                      )}
                    </motion.div>
                  )}
                </>

                {/* Contenido */}

                <motion.div
                  ref={scrollRef}
                  className="flex-1 w-full mx-auto relative z-20 overflow-y-auto overflow-x-hidden py-2 pb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="max-w-7xl mx-auto flex justify-center items-center min-h-full">
                    <BackgroundCards fullWidth={fullWidth}>
                      {children}
                    </BackgroundCards>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);
