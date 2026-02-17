import { create } from "zustand";

/**
 * Store global para manejar el estado del modal del menú
 * Centraliza la lógica de abrir/cerrar el modal desde cualquier componente
 *
 * sourceContext: Rastreo del origen para ejecutar acciones post-cierre
 * - "" (vacío): Comportamiento normal
 * - "reserva": Abierto desde el modal de reserva, abre reserva al cerrar
 * - "carrito": Abierto desde el modal del carrito, abre carrito al cerrar
 */
const useMenuStore = create((set) => ({
  isMenuOpen: false,
  originOpen: "", // Rastrear de dónde se abrió el modal
  sourceContext: "", // "" | "reserva" | "carrito"

  // Abre el modal del menú
  openMenu: () => set({ isMenuOpen: true }),

  // Abre el modal del menú con contexto de origen
  openMenuWithContext: (source = "") =>
    set({ isMenuOpen: true, sourceContext: source, originOpen: source }),

  // Cierra el modal del menú
  closeMenu: () => set({ isMenuOpen: false, originOpen: "" }),

  // Limpia el contexto de origen
  clearSourceContext: () => set({ sourceContext: "" }),

  // Alterna el estado del modal
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  // Obtener el contexto de origen
  getSourceContext: (state) => state.sourceContext,

  // Establecer contexto manualmente (si es necesario)
  setSourceContext: (source) => set({ sourceContext: source }),

  // Establecer origen de apertura
  setOriginOpen: (origin) => set({ originOpen: origin }),
}));

export default useMenuStore;
