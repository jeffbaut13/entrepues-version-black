import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import useCheckoutStore from "../store/checkoutStore";

export const CheckoutSucces = () => {
  const navigate = useNavigate();
  const { obtenerReservaGuardada, resetCheckout } = useCheckoutStore();

  const reserva = useMemo(
    () => obtenerReservaGuardada(),
    [obtenerReservaGuardada]
  );

  useEffect(() => {
    if (!reserva) {
      navigate("/checkout");
    }
  }, [reserva, navigate]);

  const handleFinalizar = () => {
    resetCheckout();
    navigate("/");
  };

  const numeroReserva = reserva?.["numero-de-reserva"] || "----";
  const email = reserva?.email || "sin correo";
  const fecha = reserva?.fecha || "-";
  const hora = reserva?.hora || "-";
  const total = Number(reserva?.montoTotal || 0);

  if (!reserva) return null;

  return (
    <div className="size-full mx-auto flex justify-center items-center">
      <div className="md:max-w-2xl w-full overflow-hidden rounded-lg">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="text-center bg-dark text-secondary"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-8"
          >
            <h2 className="font-danson">
              <span className="!text-3xl md:!text-4xl">Gracias por tu</span>
              <br />
              <span className="!text-5xl md:!text-8xl md:leading-20">
                reserva
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="space-y-2"
          >
            <p>
              Te enviamos los detalles al correo: <strong>{email}</strong>
            </p>
            <p>
              N° de reserva: <strong>{numeroReserva}</strong>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex justify-center flex-col items-center gap-4 mx-auto bg-secondary p-8"
          >
            <Button
              type="button-primary"
              onClick={handleFinalizar}
              title="Finalizar"
              customClass="!border !border-dark px-12 py-3 !text-dark"
              fontSize="xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
