import { motion } from "framer-motion";
import { CardProduct } from "./CardProduct";

export const CardsProducts = ({
  isSidebarCartOpen,
  handleOpenPopup,
  selectedCategory,
  handleAddToCart,
  isProductInCart,
  activeProducts,
}) => {
  return (
    <motion.div
      key={selectedCategory}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        width: isSidebarCartOpen ? "66.666%" : "100%",
      }}
      className={`grid grid-cols-1 ${
        isSidebarCartOpen > 0 ? "lg:grid-cols-3" : "lg:grid-cols-3"
      } gap-4 lg:gap-x-6 gap-y-12 min-h-[400px]`}
    >
      {activeProducts.map((producto, index) => (
        <CardProduct
          key={`${producto.id}-${index}`}
          producto={producto}
          selectedCategory={selectedCategory}
          handleOpenPopup={handleOpenPopup}
          handleAddToCart={handleAddToCart}
          isProductInCart={isProductInCart}
          isSidebarCartOpen={isSidebarCartOpen}
        />
      ))}
    </motion.div>
  );
};
