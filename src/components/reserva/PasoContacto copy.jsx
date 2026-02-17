import React, { useState, useEffect } from "react";
import { convertTo12Hour, getAmPm } from "./horaUtils";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";

/**
 * Componente para el paso de datos de contacto
 */
const PasoContacto = ({
  name,
  email,
  whatsapp,
  setName,
  setEmail,
  setWhatsapp,
  onValidationChange,
  selectedDate,
  hour,
  minute,
  adults,
  children,
  mascotas,
}) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    whatsapp: false,
  });

  // Validar y convertir selectedDate
  let validDate = new Date();
  if (selectedDate instanceof Date && !isNaN(selectedDate)) {
    validDate = selectedDate;
  } else if (typeof selectedDate === "string" && selectedDate) {
    const parsed = new Date(selectedDate);
    if (!isNaN(parsed)) {
      validDate = parsed;
    }
  }

  // Validar que hour y minute sean strings válid
  const hourStr = String(hour || "09").padStart(2, "0");
  const minuteStr = String(minute || "00").padStart(2, "0");

  // Validaciones
  const validateName = (value) => {
    if (!value.trim()) {
      return "El nombre es requerido";
    }
    if (value.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "El correo es requerido";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "El correo no es válido";
    }
    return "";
  };

  const validateWhatsapp = (value) => {
    if (!value.trim()) {
      return "El WhatsApp es requerido";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ""))) {
      return "El WhatsApp debe tener 10 dígitos";
    }
    return "";
  };

  // Validar todos los campos
  useEffect(() => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const whatsappError = validateWhatsapp(whatsapp);

    setErrors({
      name: nameError,
      email: emailError,
      whatsapp: whatsappError,
    });

    // Notificar al padre si todos los campos son válidos
    const isValid = !nameError && !emailError && !whatsappError;
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [name, email, whatsapp, onValidationChange]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="py-4">
      Estás reservando una mesa para {adults} adulto{adults !== 1 ? "s" : ""}
      {children > 0 && `, ${children} niño${children !== 1 ? "s" : ""}`}
      {mascotas > 0 && ` y ${mascotas} mascota${mascotas !== 1 ? "s" : ""}`} el
      día{" "}
      {capitalizeFirst(
        selectedDate.toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
        })
      )}{" "}
      a las {convertTo12Hour(hour)}:{minute} {getAmPm(hour)}.
      <div className="flex flex-col z-10 md:w-full gap-8 my-8">
        <p className="">¿A nombre de quien es la reserva?:</p>

        {/* Nombre completo */}
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`${styles.input} ${
              touched.name && errors.name ? "border-red-500" : ""
            }`}
            placeholder="Nombre completo *"
            required
          />
          {touched.name && errors.name && (
            <span className="text-red-500 text-sm mt-2">{errors.name}</span>
          )}
        </div>

        {/* Correo y Whatsapp */}
        <div className="flex gap-6 w-full">
          <div className="flex flex-col w-1/2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`${styles.input} ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
              placeholder="Correo *"
            />
            {touched.email && errors.email && (
              <span className="text-red-500 text-sm mt-2">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col w-1/2 ">
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              onBlur={() => handleBlur("whatsapp")}
              className={`${styles.input} ${
                touched.whatsapp && errors.whatsapp ? "border-red-500" : ""
              }`}
              placeholder="WhatsApp *"
            />
            {touched.whatsapp && errors.whatsapp && (
              <span className="text-red-500 text-sm mt-2">
                {errors.whatsapp}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasoContacto;

const styles = {
  input:
    "bg-transparent border-b border-[#fff6ea50] focus:outline-1 focus:outline-[#fff6ea50] p-4  placeholder:/80 w-full",
};
