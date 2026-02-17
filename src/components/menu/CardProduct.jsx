import { motion } from "framer-motion";
import { Check, Handbag } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

export const CardProduct = ({
  producto,
  selectedCategory,
  index,
  handleOpenPopup,
  handleAddToCart,
  isProductInCart,
  isSidebarCartOpen,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(() => {
          // Ignorar error si el video no puede reproducirse
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering]);

  return (
    <motion.div
      key={`${selectedCategory}-${producto.subcategoria}-${producto.id}-${index}`}
      className="group relative overflow-hidden h-[26.521875rem]"
      onClick={() => handleOpenPopup(producto)}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
    >
      {/* Skeleton mientras carga */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-black/10 animate-pulse" />
      )}

      {/* Contenedor imagen y video */}
      <div className="w-full h-full cursor-pointer relative">
        {/* Imagen con efecto fade */}
        <motion.img
          src={producto.img}
          alt={producto.nombre}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover"
          animate={{
            opacity: !isMobile && isHovering ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />

        {/* Video con efecto fade - solo en desktop */}
        {!isMobile && imageLoaded && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="none"
            animate={{
              opacity: isHovering ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <source src="/video/back_video.mp4" type="video/mp4" />
            Tu navegador no soporta video
          </motion.video>
        )}
      </div>

      {/* Info del producto */}
      {imageLoaded && (
        <div className="absolute top-0 h-fit w-full px-3 py-6">
          <div className="bg-black/10 backdrop-blur-md absolute inset-0 pointer-events-none" />
          <div className="relative size-fit z-10">
            <h4 className="text-secondary line-clamp-1 mb-2">
              {producto.nombre}
            </h4>

            {/* Precio y botón carrito */}
            <div className="flex justify-between items-center font-bold">
              <span className="font-semibold text-secondary">
                ${parseInt(producto.precio).toLocaleString("es-CO")}
              </span>

              {isSidebarCartOpen ? (
                <button
                  onClick={() => handleAddToCart(producto)}
                  className={`p-2 rounded-full transition relative ${
                    isProductInCart(producto)
                      ? "border-[1px] border-green-600 text-green-600"
                      : "bg-secondary/10 hover:bg-secondary/20 text-secondary"
                  }`}
                  aria-label={
                    isProductInCart(producto)
                      ? "En carrito"
                      : "Agregar al carrito"
                  }
                >
                  {isProductInCart(producto) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Handbag className="w-4 h-4" />
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
