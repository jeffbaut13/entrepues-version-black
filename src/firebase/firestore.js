import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "./config";
import { validateReservaPayload, sanitizeReservaPayload } from "./validation";

const db = getFirestore(app);

// Número máximo de reintentos
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 segundo entre reintentos

/**
 * Espera un tiempo antes de reintentar
 * @param {number} attempt - Número de intento (0-indexed)
 * @returns {number} Milisegundos a esperar
 */
const getRetryDelay = (attempt) => {
  return RETRY_DELAY_MS * Math.pow(2, attempt); // Exponencial: 1s, 2s, 4s
};

/**
 * Obtiene el siguiente número de reserva incremental (0000-9999)
 * Usa transacciones para garantizar números únicos
 * @returns {Promise<number>}
 */
export const obtenerSiguienteNumeroReserva = async () => {
  const contadorRef = doc(db, "configuracion", "contadorReservas");

  try {
    const nuevoNumero = await runTransaction(db, async (transaction) => {
      const contadorDoc = await transaction.get(contadorRef);

      let ultimoNumero = 0;
      
      if (contadorDoc.exists()) {
        ultimoNumero = contadorDoc.data().ultimoNumero || 0;
      }

      // Incrementar (si llega a 9999, reinicia a 0)
      const siguienteNumero = ultimoNumero >= 9999 ? 0 : ultimoNumero + 1;

      // Actualizar contador
      transaction.set(contadorRef, {
        ultimoNumero: siguienteNumero,
        actualizadoEn: serverTimestamp(),
      });

      return siguienteNumero;
    });

    return nuevoNumero;
  } catch (error) {
    console.error("Error obteniendo número de reserva:", error);
    // Fallback: retornar un número basado en timestamp
    return parseInt(Date.now().toString().slice(-4));
  }
};

/**
 * Guarda la reserva en Firestore con validación y reintentos
 * @param {Object} payload - Datos de la reserva
 * @returns {Promise<{ok: boolean, id?: string, error?: string}>}
 */
export const guardarReservaEnFirestore = async (payload) => {
  // 1. Validar datos
  const validation = validateReservaPayload(payload);
  if (!validation.valid) {
    console.error("Validación fallida:", validation.errors);
    return {
      ok: false,
      error: `Datos inválidos: ${validation.errors.join(", ")}`,
    };
  }

  // 2. Sanitizar datos
  const sanitized = sanitizeReservaPayload(payload);

  // 3. Intentar guardar con reintentos
  let lastError = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const docRef = await addDoc(collection(db, "reservas"), {
        ...sanitized,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
       
      return { ok: true, id: docRef.id };
    } catch (error) {
      lastError = error;
      console.error(
        `Intento ${attempt + 1}/${MAX_RETRIES} fallido:`,
        error.message
      );

      // Si es el último intento, no esperar
      if (attempt < MAX_RETRIES - 1) {
        const delay = getRetryDelay(attempt);
        console.log(`Reintentando en ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // 4. Retornar error final
  console.error("Error guardando en Firestore después de reintentos:", lastError);
  return {
    ok: false,
    error: lastError?.message || "Error desconocido al guardar reserva",
  };
};
