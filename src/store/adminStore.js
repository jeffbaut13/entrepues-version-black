import { create } from "zustand";
import {
  obtenerCategorias,
  obtenerSubcategorias,
  obtenerProductos,
  guardarProducto,
  eliminarProducto,
  crearSubcategoria,
  eliminarSubcategoria,
  obtenerReservas,
  eliminarReserva,
  actualizarReserva,
  obtenerConfiguracion,
  actualizarConfiguracion,
  subirImagen,
  listarImagenes,
  eliminarImagen,
} from "../firebase/adminActions";

/**
 * Store para el panel de administración
 * Centraliza el estado y las acciones CRUD de Firestore y Storage
 */
const useAdminStore = create((set, get) => ({
  // ===== NAVEGACIÓN =====
  activeSection: "productos", // "productos" | "reservas" | "configuracion" | "storage"
  setActiveSection: (section) => set({ activeSection: section }),

  // ===== ESTADO GLOBAL =====
  loading: false,
  actionLoading: null, // string key: "guardarProducto", "eliminarProducto", "crearSubcategoria", etc.
  error: null,
  successMessage: null,
  setLoading: (loading) => set({ loading }),
  setActionLoading: (action) => set({ actionLoading: action }),
  setError: (error) => set({ error, successMessage: null, actionLoading: null }),
  setSuccess: (msg) => {
    set({ successMessage: msg, error: null, actionLoading: null });
    setTimeout(() => {
      const current = get().successMessage;
      if (current === msg) set({ successMessage: null });
    }, 3000);
  },
  clearMessages: () => set({ error: null, successMessage: null }),

  // ===== CATEGORÍAS Y PRODUCTOS =====
  categorias: obtenerCategorias(),
  categoriaSeleccionada: "bebidas",
  subcategorias: [],
  subcategoriaSeleccionada: null,
  productos: [],
  productoEditando: null,

  setCategoriaSeleccionada: (categoria) =>
    set({ categoriaSeleccionada: categoria, subcategoriaSeleccionada: null, productos: [] }),

  setSubcategoriaSeleccionada: (subcategoria) =>
    set({ subcategoriaSeleccionada: subcategoria }),

  setProductoEditando: (producto) => set({ productoEditando: producto }),

  // Cargar subcategorías de una categoría
  cargarSubcategorias: async (categoria) => {
    set({ loading: true, error: null });
    try {
      const subs = await obtenerSubcategorias(categoria);
      set({ subcategorias: subs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Cargar productos de una subcategoría
  cargarProductos: async (categoria, subcategoria) => {
    set({ loading: true, error: null });
    try {
      const prods = await obtenerProductos(categoria, subcategoria);
      set({ productos: prods, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Guardar producto (crear/actualizar)
  guardarProductoAdmin: async (categoria, subcategoria, productoId, datos) => {
    set({ actionLoading: "guardarProducto", error: null });
    try {
      const result = await guardarProducto(categoria, subcategoria, productoId, datos);
      if (result.ok) {
        get().setSuccess(productoId ? "Producto actualizado exitosamente" : "Producto creado exitosamente");
        set({ productoEditando: null });
        await get().cargarProductos(categoria, subcategoria);
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },

  // Eliminar producto
  eliminarProductoAdmin: async (categoria, subcategoria, productoId) => {
    set({ actionLoading: `eliminarProducto_${productoId}`, error: null });
    try {
      const result = await eliminarProducto(categoria, subcategoria, productoId);
      if (result.ok) {
        get().setSuccess("Producto eliminado exitosamente");
        await get().cargarProductos(categoria, subcategoria);
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },

  // Crear subcategoría
  crearSubcategoriaAdmin: async (categoria, nombre) => {
    set({ actionLoading: "crearSubcategoria", error: null });
    try {
      const result = await crearSubcategoria(categoria, nombre);
      if (result.ok) {
        get().setSuccess("Subcategoría creada exitosamente");
        await get().cargarSubcategorias(categoria);
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },

  // Eliminar subcategoría
  eliminarSubcategoriaAdmin: async (categoria, subcategoria) => {
    set({ actionLoading: `eliminarSubcategoria_${subcategoria}`, error: null });
    try {
      const result = await eliminarSubcategoria(categoria, subcategoria);
      if (result.ok) {
        set({ subcategoriaSeleccionada: null, productos: [] });
        get().setSuccess("Subcategoría eliminada exitosamente");
        await get().cargarSubcategorias(categoria);
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },

  // ===== RESERVAS =====
  reservas: [],
  reservaSeleccionada: null,

  setReservaSeleccionada: (reserva) => set({ reservaSeleccionada: reserva }),

  cargarReservas: async () => {
    set({ loading: true, error: null });
    try {
      const reservas = await obtenerReservas();
      set({ reservas, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarReservaAdmin: async (reservaId, datos) => {
    set({ loading: true, error: null });
    try {
      const result = await actualizarReserva(reservaId, datos);
      if (result.ok) {
        set({ successMessage: "Reserva actualizada exitosamente" });
        await get().cargarReservas();
      } else {
        set({ error: result.error });
      }
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      return { ok: false, error: error.message };
    }
  },

  eliminarReservaAdmin: async (reservaId) => {
    set({ actionLoading: `eliminarReserva_${reservaId}`, error: null });
    try {
      const result = await eliminarReserva(reservaId);
      if (result.ok) {
        set({ reservaSeleccionada: null });
        get().setSuccess("Reserva eliminada exitosamente");
        await get().cargarReservas();
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },

  // ===== CONFIGURACIÓN =====
  configuracion: [],

  cargarConfiguracion: async () => {
    set({ loading: true, error: null });
    try {
      const config = await obtenerConfiguracion();
      set({ configuracion: config, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarConfiguracionAdmin: async (docId, datos) => {
    set({ loading: true, error: null });
    try {
      const result = await actualizarConfiguracion(docId, datos);
      if (result.ok) {
        set({ successMessage: "Configuración actualizada exitosamente" });
        await get().cargarConfiguracion();
      } else {
        set({ error: result.error });
      }
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      return { ok: false, error: error.message };
    }
  },

  // ===== STORAGE =====
  imagenes: [],
  carpetaStorage: "productos",

  setCarpetaStorage: (carpeta) => set({ carpetaStorage: carpeta }),

  cargarImagenes: async (path) => {
    set({ loading: true, error: null });
    try {
      const imgs = await listarImagenes(path);
      set({ imagenes: imgs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  subirImagenAdmin: async (file, path) => {
    set({ actionLoading: "subirImagen", error: null });
    try {
      const result = await subirImagen(file, path);
      if (result.ok) {
        get().setSuccess("Imagen subida exitosamente");
        await get().cargarImagenes(path);
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },

  eliminarImagenAdmin: async (fullPath, carpeta) => {
    set({ actionLoading: `eliminarImagen_${fullPath}`, error: null });
    try {
      const result = await eliminarImagen(fullPath);
      if (result.ok) {
        get().setSuccess("Imagen eliminada exitosamente");
        await get().cargarImagenes(carpeta);
      } else {
        get().setError(result.error);
      }
      return result;
    } catch (error) {
      get().setError(error.message);
      return { ok: false, error: error.message };
    }
  },
}));

export default useAdminStore;
