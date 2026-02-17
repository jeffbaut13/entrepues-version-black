import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import {
  getAmPm,
  convertTo12Hour,
  obtenerProximaHora,
  obtenerHoraAnterior,
  canIncrementHour,
  canDecrementHour,
  incrementarHora,
  decrementarHora,
  incrementarMinuto,
  decrementarMinuto,
} from "./horaUtils";

export default function PasoHora({ hour, minute, setHour, setMinute }) {
  // Convertir hour y minute a strings con formato correcto
  const hourStr = String(hour || "09").padStart(2, "0");
  const minuteStr = String(minute || "00").padStart(2, "0");

  return (
    <>
      <div className="select-none flex-1 px-12 py-2 flex-col items-center [&>div]:grid [&>div]:grid-cols-6 [&>div]:gap-1 [&>div]:w-full [&>div]:justify-items-center [&>div]:items-center">
        <div>
          {canIncrementHour(hourStr) && (
            <Button
              type="just-icon"
              onClick={() => incrementarHora(hourStr, setHour)}
              Icon={ChevronUp}
              customClass="col-start-2"
            />
          )}

          <Button
            type="just-icon"
            onClick={() => incrementarMinuto(minuteStr, setMinute)}
            Icon={ChevronUp}
            customClass="col-start-4"
          />
        </div>

        <div>
          {obtenerHoraAnterior(hourStr) ? (
            <div className="h-12 opacity-40 flex items-center justify-center flex-shrink-0 col-start-2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`prev-hour-${obtenerHoraAnterior(hourStr)}`}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {convertTo12Hour(obtenerHoraAnterior(hourStr))}
                </motion.span>
              </AnimatePresence>
            </div>
          ) : (
            <div />
          )}

          <div className="h-12 opacity-40 flex items-center justify-center flex-shrink-0 col-start-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`prev-minute-${minuteStr === "00" ? "30" : "00"}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {minuteStr === "00" ? "30" : "00"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="border-[1px] border-dark/30 rounded-full bg-dark text-secondary">
          <div className="font-bold flex items-center justify-center col-start-2 overflow-hidden h-12">
            <AnimatePresence mode="wait">
              <motion.span
                key={`current-hour-${hourStr}`}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {convertTo12Hour(hourStr)}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="col-start-3">:</span>

          <div className="font-bold flex items-center justify-center col-start-4 overflow-hidden h-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={`current-minute-${minuteStr}`}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {minuteStr}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="ml-2 px-3 py-1 font-semibold text-sm relative z-10 col-start-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`ampm-${getAmPm(hourStr)}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {getAmPm(hourStr)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div>
          {obtenerProximaHora(hourStr) ? (
            <div className="h-12 opacity-40 flex items-center justify-center flex-shrink-0 col-start-2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`next-hour-${obtenerProximaHora(hourStr)}`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {convertTo12Hour(obtenerProximaHora(hourStr))}
                </motion.span>
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-6"></div>
          )}

          <div className="h-12 opacity-40 flex items-center justify-center flex-shrink-0 col-start-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`next-minute-${minuteStr === "00" ? "30" : "00"}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {minuteStr === "00" ? "30" : "00"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div>
          {canDecrementHour(hourStr) ? (
            <Button
              type="just-icon"
              onClick={() => decrementarHora(hourStr, setHour)}
              Icon={ChevronDown}
              customClass="col-start-2"
            />
          ) : (
            <div />
          )}

          <Button
            type="just-icon"
            onClick={() => decrementarMinuto(minuteStr, setMinute)}
            Icon={ChevronDown}
            customClass="col-start-4"
          />
        </div>
      </div>
    </>
  );
}
