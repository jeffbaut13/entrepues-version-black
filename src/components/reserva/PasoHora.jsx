import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Componente para seleccionar hora con dropdown expandible
 * Al expandir muestra 3 franjas: Mañana, Tarde, Noche
 * Formato 12 horas con am/pm, cada 30 minutos
 */
export default function PasoHora({ hour, minute, setHour, setMinute }) {
  const [isOpen, setIsOpen] = useState(false);

  // Franjas horarias - Formato 12 horas con am/pm
  const franjas = {
    morning: {
      label: "Mañana",
      horas: [
        "09:00 am",
        "09:30 am",
        "10:00 am",
        "10:30 am",
        "11:00 am",
        "11:30 am",
      ],
    },
    afternoon: {
      label: "Tarde",
      horas: [
        "12:00 pm",
        "12:30 pm",
        "01:00 pm",
        "01:30 pm",
        "02:00 pm",
        "02:30 pm",
        "03:00 pm",
        "03:30 pm",
        "04:00 pm",
        "04:30 pm",
      ],
    },
    evening: {
      label: "Noche",
      horas: [
        "05:00 pm",
        "05:30 pm",
        "06:00 pm",
        "06:30 pm",
        "07:00 pm",
        "07:30 pm",
      ],
    },
  };

  // Convertir formato 12 horas (ej: "02:00 pm") a 24 horas para el store
  const convertTo24Hour = (timeString) => {
    const [time, period] = timeString.split(" ");
    let [h, m] = time.split(":").map(Number);

    if (period === "pm" && h !== 12) {
      h += 12;
    } else if (period === "am" && h === 12) {
      h = 0;
    }

    return {
      hour: String(h).padStart(2, "0"),
      minute: String(m).padStart(2, "0"),
    };
  };

  // Convertir formato 24 horas a 12 horas para display
  const convertTo12HourDisplay = (h24, m24) => {
    const h = Number(h24);
    const m = Number(m24);
    let h12 = h;
    let period = "am";

    if (h >= 12) {
      period = "pm";
      if (h > 12) {
        h12 = h - 12;
      }
    }
    if (h < 12 && h !== 0) {
      h12 = h;
    }
    if (h === 0) {
      h12 = 12;
    }

    return `${String(h12).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )} ${period}`;
  };

  const handleSelectHora = useCallback(
    (timeString) => {
      const { hour: h24, minute: m24 } = convertTo24Hour(timeString);
      setHour(h24);
      setMinute(m24);
      setIsOpen(false);
    },
    [setHour, setMinute]
  );

  const isSelected = (timeString) => {
    const { hour: h24, minute: m24 } = convertTo24Hour(timeString);
    return h24 === hour && m24 === minute;
  };

  const selectedHourDisplay = convertTo12HourDisplay(hour, minute);

  const HoraButton = ({ timeString }) => (
    <button
      onClick={() => handleSelectHora(timeString)}
      className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
        isSelected(timeString)
          ? "bg-white text-black"
          : "bg-white/5 text-secondary hover:bg-white/20"
      }`}
    >
      {timeString}
    </button>
  );

  return (
    <div className="relative w-full">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/8 rounded-lg transition"
      >
        <div className="text-left">
          <p >Elige la hora de tu visita</p>
          <p className="font-semibold">
            {selectedHourDisplay}
          </p>
        </div>
        <ChevronDown
          className={`size-5 text-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 rounded-lg p-4 space-y-4">
              {/* Morning */}
              <div>
                <p className="text-secondary mb-3">
                  {franjas.morning.label}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {franjas.morning.horas.map((h) => (
                    <HoraButton key={h} timeString={h} />
                  ))}
                </div>
              </div>

              <div className="border-t border-secondary/10" />

              {/* Afternoon */}
              <div>
                <p className="text-secondary font-semibold text-sm mb-3">
                  {franjas.afternoon.label}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {franjas.afternoon.horas.map((h) => (
                    <HoraButton key={h} timeString={h} />
                  ))}
                </div>
              </div>

              <div className="border-t border-secondary/10" />

              {/* Evening */}
              <div>
                <p className="text-secondary font-semibold text-sm mb-3">
                  {franjas.evening.label}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {franjas.evening.horas.map((h) => (
                    <HoraButton key={h} timeString={h} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
