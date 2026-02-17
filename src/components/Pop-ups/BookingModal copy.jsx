import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useReservaStore from "../../store/reservaStore";
import useCartStore from "../../store/cartStore";
import useMenuStore from "../../store/menuStore";

import { ModalLayout } from "../layout/ModalLayout";
import PasoFecha from "../reserva/PasoFecha";
import PasoHora from "../reserva/PasoHoraMain";
import PasoCantidad from "../reserva/PasoCantidad";
import PasoContacto from "../reserva/PasoContacto";
import ResumenCard from "../reserva/ResumenCard";
import ButtonNextAndBack from "../reserva/ButtonNextAndBack";
import HeaderPaso from "../reserva/HeaderPaso";
import ThankYouPage from "../reserva/ThankYouPage";
import { getAmPm, convertTo12Hour } from "../reserva/horaUtils";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AbrirMenu } from "../common/AbrirMenu";
import { BackgroundCards } from "../ui/BackgroundCards";

/**
 * Modal de reserva con acordeón vertical (paso a paso)
 * Pasos: Fecha + Hora → Personas → Datos de contacto
 * Luego muestra un resumen en card separada
 */
export default function BookingModal() {
  const {
    isBookingOpen,
    closeBooking,
    currentStep,
    setCurrentStep,
    completedSteps,
    setCompletedSteps,
    reservaData,
    updateReservaData,
    originOpen,
    showResumen,
    showThankYou,
    markResumenAsShown,
    editarReserva,
    enviarDatos,
    isSending,
    reservaResult,
    showThankYouPage,
    closeThankYou,
  } = useReservaStore();
  const { cartItems, removeFromCart, openSidebarCart, closeSidebarCart } =
    useCartStore();
  const { openMenuWithContext } = useMenuStore();
  const isMobile = useIsMobile();

  // Estados derivados del store
  const stepRefs = useRef([]);
  const scrollModalRef = useRef(null);
  const [isContactValid, setIsContactValid] = useState(false);

  // Estados derivados del store
  const selectedDate = reservaData.selectedDate
    ? new Date(reservaData.selectedDate)
    : new Date();
  const hour = reservaData.hour;
  const minute = reservaData.minute;
  const adults = reservaData.adults;
  const children = reservaData.children;
  const mascotas = reservaData.mascotas;
  const name = reservaData.name;
  const email = reservaData.email;
  const whatsapp = reservaData.whatsapp;

  // Configuración de pasos - 4 pasos separados
  const pasos = [
    {
      titulo: "Fecha",
      descripcion: completedSteps[0]
        ? selectedDate.toLocaleDateString("es-CO", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
        : "",
    },
    {
      titulo: "Hora",
      descripcion: completedSteps[1]
        ? `${convertTo12Hour(hour)}:${minute} ${getAmPm(hour)}`
        : "",
    },
    {
      titulo: "Personas",
      descripcion: completedSteps[2]
        ? `${adults} adulto${adults !== 1 ? "s" : ""}${
            children > 0 ? `, ${children} niño${children !== 1 ? "s" : ""}` : ""
          }${
            mascotas > 0
              ? `, ${mascotas} mascota${mascotas !== 1 ? "s" : ""}`
              : ""
          }`
        : "",
    },
    {
      titulo: "Datos de contacto",
      descripcion: completedSteps[3] ? name : "",
    },
  ];

  // Funciones helper para actualizar datos
  const updateReservaField = (field, value) => {
    updateReservaData({ [field]: value });
  };

  // Hacer scroll suave hasta el final
  useEffect(() => {
    // Solo hacer scroll desde el paso 2 en adelante (índice 1)
    if (scrollModalRef.current && isBookingOpen && currentStep >= 1) {
      // Delay para que el contenido se renderice y las animaciones terminen
      setTimeout(() => {
        const element = scrollModalRef.current;

        // Usar scrollTo con smooth behavior
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }, 350); // Aumentado el delay para esperar a que las animaciones terminen
    }
  }, [currentStep, showResumen, isBookingOpen]);

  // Confirmar paso actual y pasar al siguiente
  const confirmarPaso = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Al completar el último paso, marcar resumen como mostrado
      markResumenAsShown();
    }
  };

  // Volver al paso anterior
  const voltearPaso = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Editar reserva (volver a pasos)
  const handleEditarReserva = () => {
    // Encontrar el último paso completado para volver a ese
    const lastCompletedStep = completedSteps.reduce(
      (lastIndex, completed, index) => {
        return completed ? index : lastIndex;
      },
      0
    );
    editarReserva(lastCompletedStep);
  };

  // Confirmar la reserva
  const handleConfirmarReserva = async () => {
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      alert("Por favor completa todos los datos de contacto");
      return;
    }

    // Enviar datos a Firestore
    const result = await enviarDatos();

    if (result.ok) {
      //confirmarPaso();
      showThankYouPage();
    } else {
      alert("Error al confirmar la reserva: " + result.error);
    }
  };

  // Abrir menú con contexto de reserva
  const handleAbrirMenu = () => {
    /* envia la activacion "true" a algun Estado para activar el sidebar del carrito */
    openSidebarCart();
    closeBooking();
    openMenuWithContext("reserva");
  };

  // Cerrar Thank You y volver al inicio
  const handleCloseThankYou = () => {
    closeSidebarCart();
    closeThankYou();
  };

  if (isSending) {
    return (
      <ModalLayout
        ref={scrollModalRef}
        activeModal={isBookingOpen}
        closeModal={closeBooking}
        Title="Confirmando tu reserva..."
        close={false}
      >
        <div className="w-full px-2 md:max-w-xl mx-auto select-none py-8">
          <p className="text-center">
            Por favor espera mientras confirmamos tu reserva.
          </p>
        </div>
      </ModalLayout>
    );
  }

  if (showThankYou) {
    // Si mostrar Thank You Page
    return (
      <ModalLayout
        ref={scrollModalRef}
        activeModal={isBookingOpen}
        closeModal={handleCloseThankYou}
        //Title="¡Reserva confirmada!"
        header={true}
        close={false}
      >
        <ThankYouPage
          onClose={handleCloseThankYou}
          reservaResult={reservaResult}
          isMobile={isMobile}
          handleAbrirMenu={handleAbrirMenu}
        />
      </ModalLayout>
    );
  }

  // Si mostrar resumen, mostrar card en lugar de acordeón
  if (showResumen) {
    return (
      <ModalLayout
        ref={scrollModalRef}
        activeModal={isBookingOpen}
        Title="Resumen de tu reserva"
        originBack={"Editar mis datos"}
        BackModal={handleEditarReserva}
        zIndex="z-1000"
        close
        full
        closeModal={closeBooking}
      >
        <div className="w-full px-2 md:max-w-xl mx-auto select-none py-8">
          <ResumenCard
            selectedDate={selectedDate}
            hour={hour}
            minute={minute}
            adults={adults}
            children={children}
            D
            mascotas={mascotas}
            name={name}
            email={email}
            whatsapp={whatsapp}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            handleConfirmarReserva={handleConfirmarReserva}
            handleAbrirMenu={handleAbrirMenu}
            isMobile={isMobile}
            onEditReserva={handleEditarReserva}
          />
        </div>
      </ModalLayout>
    );
  }

  return (
    <ModalLayout
      ref={scrollModalRef}
      activeModal={isBookingOpen}
      closeModal={closeBooking}
      Title="Datos de la reserva"
      originBack={originOpen}
      close
      full
      zIndex="z-1000"
    >
      <AnimatePresence>
        {pasos.map((paso, index) => {
          const isExpanded = currentStep === index;
          const isCompleted = completedSteps[index];

          return (
            <motion.div
              ref={(el) => (stepRefs.current[index] = el)}
              key={index}
              className={`overflow-hidden transition py-8 ${
                !isExpanded && !isCompleted
                  ? ""
                  : index === pasos.length - 1
                  ? ""
                  : "border-b border-[#fff6ea50]"
              } `}
            >
              {/* Header del paso */}
              <HeaderPaso
                index={index}
                paso={paso}
                isExpanded={isExpanded}
                isCompleted={isCompleted}
                currentStep={currentStep}
                onClick={() => {
                  if (isCompleted || index < currentStep) {
                    setCurrentStep(index);
                  }
                }}
              />

              {/* Contenido del paso */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-8 px-10"
                  >
                    {/* PASO 1: FECHA */}
                    {index === 0 && (
                      <>
                        <PasoFecha
                          selectedDate={selectedDate}
                          setSelectedDate={(date) =>
                            updateReservaField(
                              "selectedDate",
                              date.toISOString()
                            )
                          }
                        />
                        <ButtonNextAndBack
                          dontBack={false}
                          confirmarPaso={confirmarPaso}
                          isMobile={isMobile}
                          next="Siguiente"
                          currentStep={currentStep}
                          pasos={pasos}
                        />
                      </>
                    )}

                    {/* PASO 2: HORA */}
                    {index === 1 && (
                      <>
                        <BackgroundCards>
                          <PasoHora
                            hour={hour}
                            minute={minute}
                            setHour={(h) => updateReservaField("hour", h)}
                            setMinute={(m) => updateReservaField("minute", m)}
                          />
                        </BackgroundCards>
                        <ButtonNextAndBack
                          voltearPaso={voltearPaso}
                          confirmarPaso={confirmarPaso}
                          isMobile={isMobile}
                          next="Siguiente"
                          currentStep={currentStep}
                          pasos={pasos}
                        />
                      </>
                    )}

                    {/* PASO 3: CANTIDAD */}
                    {index === 2 && (
                      <>
                        <PasoCantidad
                          adults={adults}
                          children={children}
                          mascotas={mascotas}
                          setAdults={(a) => updateReservaField("adults", a)}
                          setChildren={(c) => updateReservaField("children", c)}
                          setMascotas={(m) => updateReservaField("mascotas", m)}
                        />

                        <ButtonNextAndBack
                          voltearPaso={voltearPaso}
                          confirmarPaso={confirmarPaso}
                          isMobile={isMobile}
                          next="Siguiente"
                          currentStep={currentStep}
                          pasos={pasos}
                        />
                      </>
                    )}

                    {/* PASO 4: DATOS DE CONTACTO */}
                    {index === 3 && (
                      <>
                        <PasoContacto
                          name={name}
                          email={email}
                          whatsapp={whatsapp}
                          setName={(n) => updateReservaField("name", n)}
                          setEmail={(e) => updateReservaField("email", e)}
                          setWhatsapp={(w) => updateReservaField("whatsapp", w)}
                          onValidationChange={setIsContactValid}
                          selectedDate={selectedDate}
                          hour={hour}
                          minute={minute}
                          adults={adults}
                          children={children}
                          mascotas={mascotas}
                        />

                        <ButtonNextAndBack
                          voltearPaso={voltearPaso}
                          confirmarPaso={handleConfirmarReserva}
                          isMobile={isMobile}
                          next="Confirmar reserva"
                          currentStep={currentStep}
                          pasos={pasos}
                          disabled={!isContactValid}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </ModalLayout>
  );
}
