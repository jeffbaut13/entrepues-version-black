/**
 * Formatea una fecha a formato legible en español
 * Ejemplo: new Date() → "Thursday, 9 January"
 * @param {Date} date - Objeto Date a formatear
 * @returns {string} Fecha formateada
 */
export const formatDateSpanish = (date) => {
  if (!date || !(date instanceof Date)) {
    return "";
  }
  const options = { weekday: "long", day: "numeric", month: "long" };
  return date.toLocaleDateString("es-CO", options);
};

/**
 * Formatea hora a formato "HH:MM am/pm"
 * @param {string} hour - Hora (01-12)
 * @param {string} minute - Minuto (00-59)
 * @param {string} amPm - "am" o "pm"
 * @returns {string} Hora formateada "07:30 pm"
 */
export const formatTime = (hour, minute, amPm) => {
  return `${hour}:${minute} ${amPm}`;
};

/**
 * Parsea una hora formateada a componentes
 * Entrada: "07:30 pm" → Salida: { hour: "07", minute: "30", amPm: "pm" }
 * @param {string} timeStr - Hora formateada
 * @returns {Object} { hour, minute, amPm }
 */
export const parseTime = (timeStr) => {
  const match = timeStr.match(/^(\d{2}):(\d{2})\s(am|pm)$/i);
  if (!match) return null;
  return {
    hour: match[1],
    minute: match[2],
    amPm: match[3].toLowerCase(),
  };
};
