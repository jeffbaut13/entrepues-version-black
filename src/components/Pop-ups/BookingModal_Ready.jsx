import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useReservaStore from "../../store/reservaStore";
import useCartStore from "../../store/cartStore";
import useMenuStore from "../../store/menuStore";

import { ModalLayout } from "../layout/ModalLayout";
import PasoFecha from "../reserva/datepicker/PasoFecha";
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
import {
  Calendar,
  CornerDownLeft,
  ListChecks,
  Timer,
  User,
  X,
} from "lucide-react";
import { p } from "framer-motion/client";
import SliderVertical from "./slider/SliderVertical";
import { Logo } from "../ui/Logo";

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
    reservaData,
    originOpen,
    showThankYou,
    isSending,
    reservaResult,
    closeThankYou,
  } = useReservaStore();
  const { openSidebarCart, closeSidebarCart } = useCartStore();
  const { openMenuWithContext } = useMenuStore();
  const isMobile = useIsMobile();

  // Estados derivados del store
  const stepRefs = useRef([]);
  const scrollModalRef = useRef(null);

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

  // Configuración de pasos - 4 pasos separados
  const pasos = [
    {
      titulo: "Fecha",
      icon: Calendar,
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
      icon: Timer,
      descripcion: completedSteps[1]
        ? `${convertTo12Hour(hour)}:${minute} ${getAmPm(hour)}`
        : "",
    },
    {
      titulo: "Visitantes",
      icon: User,
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
      titulo: "Contacto",
      icon: ListChecks,
      descripcion: completedSteps[3] ? name : "",
    },
  ];

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
        close={false}
      >
        <div className="size-full px-2 md:max-w-xl mx-auto select-none py-8 flex justify-center items-center flex-col gap-16">
          <Logo color="dark" size="lg" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <div className="w-12 h-12 border-4 border-transparent border-t-current border-r-current rounded-full" />
          </motion.div>
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
        close={false}
        header={<HeaderReserva closeBooking={closeBooking} close={false} />}
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

  return (
    <ModalLayout
      ref={scrollModalRef}
      activeModal={isBookingOpen}
      closeModal={closeBooking}
      originBack={originOpen}
      close
      full
      header={<HeaderReserva closeBooking={closeBooking} />}
    >
      <div className="w-full h-full max-w-5xl mx-auto px-2 md:px-4 flex items-center justify-center">
        <div className="w-full lg:h-[40.2060625rem] h-full flex lg:flex-row flex-col items-stretch bg-white/20 rounded-xl lg:gap-6 gap-3 lg:p-6 p-3 md:py-4 overflow-hidden">
          <div className="lg:w-1/3 w-full lg:h-full h-auto flex flex-col justify-start lg:justify-between overflow-y-auto lg:overflow-y-visible max-lg:gap-2">
            <h2 className="lg:pl-8 font-danson lg:mb-8 mb-4 flex-shrink-0 lg:text-start text-center">
              <span className="lg:!text-4xl !text-5xl">Realiza tu</span>{" "}
              <br className="max-lg:hidden" />
              <span className=" lg:!text-9xl lg:!leading-20 !text-5xl">
                reserva
              </span>
            </h2>

            <AnimatePresence>
              {pasos.map((paso, index) => {
                const isExpanded = currentStep === index;
                const isCompleted = completedSteps[index];

                return (
                  <motion.div
                    ref={(el) => (stepRefs.current[index] = el)}
                    key={index}
                    className={`${
                      index !== pasos.length - 1 ? "lg:border-b" : ""
                    } lg:border-l border-dark/20 flex-shrink-0 lg:flex-1`}
                  >
                    {/* Header del paso */}
                    <HeaderPaso
                      index={index}
                      paso={paso}
                      content={
                        <>
                          {paso.descripcion === "" ? (
                            <></>
                          ) : (
                            <>
                              <p className="text-start lg:!text-xl md:!text-base">
                                {paso.descripcion || "-- /--"}
                              </p>
                            </>
                          )}
                        </>
                      }
                      isExpanded={isExpanded}
                      isCompleted={isCompleted}
                      currentStep={currentStep}
                      onClick={() => {
                        if (isCompleted || index < currentStep) {
                          setCurrentStep(index);
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* Slider Vertical con Swiper */}
          <div className="flex-1 lg:h-full h-auto bg-[#faf7f1] rounded-lg overflow-hidden min-h-0">
            <SliderVertical />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

const HeaderReserva = ({ closeBooking, close = true }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 max-w-5xl mx-auto">
      <div />
      <Logo color="dark" size="md" />
      {close ? (
        <button onClick={closeBooking}>
          <X />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
