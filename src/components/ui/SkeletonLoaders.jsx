import { motion } from "framer-motion";

/**
 * Componente Skeleton para loading states
 * Muestra placeholders animados mientras se cargan los datos
 */

// Skeleton para categoría
export const CategorySkeleton = () => (
  <motion.div
    className="p-4 rounded-lg bg-secondary/10 border border-secondary/10 h-14"
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

// Skeleton para subcategoría
export const SubcategorySkeleton = () => (
  <motion.div
    className="px-6 py-2 rounded-full bg-secondary/10 border border-secondary/10 h-10 w-32"
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

// Skeleton para tarjeta de producto
export const ProductSkeleton = () => (
  <motion.div className="flex flex-col h-full">
    {/* Imagen */}
    <motion.div
      className="w-full h-48 rounded-lg bg-secondary/10 mb-3"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Título */}
    <motion.div
      className="h-4 bg-secondary/10 rounded mb-2 w-3/4"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
    />

    {/* Descripción línea 1 */}
    <motion.div
      className="h-3 bg-secondary/10 rounded mb-2 w-full"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
    />

    {/* Descripción línea 2 */}
    <motion.div
      className="h-3 bg-secondary/10 rounded mb-4 w-2/3"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />

    {/* Precio y botón */}
    <div className="flex justify-between items-center mt-auto">
      <motion.div
        className="h-5 bg-secondary/10 rounded w-24"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.div
        className="h-9 w-9 bg-secondary/10 rounded-lg"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  </motion.div>
);

/**
 * Skeleton completo para el menú
 */
export const MenuSkeleton = () => (
  <div className="px-6 py-8 max-w-7xl mx-auto w-full">
    {/* SECCIÓN 1: Categorías */}
    <div className="mb-12">
      <motion.div
        className="h-4 bg-secondary/10 rounded w-32 mb-6"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    </div>

    {/* SECCIÓN 2: Subcategorías */}
    <div className="mb-12">
      <motion.div
        className="h-4 bg-secondary/10 rounded w-40 mb-6"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SubcategorySkeleton key={i} />
        ))}
      </div>
    </div>

    {/* SECCIÓN 3: Productos */}
    <div>
      <motion.div
        className="h-4 bg-secondary/10 rounded w-28 mb-6"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="grid grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);
