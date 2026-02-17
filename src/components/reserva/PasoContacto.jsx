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
    const onlyNumbers = value.replace(/\s/g, "");
    if (onlyNumbers.length !== 10) {
      return "Tu número debe contener 10 dígitos";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(onlyNumbers)) {
      return "El WhatsApp solo puede contener números";
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

  const handleWhatsappChange = (e) => {
    const value = e.target.value;
    // Solo permitir números, máximo 10 dígitos
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);
    setWhatsapp(onlyNumbers);
  };

  return (
    <div className="py-4">
      <div className="flex flex-col z-10 md:w-full gap-8 my-8">
        <div className="flex flex-col w-full space-y-6">
          {/* Nombre completo */}
          <div className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`${styles.input} ${
                touched.name && errors.name ? "border-red-500" : ""
              } `}
              placeholder="Nombre completo *"
              required
            />
            {touched.name && errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* WhatsApp */}
          <div className="w-full">
            <input
              type="tel"
              value={whatsapp}
              onChange={handleWhatsappChange}
              onBlur={() => handleBlur("whatsapp")}
              className={`${styles.input} ${
                touched.whatsapp && errors.whatsapp ? "border-red-500" : ""
              }`}
              placeholder="WhatsApp *"
              maxLength="10"
              required
            />
            {touched.whatsapp && errors.whatsapp && (
              <span className="text-red-500 text-sm">{errors.whatsapp}</span>
            )}
          </div>

          {/* Correo */}
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`${styles.input} ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
              placeholder="Correo *"
              required
            />
            {touched.email && errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
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
    "bg-white/20 border border-brown/20 rounded-full px-26 focus:outline-1 focus:outline-[#fff6ea50] py-3 text-center placeholder:/80 w-full",
};
