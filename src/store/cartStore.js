import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "carrito:items:v1";

/**
 * Store unificado para manejar:
 * - Estado y acciones del carrito de compras
 * - Estado y acciones del modal del carrito
 *
 * Integrado con Firebase para productos dinámicos
 * Estructura de producto: { id, nombre, precio, categoria, subcategoria, ...datos }
 * Persiste automáticamente en localStorage
 */
const useCartStore = create(
  persist(
    (set) => ({
      // ===== ESTADO DEL CARRITO =====
      cartItems: [],

      // ===== ESTADO DEL MODAL =====
      isCartOpen: false,
      isSidebarCartOpen: false,
      originOpen: "Volver al inicio", // Rastrear de dónde se abrió el modal

      /**
       * Agregar producto al carrito
       * @param {Object} product - Producto con estructura Firebase
       * @param {string} product.id - ID único del producto
       * @param {string} product.nombre - Nombre del producto
       * @param {string|number} product.precio - Precio del producto
       * @param {string} product.categoria - Categoría del producto (bebidas, desayunos, etc)
       * @param {string} product.subcategoria - Subcategoría del producto
       * @param {Object} product - Otros datos del producto (img, descripcion, etc)
       */
      addToCart: (product) =>
        set((state) => {
          // Usar id + subcategoria como identificador único (para evitar duplicados)
          const uniqueKey = `${product.id}-${product.subcategoria || ""}`;
          const exists = state.cartItems.find(
            (i) => `${i.id}-${i.subcategoria || ""}` === uniqueKey
          );

          if (exists) {
            // Si existe, solo incrementar cantidad
            return {
              cartItems: state.cartItems.map((item) =>
                `${item.id}-${item.subcategoria || ""}` === uniqueKey
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
            };
          }

          // Si no existe, agregar con cantidad 1
          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        }),

      /**
       * Remover producto del carrito por id y subcategoria
       * @param {string} productId - ID del producto
       * @param {string} subcategoria - Subcategoría del producto
       */
      removeFromCart: (productId, subcategoria = "") =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) =>
              !(item.id === productId && item.subcategoria === subcategoria)
          ),
        })),

      /**
       * Limpiar todo el carrito
       */
      clearCart: () => set({ cartItems: [] }),

      /**
       * Aumentar cantidad de un producto
       * @param {string} productId - ID del producto
       * @param {string} subcategoria - Subcategoría del producto
       */
      increaseQuantity: (productId, subcategoria = "") =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId && item.subcategoria === subcategoria
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        })),

      /**
       * Disminuir cantidad de un producto
       * @param {string} productId - ID del producto
       * @param {string} subcategoria - Subcategoría del producto
       */
      decreaseQuantity: (productId, subcategoria = "") =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId && item.subcategoria === subcategoria
              ? {
                  ...item,
                  quantity: Math.max((item.quantity || 1) - 1, 1),
                }
              : item
          ),
        })),

      /**
       * Obtener total de items en el carrito
       */
      getCartTotal: () => {
        const { cartItems } = useCartStore.getState();
        return cartItems.reduce((total, item) => {
          const price = parseFloat(item.precio) || 0;
          return total + price * (item.quantity || 1);
        }, 0);
      },

      /**
       * Obtener cantidad total de productos
       */
      getCartItemsCount: () => {
        const { cartItems } = useCartStore.getState();
        return cartItems.reduce(
          (count, item) => count + (item.quantity || 1),
          0
        );
      },

      /**
       * Obtener carrito formateado para envío
       */
      getFormattedCart: () => {
        const { cartItems } = useCartStore.getState();
        return cartItems.map((item) => ({
          productId: item.id,
          nombre: item.nombre,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          precio: parseFloat(item.precio) || 0,
          cantidad: item.quantity || 1,
          subtotal: (parseFloat(item.precio) || 0) * (item.quantity || 1),
        }));
      },

      // ===== ACCIONES DEL MODAL =====

      /**
       * Abre el modal del carrito
       */
      openCart: () => set({ isCartOpen: true }),
      openSidebarCart: () => set({ isSidebarCartOpen: true }),
      closeSidebarCart: () => set({ isSidebarCartOpen: false }),

      /**
       * Cierra el modal del carrito
       */
      closeCart: () => set({ isCartOpen: false, originOpen: "" }),

      /**
       * Alterna el estado del modal
       */
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      /**
       * Establecer origen de apertura
       */
      setOriginOpen: (origin) => set({ originOpen: origin }),
      clearOriginOpen: () => set({ originOpen: "" }),
    }),
    {
      name: STORAGE_KEY, // localStorage key
    }
  )
);

export default useCartStore;
