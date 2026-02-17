"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Check, Handbag } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Slider de productos usando Swiper
 * Barra de progreso que "se llena" (progressbar), no scrollbar draggable.
 */
export default function ProductSlider({
  products,
  selectedCategory,
  onProductClick,
  onAddToCart,
  isProductInCart,
  hasCartItems,
}) {
  return (
    <motion.div
      layout
      animate={{
        width: hasCartItems ? "66.666%" : "100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full relative"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: hasCartItems ? 3 : 4,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: hasCartItems ? 4 : 5,
            spaceBetween: 24,
          },
        }}
        className="products-swiper"
      >
        {products.map((producto, index) => (
          <SwiperSlide
            key={`${selectedCategory}-${producto.subcategoria}-${producto.id}-${index}`}
          >
            <motion.div key={`${selectedCategory}-${producto.subcategoria}-${producto.id}-${index}`} className="group h-full relative rounded-3xl overflow-hidden shadow-lg">
              {/* Imagen clickeable */}
              <picture
                onClick={() => onProductClick(producto)}
                className="w-full h-full cursor-pointer"
              >
                <img
                  src={producto.img}
                  alt={producto.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </picture>

              {/* Info del producto */}
              <div className="absolute bottom-4 h-fit w-full px-2">
                <h4 className="font-light text-secondary line-clamp-1 mb-2">
                  {producto.nombre}
                </h4>

                {/* Precio y botón carrito */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-secondary">
                    ${parseInt(producto.precio).toLocaleString("es-CO")}
                  </span>

                  <button
                    onClick={() => onAddToCart(producto)}
                    className={`p-0.5 rounded-full transition relative ${
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
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .products-swiper {
          padding-bottom: 20px;
        }

        .products-swiper .swiper-wrapper {
          padding-bottom: 16px;
        }

        .products-swiper .swiper-button-next,
        .products-swiper .swiper-button-prev {
          color: #fff6ea;
          width: 40px;
          height: 40px;
          background: rgba(255, 246, 234, 0.1);
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }

        .products-swiper .swiper-button-next:after,
        .products-swiper .swiper-button-prev:after {
          font-size: 20px;
        }

        .products-swiper .swiper-button-next:hover,
        .products-swiper .swiper-button-prev:hover {
          background: rgba(255, 246, 234, 0.2);
        }

        /* Barra de progreso (se llena, no se corre) */
        .products-swiper .swiper-pagination-progressbar {
          position: absolute !important;
          bottom: 0 !important;
          top: auto !important;
          left: 0 !important;
          width: 100% !important;
          height: 6px !important;
          border-radius: 9999px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          overflow: hidden !important;
          z-index: 10;
        }

        .products-swiper .swiper-pagination-progressbar-fill {
          background: #ffffff !important;
          border-radius: 9999px !important;
        }
      `}</style>
    </motion.div>
  );
}
