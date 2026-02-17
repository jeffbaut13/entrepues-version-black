import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { BackgroundCards } from "../ui/BackgroundCards";
import { X } from "lucide-react";
import useCartStore from "../../store/cartStore";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";

const ProductPopup = ({ open, onClose, producto, isSidebarCartOpen }) => {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCartStore();

  const handleIncrease = () => setCantidad((prev) => prev + 1);
  const handleDecrease = () => setCantidad((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    // Agregar producto con cantidad seleccionada
    for (let i = 0; i < cantidad; i++) {
      addToCart({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        subcategoria: producto.subcategoria || "general",
        img: producto.img,
        descripcion: producto.descripcion,
      });
    }
    onClose();
  };

  if (!producto) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[2005] flex items-center justify-center bg-black/20 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full max-w-4xl flex md:flex-row flex-col h-[70vh] relative overflow-hidden bg-secondary rounded-md">
            <div className="md:w-1/2 w-full md:h-full flex items-center justify-center">
              <img
                src={producto.img}
                alt={producto.nombre}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Info */}
            <div className="flex-1">
              <Button
                Icon={X}
                onClick={onClose}
                type="just-icon"
                customClass=" absolute md:top-4 top-30 right-4"
              />

              <div
                className={`size-full flex flex-col ${
                  isSidebarCartOpen ? "justify-between" : "justify-center"
                } items-start gap-6 p-12`}
              >
                <div className="w-full space-y-6">
                  <h2 className="font-danson !text-6xl">{producto.nombre}</h2>
                  <div className="w-full flex justify-between items-center border-y border-brown/40 py-2 gap-2">
                    <div className="w-full flex items-end ">
                      <span className="!text-4xl font-bold">$</span>
                      <span className="!text-4xl font-bold">
                        {new Intl.NumberFormat("es-CO", {
                          maximumFractionDigits: 0,
                        }).format(producto.precio)}
                      </span>
                    </div>

                    <div className="flex items-center gap-10">
                      {isSidebarCartOpen ? (
                        <IncremenAndDecrementComponent
                          item={cantidad}
                          increaseQuantity={handleIncrease}
                          decreaseQuantity={handleDecrease}
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  <p className="">
                    {producto.descripcion || "Descripción del producto..."}
                  </p>
                </div>

                {isSidebarCartOpen && (
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      type="button-primary"
                      onClick={handleAddToCart}
                      title={"Agregar"}
                      width="full"
                      fontSize="2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPopup;
