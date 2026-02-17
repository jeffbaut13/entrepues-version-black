import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  User,
  MessageSquare,
  LoaderIcon,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import useCheckoutStore from "../store/checkoutStore";
import useReservaStore from "../store/reservaStore";

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mostrarExito, setMostrarExito] = useState(false);

  // Determinar el estado basado en la URL
  const isSuccessPage = location.pathname.includes("/success");
  const isCancelPage = location.pathname.includes("/cancel");
  const { showMenuSelected, limpiarDatosCheckout, resetReserva } =
    useReservaStore();

  const {
    datosReserva,
    datosContacto,
    metodoPago,
    montoTotal,
    impuestos,
    montoFinal,
    pagoEnProceso,
    pagoCompletado,
    error,
    transaccion,
    cargarDatosReserva,
    updateDatosContacto,
    setMetodoPago,
    iniciarPago,
    clearError,
    resetCheckout,
  } = useCheckoutStore();

  // Cargar datos al montar el componente
  useEffect(() => {
    // Si es página de success o cancel, no cargar datos nuevos
    if (isSuccessPage || isCancelPage) {
      return;
    }

    const resultado = cargarDatosReserva();
    if (!resultado.ok) {
      // Si no hay datos, redirigir al inicio
      navigate("/reservar");
    }
  }, [isSuccessPage, isCancelPage]);

  // Manejar pago completado
  useEffect(() => {
    if (pagoCompletado || isSuccessPage) {
      setMostrarExito(true);
    }
  }, [pagoCompletado, isSuccessPage]);

  const handlePagar = async () => {
    clearError();
    const resultado = await iniciarPago();
    if (resultado.ok) {
      limpiarDatosCheckout();
      resetReserva();
      showMenuSelected(false);
      navigate("/checkout/success");
      return;
    }

    if (!resultado.ok) {
      console.error("Error al procesar pago:", resultado.error);
    }
  };

  const handleContactoChange = (campo, valor) => {
    updateDatosContacto({ [campo]: valor });
  };

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatearHora = (hora, minuto) => {
    if (!hora || !minuto) return "";
    const hour24 = parseInt(hora);
    let hour12 = hour24;
    let period = "AM";

    if (hour24 >= 12) {
      period = "PM";
      if (hour24 > 12) {
        hour12 = hour24 - 12;
      }
    }
    if (hour24 === 0) {
      hour12 = 12;
    }

    return `${String(hour12).padStart(2, "0")}:${minuto} ${period}`;
  };

  // Si no hay datos de reserva y no es página especial, mostrar cargando
  if (!datosReserva && !isSuccessPage && !isCancelPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <LoaderIcon className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Cargando datos de la reserva...</p>
        </div>
      </div>
    );
  }

  // Página de cancelación
  if (isCancelPage) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pago Cancelado
          </h1>

          <p className="text-gray-600 mb-6">
            El proceso de pago fue cancelado. No se realizó ningún cargo. Puedes
            intentar nuevamente cuando desees.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/checkout")}
              className="w-full"
              variant="primary"
            >
              Intentar de Nuevo
            </Button>

            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              className="w-full"
            >
              Volver al Inicio
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Página de éxito
  if (mostrarExito) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Reserva Confirmada!
          </h1>

          <p className="text-gray-600 mb-6">
            Tu reserva ha sido procesada exitosamente. Recibirás un email de
            confirmación pronto.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Número de referencia:</p>
            <p className="font-mono font-bold text-lg">
              {transaccion?.referencia}
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/")}
              className="w-full"
              variant="primary"
            >
              Volver al Inicio
            </Button>

            <Button
              onClick={resetCheckout}
              variant="secondary"
              className="w-full"
            >
              Nueva Reserva
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="size-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Panel Izquierdo - Resumen */}
          <motion.div
            className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Resumen de tu Reserva
            </h2>

            {/* Detalles de la Reserva */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-[#8B4513]" />
                <div>
                  <p className="font-medium text-gray-800">Fecha</p>
                  <p className="text-gray-600">
                    {formatearFecha(datosReserva.reservaData?.selectedDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#8B4513]" />
                <div>
                  <p className="font-medium text-gray-800">Hora</p>
                  <p className="text-gray-600">
                    {formatearHora(
                      datosReserva.reservaData?.hour,
                      datosReserva.reservaData?.minute
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#8B4513]" />
                <div>
                  <p className="font-medium text-gray-800">Comensales</p>
                  <p className="text-gray-600">
                    {datosReserva.reservaData?.adults} adulto(s)
                    {datosReserva.reservaData?.children > 0 &&
                      `, ${datosReserva.reservaData.children} niño(s)`}
                  </p>
                </div>
              </div>
            </div>

            {/* Platos Seleccionados */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Platos Seleccionados
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                {datosReserva.platosSeleccionados?.map((asistente, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <p className="font-medium text-gray-700 text-sm mb-2">
                      {asistente.nombre}
                    </p>
                    {asistente.platos?.map((plato, platoIndex) => (
                      <div
                        key={platoIndex}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-gray-600 text-sm">
                          {plato.cantidad}x {plato.nombre}
                        </span>
                        <span className="font-medium text-gray-800">
                          ${plato.precio * plato.cantidad}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de Costos */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${montoTotal?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (19%)</span>
                  <span className="font-medium">
                    ${impuestos?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-2">
                  <span>Total</span>
                  <span>${montoFinal?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel Derecho - Pago */}
          <motion.div
            className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Información de Contacto
            </h2>

            {/* Error Display */}
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Formulario de Contacto */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <User className="w-4 h-4" />
                  <span>Nombre Completo</span>
                </label>
                <input
                  type="text"
                  value={datosContacto.nombre}
                  onChange={(e) =>
                    handleContactoChange("nombre", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={datosContacto.email}
                  onChange={(e) =>
                    handleContactoChange("email", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp</span>
                </label>
                <input
                  type="tel"
                  value={datosContacto.whatsapp}
                  onChange={(e) =>
                    handleContactoChange("whatsapp", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="+57 123 456 7890"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Notas Especiales (Opcional)</span>
                </label>
                <textarea
                  value={datosContacto.notas}
                  onChange={(e) =>
                    handleContactoChange("notas", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent h-24 resize-none"
                  placeholder="Alergias, preferencias especiales, etc."
                />
              </div>
            </div>

            {/* Método de Pago */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Método de Pago
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMetodoPago("tarjeta")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    metodoPago === "tarjeta"
                      ? "border-[#8B4513] bg-[#8B4513]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Tarjeta</p>
                </button>

                <button
                  onClick={() => setMetodoPago("pse")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    metodoPago === "pse"
                      ? "border-[#8B4513] bg-[#8B4513]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Smartphone className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">PSE</p>
                </button>
              </div>
            </div>

            {/* Botón de Pago */}
            <Button
              onClick={handlePagar}
              disabled={pagoEnProceso}
              customClass="w-full !bg-dark !text-secondary py-4 text-lg font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title={
                <>
                  {pagoEnProceso ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                      <span>Procesando Pago...</span>
                    </div>
                  ) : (
                    `Pagar $${montoFinal?.toLocaleString()}`
                  )}
                </>
              }
            ></Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Al hacer clic en "Pagar" aceptas nuestros términos y condiciones
            </p>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};
