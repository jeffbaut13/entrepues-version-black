import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Home, Notebook, X } from "lucide-react";
import { Button } from "../ui/Button";
import PlatosSeleccion from "./PlatosSeleccion";
import useReservaStore from "../../store/reservaStore";

/**
 * Página de agradecimiento después de confirmar la reserva
 */
export default function ThankYouPage({ onClose, reservaResult }) {
  /*   const [mostrarSeleccionPlatos, setMostrarSeleccionPlatos] = useState(true); */
  const [mostrarSeleccionPlatos, setMostrarSeleccionPlatos] = useState(false);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [totalGuardado, setTotalGuardado] = useState(0);

  const numeroReserva = reservaResult?.["numero-de-reserva"] || "N/A";
  const firestoreId = reservaResult?.firestoreId || "N/A";

  const detalleAsistentes = [];

  // Crear array de asistentes con sus nombres
  for (let i = 0; i < (reservaResult?.adultos || 0); i++) {
    detalleAsistentes.push(`Adulto ${i + 1}`);
  }
  for (let i = 0; i < (reservaResult?.ninos || 0); i++) {
    detalleAsistentes.push(`Niño ${i + 1}`);
  }

  const handleSeleccionPlatos = () => {
    setMostrarSeleccionPlatos(true);
  };

  const handleConfirmarPlatos = (datosJSON) => {
    console.log("Datos de platos guardados:", datosJSON);

    if (datosJSON.exitoso) {
      // Si se guardó exitosamente en Firestore, mostrar la pantalla de éxito
      setTotalGuardado(datosJSON.total);
      setGuardadoExitoso(true);
      setMostrarSeleccionPlatos(false);
    }
  };

  const handleVolverSeleccion = () => {
    setMostrarSeleccionPlatos(false);
  };

  // Si se guardó exitosamente, mostrar pantalla de éxito
  if (guardadoExitoso) {
    return (
      <div className="size-full mx-auto flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="text-center bg-white/95 rounded-lg p-12 max-w-md"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-dark mb-6">
              Tus productos han sido guardados con éxito
            </p>
          </motion.div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-dark/5 rounded-lg p-4 mb-8"
          >
            <p className="text-sm text-dark/60 mb-2">Total a pagar:</p>
            <p className="text-3xl font-bold text-dark">
              ${totalGuardado.toLocaleString("es-CO")}
            </p>
          </motion.div>

          <Button
            onClick={onClose}
            title="Cerrar"
            type="button-dark"
            customClass="w-full py-2"
          />
        </motion.div>
      </div>
    );
  }

  // Si se está seleccionando platos, mostrar ese componente
  if (mostrarSeleccionPlatos) {
    return (
      <div className="size-full mx-auto flex justify-center items-center">
        <div className="p-8 md:max-w-7xl w-full h-full flex flex-col">
          <PlatosSeleccion
            asistentes={detalleAsistentes}
            firestoreId={firestoreId}
            onConfirmar={handleConfirmarPlatos}
            onVolver={handleVolverSeleccion}
          />
        </div>
      </div>
    );
  }

  // Mostrar la página de agradecimiento original
  return (
    <div className="size-full mx-auto flex justify-center items-center">
      <div className="p-12 md:max-w-4xl bg-white/20 rounded-lg ">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="text-center bg-[#faf7f1] rounded-lg p-6"
        >
          {/* Título */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <h2 className="font-danson mb-12">
              <span className="!text-5xl">Gracias por tu</span> <br />
              <span className="!text-[9rem] leading-20">reserva</span>
            </h2>
          </motion.div>

          {/* Detalles de la reserva */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className=""
          >
            <div>
              <p>Te enviamos los detalles al correo</p>
              <p>
                N° de reserva <strong>{numeroReserva}</strong>
              </p>
            </div>
          </motion.div>

          {/* Marchar plato*/}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-18 flex justify-center flex-col items-center gap-10 mx-auto"
          >
            <p>
              ¿Quieres elegir tus platos ahora o prefieres hacerlo al llegar?
            </p>
            <Button
              type="button-dark"
              onClick={handleSeleccionPlatos}
              title="Si, elegir ahora"
              customClass={`min-w-80 py-1.5`}
              fontSize="xl"
            />
            <Button
              type="button-dark"
              onClick={onClose}
              title="No, finalizar"
              customClass={`min-w-80 py-1.5`}
              fontSize="xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
