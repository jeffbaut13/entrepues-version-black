/**
 * Utilidades para manejo de horas en la reserva
 * Funciones reutilizables para el componente PasoHora
 */

export const generarHoras = () => {
  const horas = [];
  for (let i = 9; i < 20; i++) {
    horas.push(String(i).padStart(2, "0"));
  }
  return horas;
};

export const getAmPm = (hour) => {
  const hourNum = Number(hour);
  return hourNum >= 12 ? "pm" : "am";
};

export const convertTo12Hour = (hour24) => {
  const h = Number(hour24);
  if (h < 12) {
    return h;
  } else if (h === 12) {
    return 12;
  } else {
    return h - 12;
  }
};

export const obtenerProximaHora = (hour) => {
  const horas = generarHoras();
  const currentIndex = horas.indexOf(hour);
  return currentIndex < horas.length - 1 ? horas[currentIndex + 1] : null;
};

export const obtenerHoraAnterior = (hour) => {
  const horas = generarHoras();
  const currentIndex = horas.indexOf(hour);
  return currentIndex > 0 ? horas[currentIndex - 1] : null;
};

export const canIncrementHour = (hour) => {
  const horas = generarHoras();
  const currentIndex = horas.indexOf(hour);
  return currentIndex < horas.length - 1;
};

export const canDecrementHour = (hour) => {
  const horas = generarHoras();
  const currentIndex = horas.indexOf(hour);
  return currentIndex > 0;
};

export const incrementarHora = (hour, setHour) => {
  const horas = generarHoras();
  const currentIndex = horas.indexOf(hour);
  if (currentIndex < horas.length - 1) {
    setHour(horas[currentIndex + 1]);
  }
};

export const decrementarHora = (hour, setHour) => {
  const horas = generarHoras();
  const currentIndex = horas.indexOf(hour);
  if (currentIndex > 0) {
    setHour(horas[currentIndex - 1]);
  }
};

export const incrementarMinuto = (minute, setMinute) => {
  setMinute(minute === "00" ? "30" : "00");
};

export const decrementarMinuto = (minute, setMinute) => {
  setMinute(minute === "30" ? "00" : "30");
};
