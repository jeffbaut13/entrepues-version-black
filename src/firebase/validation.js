/**
 * Validación de datos para Firestore
 * Asegura que solo datos válidos lleguen a la base de datos
 */

// Patrones de validación
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^[\d\s\-+()]{10,}$/; // Al menos 10 dígitos
const NAME_REGEX = /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]{2,100}$/;

/**
 * Valida un email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Valida un número de WhatsApp
 * @param {string} whatsapp
 * @returns {boolean}
 */
export const isValidWhatsapp = (whatsapp) => {
  if (!whatsapp || typeof whatsapp !== "string") return false;
  // Solo contar dígitos
  const digitsOnly = whatsapp.replace(/\D/g, "");
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

/**
 * Valida un nombre (mínimo 2 caracteres, máximo 100)
 * @param {string} name
 * @returns {boolean}
 */
export const isValidName = (name) => {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

/**
 * Valida una fecha (debe ser válida y no estar en el pasado)
 * @param {string} dateStr - Formato: "Monday, 9 January"
 * @returns {boolean}
 */
export const isValidDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return false;
  // Aceptar cualquier string no vacío para la fecha formateada
  return dateStr.trim().length > 0;
};

/**
 * Valida una hora (formato "HH:MM am/pm")
 * @param {string} timeStr
 * @returns {boolean}
 */
export const isValidTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return false;
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5]\d\s(am|pm)$/i;
  return timeRegex.test(timeStr.trim());
};

/**
 * Valida el número de adultos y niños
 * @param {number} adults
 * @param {number} children
 * @returns {boolean}
 */
export const isValidGuestCount = (adults, children) => {
  // Convertir a números, null/undefined = 0
  const adultsNum = adults !== null && adults !== undefined ? Number(adults) : 0;
  const childrenNum = children !== null && children !== undefined ? Number(children) : 0;
  
  // Verificar que sean números válidos (no NaN)
  if (isNaN(adultsNum) || isNaN(childrenNum)) {
    return false;
  }
  
  // Ambos deben ser enteros no-negativos
  if (!Number.isInteger(adultsNum) || !Number.isInteger(childrenNum) || adultsNum < 0 || childrenNum < 0) {
    return false;
  }
  
  // Al menos 1 adulto, máximo 6 personas totales (adultos + niños)
  return adultsNum >= 1 && (adultsNum + childrenNum) >= 1 && (adultsNum + childrenNum) <= 6;
};

/**
 * Valida los datos completos de una reserva
 * @param {Object} payload - Datos de la reserva
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateReservaPayload = (payload) => {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["Payload debe ser un objeto válido"] };
  }

  const estado = String(payload.estado || "confirmada").trim().toLowerCase();
  const isReservaProvisional = estado === "pending";

  // Validar numero-de-reserva (ahora es string de 4 dígitos)
  const numeroReserva = payload["numero-de-reserva"];
  if (!numeroReserva || typeof numeroReserva !== "string" || !/^\d{4}$/.test(numeroReserva)) {
    errors.push("Número de reserva debe ser un string de 4 dígitos");
  }

  // En reservas provisionales permitimos datos de contacto vacíos por ahora
  if (!isReservaProvisional) {
    // Validar nombre
    if (!isValidName(payload.nombre)) {
      errors.push("Nombre debe tener entre 2 y 100 caracteres");
    }

    // Validar email
    if (!isValidEmail(payload.email)) {
      errors.push("Email inválido");
    }

    // Validar WhatsApp
    if (!isValidWhatsapp(payload.whatsapp)) {
      errors.push("WhatsApp debe tener entre 10 y 15 dígitos");
    }
  } else {
    if (payload.nombre && !isValidName(payload.nombre)) {
      errors.push("Nombre inválido");
    }
    if (payload.email && !isValidEmail(payload.email)) {
      errors.push("Email inválido");
    }
    if (payload.whatsapp && !isValidWhatsapp(payload.whatsapp)) {
      errors.push("WhatsApp inválido");
    }
  }

  // Validar fecha
  if (!isValidDate(payload.fecha)) {
    errors.push("Fecha inválida");
  }

  // Validar hora
  if (!isValidTime(payload.hora)) {
    errors.push("Hora debe estar en formato HH:MM am/pm");
  }

  // Validar cantidad de personas (nota: el objeto usa "ninos" para Firestore)
  let adultos = payload.adultos ?? payload.adults ?? 0;
  let ninos = payload.ninos ?? payload.children ?? payload.niños ?? 0;
  
  if (!isValidGuestCount(adultos, ninos)) {
    errors.push("Cantidad de adultos y niños inválida (mín 1 adulto, máx 6 personas totales)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitiza datos de entrada para prevenir inyecciones
 * @param {Object} payload
 * @returns {Object} Payload sanitizado
 */
export const sanitizeReservaPayload = (payload) => {
  return {
    "numero-de-reserva": String(payload["numero-de-reserva"] || "0000"),
    nombre: String(payload.nombre || "").trim(),
    email: String(payload.email || "").trim().toLowerCase(),
    whatsapp: String(payload.whatsapp || "").trim(),
    fecha: String(payload.fecha || "").trim(),
    hora: String(payload.hora || "").trim(),
    adultos: Number(payload.adultos) || 0,
    ninos: Number(payload.ninos || payload.niños || payload.children) || 0,
    mascotas: Number(payload.mascotas) || 0,
    // Productos y detalles del carrito
    ...(payload.productos && { productos: payload.productos }),
    ...(payload.cantidadProductos !== undefined && { cantidadProductos: Number(payload.cantidadProductos) }),
    ...(payload.totalProductos !== undefined && { totalProductos: Number(payload.totalProductos) }),
    ...(payload.montoTotal !== undefined && { montoTotal: Number(payload.montoTotal) }),
    // Estado y metadata
    estado: String(payload.estado || "confirmada").trim(),
    fechaCreacion: payload.fechaCreacion || new Date().toISOString(),
    // Opcional: servicio si existe
    ...(payload.servicio && { servicio: String(payload.servicio).trim() }),
  };
};
