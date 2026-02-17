import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./config";
import {
  guardarReservaEnFirestore,
  obtenerSiguienteNumeroReserva,
} from "./firestore";

const db = getFirestore(app);
const CATEGORIAS = [
  "bebidas",
  "desayunos",
  "entradas",
  "platos_fuertes",
  "postres",
];

/**
 * Parsear productos desde un documento
 * @private
 */
const parsearProductos = (subcategoriaData, nombreSubcategoria) => {
  const productos = [];

  Object.entries(subcategoriaData).forEach(
    ([nombreProducto, datosProducto]) => {
      if (
        datosProducto &&
        typeof datosProducto === "object" &&
        datosProducto.precio
      ) {
        productos.push({
          id: nombreProducto,
          nombre: datosProducto.nombre || nombreProducto,
          precio: datosProducto.precio,
          descripcion: datosProducto.descripcion || "",
          img: datosProducto.img || "/imagenes/default.jpg",
          subcategoria: nombreSubcategoria,
        });
      }
    }
  );

  return productos;
};

/**
 * Obtener todas las categorías con subcategorías y productos
 * @returns {Promise<Object>} Estructura: {categoria: {nombre, subcategorias: {subcategoria: {nombre, productos}}}}
 */
export const obtenerTodasLasCategorias = async () => {
  try {
    const estructuraCategorias = {};

    for (const nombreCategoria of CATEGORIAS) {
      const categoriaRef = collection(db, nombreCategoria);
      const subcategoriasSnapshot = await getDocs(categoriaRef);

      const subcategorias = {};

      for (const subcategoriaDoc of subcategoriasSnapshot.docs) {
        const nombreSubcategoria = subcategoriaDoc.id;
        const productos = parsearProductos(
          subcategoriaDoc.data(),
          nombreSubcategoria
        );

        subcategorias[nombreSubcategoria] = {
          nombre: nombreSubcategoria,
          productos: productos,
        };
      }

      estructuraCategorias[nombreCategoria] = {
        nombre: nombreCategoria,
        subcategorias: subcategorias,
      };
    }

    return estructuraCategorias;
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    throw error;
  }
};

/**
 * Obtener una categoría específica
 * @param {string} nombreCategoria
 * @returns {Promise<Object>} {nombre, subcategorias: {subcategoria: {nombre, productos}}}
 */
export const obtenerCategoriaPorNombre = async (nombreCategoria) => {
  try {
    const categoriaRef = collection(db, nombreCategoria);
    const subcategoriasSnapshot = await getDocs(categoriaRef);

    const subcategorias = {};

    for (const subcategoriaDoc of subcategoriasSnapshot.docs) {
      const nombreSubcategoria = subcategoriaDoc.id;
      const productos = parsearProductos(
        subcategoriaDoc.data(),
        nombreSubcategoria
      );

      subcategorias[nombreSubcategoria] = {
        nombre: nombreSubcategoria,
        productos: productos,
      };
    }

    return {
      nombre: nombreCategoria,
      subcategorias: subcategorias,
    };
  } catch (error) {
    console.error(`❌ Error al obtener categoría ${nombreCategoria}:`, error);
    throw error;
  }
};

/**
 * Obtener productos de una subcategoría específica
 * @param {string} nombreCategoria
 * @param {string} nombreSubcategoria
 * @returns {Promise<Object>} {categoria, subcategoria, productos}
 */
export const obtenerProductosPorSubcategoria = async (
  nombreCategoria,
  nombreSubcategoria
) => {
  try {
    const subcategoriaRef = doc(db, nombreCategoria, nombreSubcategoria);
    const subcategoriaSnap = await getDoc(subcategoriaRef);

    if (!subcategoriaSnap.exists()) {
      return {
        categoria: nombreCategoria,
        subcategoria: nombreSubcategoria,
        productos: [],
      };
    }

    const productos = parsearProductos(
      subcategoriaSnap.data(),
      nombreSubcategoria
    );

    return {
      categoria: nombreCategoria,
      subcategoria: nombreSubcategoria,
      productos: productos,
    };
  } catch (error) {
    console.error(
      `❌ Error al obtener productos de ${nombreSubcategoria}:`,
      error
    );
    throw error;
  }
};

/**
 * Obtener un producto específico de una subcategoría
 * @param {string} nombreCategoria
 * @param {string} nombreSubcategoria
 * @param {string} productoId - ID del producto en el mapa
 * @returns {Promise<Object|null>} Producto o null si no existe
 */
export const obtenerProductoPorId = async (
  nombreCategoria,
  nombreSubcategoria,
  productoId
) => {
  try {
    const subcategoriaRef = doc(db, nombreCategoria, nombreSubcategoria);
    const subcategoriaSnap = await getDoc(subcategoriaRef);

    if (!subcategoriaSnap.exists()) {
      return null;
    }

    const subcategoriaData = subcategoriaSnap.data();
    const datosProducto = subcategoriaData[productoId];

    if (!datosProducto || typeof datosProducto !== "object") {
      return null;
    }

    return {
      id: productoId,
      nombre: datosProducto.nombre || productoId,
      precio: datosProducto.precio,
      descripcion: datosProducto.descripcion || "",
      img: datosProducto.img || "/imagenes/default.jpg",
      subcategoria: nombreSubcategoria,
      ...datosProducto,
    };
  } catch (error) {
    console.error(
      `❌ Error al obtener producto ${productoId}:`,
      error
    );
    throw error;
  }
};

/**
 * Guardar productos seleccionados en una reserva existente
 * @param {string} firestoreId - ID del documento de la reserva
 * @param {Array} platosSeleccionados - Array con estructura: [{asistente, asistenteIndex, platos: [{id, nombre, precio, ...}], totalPlatos}]
 * @returns {Promise<{success: boolean, message: string, total: number}>}
 */
export const guardarProductosEnReserva = async (
  firestoreId,
  platosSeleccionados
) => {
  try {
    // Calcular el total sumando los precios de todos los platos
    let totalMonto = 0;
    let totalProductos = 0;

    platosSeleccionados.forEach((asistenteData) => {
      asistenteData.platos.forEach((plato) => {
        totalMonto += parseFloat(plato.precio) || 0;
        totalProductos += 1;
      });
    });

    // Referencia al documento de la reserva
    const reservaRef = doc(db, "reservas", firestoreId);

    // Estructura de datos a guardar
    const productosData = {
      totalProductos: totalProductos,
      total: totalMonto,
      detalleAsistentes: platosSeleccionados,
      fechaActualizacion: new Date().toISOString(),
    };

    // Actualizar el documento
    await updateDoc(reservaRef, {
      productos: productosData,
    });

    console.log(
      `✅ Productos guardados exitosamente. Total: $${totalMonto.toLocaleString(
        "es-CO"
      )}`
    );

    return {
      success: true,
      message: "Productos guardados con éxito",
      total: totalMonto,
      totalProductos: totalProductos,
    };
  } catch (error) {
    console.error("❌ Error al guardar productos en reserva:", error);
    throw error;
  }
};

/**
 * Crear una reserva provisional con platos por asistente
 * @param {Object} params
 * @param {Object} params.reservaData - Datos base de la reserva (fecha, hora, contacto, asistentes)
 * @param {Array} params.detalleAsistentes - Platos agrupados por asistente
 * @returns {Promise<{ok: boolean, id?: string, data?: Object, error?: string}>}
 */
export const crearReservaProvisionalConPlatos = async ({
  reservaData,
  detalleAsistentes,
}) => {
  try {
    if (!reservaData) {
      return { ok: false, error: "No hay datos de reserva" };
    }

    const adultos = Number(reservaData.adults || 0);
    const ninos = Number(reservaData.children || 0);
    const mascotas = Number(reservaData.mascotas || 0);

    const fechaObj = new Date(reservaData.selectedDate);
    const fechaFormateada = fechaObj.toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const hour24 = parseInt(reservaData.hour, 10);
    const minute = String(reservaData.minute || "00").padStart(2, "0");
    const period = hour24 >= 12 ? "pm" : "am";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const horaFormateada = `${String(hour12).padStart(2, "0")}:${minute} ${period}`;

    const totalProductos = (detalleAsistentes || []).reduce(
      (sum, asistente) => sum + Number(asistente.totalPlatos || 0),
      0
    );

    const montoTotal = (detalleAsistentes || []).reduce(
      (sum, asistente) => sum + Number(asistente.totalPrecio || 0),
      0
    );

    const numeroReserva = await obtenerSiguienteNumeroReserva();
    const numeroReservaFormateado = String(numeroReserva).padStart(4, "0");

    const ahora = new Date().toISOString();

    const payload = {
      "numero-de-reserva": numeroReservaFormateado,
      nombre: reservaData.name || "",
      email: reservaData.email || "",
      whatsapp: reservaData.whatsapp || "",
      fecha: fechaFormateada,
      hora: horaFormateada,
      adultos,
      ninos,
      mascotas,
      estado: "pending",
      fechaCreacion: ahora,
      fechaActualizacion: ahora,
      servicio: "reserva_provisional",
      productos: {
        totalProductos,
        montoTotal,
        detalleAsistentes: detalleAsistentes || [],
      },
      cantidadProductos: totalProductos,
      totalProductos,
      montoTotal,
    };

    const res = await guardarReservaEnFirestore(payload);

    if (!res.ok) {
      return { ok: false, error: res.error || "No se pudo crear la reserva" };
    }

    return {
      ok: true,
      id: res.id,
      data: payload,
    };
  } catch (error) {
    console.error("❌ Error creando reserva provisional:", error);
    return {
      ok: false,
      error: error?.message || "Error creando reserva provisional",
    };
  }
};

/**
 * Crear una reserva completa desde checkout en estado pending
 * La pasarela de pago puede estar deshabilitada (modo temporal)
 * @param {Object} params
 * @param {Object} params.datosReserva - Datos temporales guardados desde selección
 * @param {Object} params.datosContacto - Datos ingresados en checkout
 * @param {string} params.metodoPago - Método seleccionado por usuario
 * @param {number} params.montoTotal - Subtotal
 * @param {number} params.impuestos - Impuestos calculados
 * @param {number} params.montoFinal - Total final
 * @param {Object} params.transaccion - Referencia transaccional local
 * @returns {Promise<{ok: boolean, id?: string, data?: Object, error?: string}>}
 */
export const crearReservaPendienteDesdeCheckout = async ({
  datosReserva,
  datosContacto,
  metodoPago,
  montoTotal,
  impuestos,
  montoFinal,
  transaccion,
}) => {
  try {
    if (!datosReserva?.reservaData) {
      return { ok: false, error: "No hay datos de reserva para guardar" };
    }

    const reservaData = datosReserva.reservaData;
    const detalleAsistentes = Array.isArray(datosReserva.platosSeleccionados)
      ? datosReserva.platosSeleccionados
      : [];

    const adultos = Number(reservaData.adults || 0);
    const ninos = Number(reservaData.children || 0);
    const mascotas = Number(reservaData.mascotas || 0);

    const fechaObj = new Date(reservaData.selectedDate);
    const fechaFormateada = fechaObj.toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const hour24 = parseInt(reservaData.hour, 10);
    const minute = String(reservaData.minute || "00").padStart(2, "0");
    const period = hour24 >= 12 ? "pm" : "am";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const horaFormateada = `${String(hour12).padStart(2, "0")}:${minute} ${period}`;

    const totalProductos = detalleAsistentes.reduce((sum, asistente) => {
      const totalPlatosAsistente = Number(asistente?.totalPlatos || 0);
      if (totalPlatosAsistente > 0) return sum + totalPlatosAsistente;

      return (
        sum +
        (Array.isArray(asistente?.platos)
          ? asistente.platos.reduce(
              (acc, plato) => acc + Number(plato?.cantidad || 1),
              0
            )
          : 0)
      );
    }, 0);

    const numeroReserva = await obtenerSiguienteNumeroReserva();
    const numeroReservaFormateado = String(numeroReserva).padStart(4, "0");
    const ahora = new Date().toISOString();

    const payload = {
      "numero-de-reserva": numeroReservaFormateado,
      nombre: datosContacto?.nombre || reservaData.name || "",
      email: datosContacto?.email || reservaData.email || "",
      whatsapp: datosContacto?.whatsapp || reservaData.whatsapp || "",
      fecha: fechaFormateada,
      hora: horaFormateada,
      adultos,
      ninos,
      mascotas,
      estado: "pending",
      fechaCreacion: ahora,
      fechaActualizacion: ahora,
      servicio: "checkout_onepage",
      observaciones: datosContacto?.notas || "",
      metodoPago: metodoPago || "tarjeta",
      pasarela: {
        habilitada: false,
        proveedor: null,
        estado: "disabled",
      },
      checkout: {
        subtotal: Number(montoTotal || 0),
        impuestos: Number(impuestos || 0),
        total: Number(montoFinal || 0),
        currency: "COP",
      },
      transaccion: {
        id: transaccion?.id || `TXN-${Date.now()}`,
        referencia: transaccion?.referencia || `REF-${Date.now()}`,
        estado: "pending",
        pasarela: "disabled",
      },
      productos: {
        totalProductos,
        montoTotal: Number(montoFinal || 0),
        detalleAsistentes,
      },
      cantidadProductos: totalProductos,
      totalProductos,
      montoTotal: Number(montoFinal || 0),
    };

    const res = await guardarReservaEnFirestore(payload);

    if (!res.ok) {
      return { ok: false, error: res.error || "No se pudo guardar la reserva" };
    }

    return {
      ok: true,
      id: res.id,
      data: payload,
    };
  } catch (error) {
    console.error("❌ Error creando reserva pending desde checkout:", error);
    return {
      ok: false,
      error: error?.message || "Error guardando reserva desde checkout",
    };
  }
};

