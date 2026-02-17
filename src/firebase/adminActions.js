import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { app } from "./config";

const db = getFirestore(app);
const storage = getStorage(app);

// ===== CATEGORÍAS (colecciones de productos) =====

const CATEGORIAS = [
  "bebidas",
  "desayunos",
  "entradas",
  "platos_fuertes",
  "postres",
];

/**
 * Obtener la lista de categorías disponibles
 */
export const obtenerCategorias = () => CATEGORIAS;

/**
 * Obtener todas las subcategorías de una categoría
 */
export const obtenerSubcategorias = async (categoria) => {
  try {
    const categoriaRef = collection(db, categoria);
    const snapshot = await getDocs(categoriaRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error obteniendo subcategorías de ${categoria}:`, error);
    throw error;
  }
};

/**
 * Crear una nueva subcategoría (documento vacío en la colección)
 */
export const crearSubcategoria = async (categoria, nombreSubcategoria) => {
  try {
    const subcategoriaRef = doc(db, categoria, nombreSubcategoria);
    await setDoc(subcategoriaRef, {});
    return { ok: true, id: nombreSubcategoria };
  } catch (error) {
    console.error("Error creando subcategoría:", error);
    return { ok: false, error: error.message };
  }
};

/**
 * Eliminar subcategoría completa (documento)
 */
export const eliminarSubcategoria = async (categoria, nombreSubcategoria) => {
  try {
    const subcategoriaRef = doc(db, categoria, nombreSubcategoria);
    await deleteDoc(subcategoriaRef);
    return { ok: true };
  } catch (error) {
    console.error("Error eliminando subcategoría:", error);
    return { ok: false, error: error.message };
  }
};

// ===== PRODUCTOS =====

/**
 * Obtener todos los productos de una subcategoría
 */
export const obtenerProductos = async (categoria, subcategoria) => {
  try {
    const subcategoriaRef = doc(db, categoria, subcategoria);
    const snap = await getDoc(subcategoriaRef);

    if (!snap.exists()) return [];

    const data = snap.data();
    return Object.entries(data).map(([id, producto]) => ({
      id,
      ...producto,
    }));
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};

/**
 * Crear o actualizar un producto dentro de una subcategoría
 * Soporta campos dinámicos (custom fields)
 */
export const guardarProducto = async (
  categoria,
  subcategoria,
  productoId,
  datosProducto
) => {
  try {
    const subcategoriaRef = doc(db, categoria, subcategoria);
    // Construir objeto con todos los campos (fijos + custom)
    const productoData = {};
    Object.entries(datosProducto).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        productoData[key] = value;
      }
    });
    // Asegurar campos mínimos
    if (!productoData.nombre) productoData.nombre = productoId;
    if (!productoData.img) productoData.img = "/imagenes/default.jpg";

    await updateDoc(subcategoriaRef, {
      [productoId]: productoData,
    });
    return { ok: true, id: productoId };
  } catch (error) {
    // Si el doc no existe, crear con setDoc
    if (error.code === "not-found") {
      try {
        const subcategoriaRef = doc(db, categoria, subcategoria);
        const productoData = {};
        Object.entries(datosProducto).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            productoData[key] = value;
          }
        });
        if (!productoData.nombre) productoData.nombre = productoId;
        if (!productoData.img) productoData.img = "/imagenes/default.jpg";

        await setDoc(subcategoriaRef, {
          [productoId]: productoData,
        });
        return { ok: true, id: productoId };
      } catch (innerError) {
        console.error("Error creando producto:", innerError);
        return { ok: false, error: innerError.message };
      }
    }
    console.error("Error guardando producto:", error);
    return { ok: false, error: error.message };
  }
};

/**
 * Eliminar un producto de una subcategoría
 */
export const eliminarProducto = async (
  categoria,
  subcategoria,
  productoId
) => {
  try {
    const subcategoriaRef = doc(db, categoria, subcategoria);
    await updateDoc(subcategoriaRef, {
      [productoId]: deleteField(),
    });
    return { ok: true };
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return { ok: false, error: error.message };
  }
};

// ===== RESERVAS =====

/**
 * Obtener todas las reservas
 */
export const obtenerReservas = async () => {
  try {
    const reservasRef = collection(db, "reservas");
    const snapshot = await getDocs(reservasRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error obteniendo reservas:", error);
    throw error;
  }
};

/**
 * Obtener una reserva por ID
 */
export const obtenerReservaPorId = async (reservaId) => {
  try {
    const reservaRef = doc(db, "reservas", reservaId);
    const snap = await getDoc(reservaRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error("Error obteniendo reserva:", error);
    throw error;
  }
};

/**
 * Actualizar campos de una reserva
 */
export const actualizarReserva = async (reservaId, datos) => {
  try {
    const reservaRef = doc(db, "reservas", reservaId);
    await updateDoc(reservaRef, {
      ...datos,
      updatedAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    console.error("Error actualizando reserva:", error);
    return { ok: false, error: error.message };
  }
};

/**
 * Eliminar una reserva
 */
export const eliminarReserva = async (reservaId) => {
  try {
    const reservaRef = doc(db, "reservas", reservaId);
    await deleteDoc(reservaRef);
    return { ok: true };
  } catch (error) {
    console.error("Error eliminando reserva:", error);
    return { ok: false, error: error.message };
  }
};

// ===== CONFIGURACIÓN =====

/**
 * Obtener documentos de configuración
 */
export const obtenerConfiguracion = async () => {
  try {
    const configRef = collection(db, "configuracion");
    const snapshot = await getDocs(configRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error obteniendo configuración:", error);
    throw error;
  }
};

/**
 * Actualizar un documento de configuración
 */
export const actualizarConfiguracion = async (docId, datos) => {
  try {
    const configRef = doc(db, "configuracion", docId);
    await setDoc(configRef, datos, { merge: true });
    return { ok: true };
  } catch (error) {
    console.error("Error actualizando configuración:", error);
    return { ok: false, error: error.message };
  }
};

// ===== FIREBASE STORAGE =====

/**
 * Subir una imagen a Firebase Storage
 */
export const subirImagen = async (file, path = "productos") => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { ok: true, url, path: `${path}/${fileName}` };
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return { ok: false, error: error.message };
  }
};

/**
 * Listar imágenes en una carpeta de Storage
 */
export const listarImagenes = async (path = "productos") => {
  try {
    const listRef = ref(storage, path);
    const result = await listAll(listRef);
    const items = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url,
        };
      })
    );
    return items;
  } catch (error) {
    console.error("Error listando imágenes:", error);
    return [];
  }
};

/**
 * Eliminar una imagen de Storage
 */
export const eliminarImagen = async (fullPath) => {
  try {
    const imageRef = ref(storage, fullPath);
    await deleteObject(imageRef);
    return { ok: true };
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    return { ok: false, error: error.message };
  }
};
