import { Trash2, CircleQuestionMark } from "lucide-react";
import { Button } from "../ui/Button";
import { AbrirMenu } from "../common/AbrirMenu";
import ButtonNextAndBack from "./ButtonNextAndBack";
import { convertTo12Hour, getAmPm } from "./horaUtils";

/**
 * Componente para mostrar y confirmar el resumen de la reserva
 */
export default function PasoResumen({
  selectedDate,
  hour,
  minute,
  adults,
  children,
  mascotas,
  name,
  email,
  whatsapp,
  cartItems,
  setName,
  setEmail,
  setWhatsapp,
  removeFromCart,
  handleConfirmarReserva,
  handleAbrirMenu,
  voltearPaso,
  isMobile,
  currentStep,
  pasos,
}) {
  return (
    <>
      {/* Resumen de datos */}
      {/* <div className="space-y-3 text-sm pt-8">
        <div className="flex justify-between">
          <p >
            Estás reservando una mesa para {adults} adulto
            {adults !== 1 ? "s" : ""}
            {children > 0 &&
              `, ${children} niño${children !== 1 ? "s" : ""}`}{" "}
            {mascotas > 0 &&
              `y ${mascotas} mascota${mascotas !== 1 ? "s" : ""}`}{" "}
            para el{" "}
            {selectedDate.toLocaleDateString("es-CO", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            a las {convertTo12Hour(hour)}:{minute} {getAmPm(hour)}
          </p>
        </div>
      </div>
 */}
      {/* Datos de contacto */}
      <div className="pt-4 space-y-6 text-center">
        <p  >¿A nombre de quien es la reserva?:</p>

        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo *"
            className="w-full bg-transparent border-b border-secondary/30 outline-none py-2 text-secondary placeholder:text-secondary/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo *"
            className="bg-transparent border-b border-secondary/30 outline-none py-2 text-secondary placeholder:text-secondary/40"
          />
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp *"
            className="bg-transparent border-b border-secondary/30 outline-none py-2 text-secondary placeholder:text-secondary/40"
          />
        </div>
      </div>

      {/* Mostrar items del carrito si existen */}
      {cartItems.length > 0 && (
        <div className="pt-4">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center  text-secondary/80 pb-2"
              >
                <span>{item.nombre}</span>
                <div className="flex items-center gap-3">
                  <span>
                    x{item.quantity} - $
                    {(parseFloat(item.precio) * item.quantity).toLocaleString(
                      "es-CO"
                    )}
                  </span>

                  <Button
                    type="just-icon"
                    onClick={() => removeFromCart(item.id, item.subcategoria)}
                    Icon={Trash2}
                    iconSize="small"
                    customClass="opacity-40 hover:opacity-100"
                    props={{
                      "aria-label": "Eliminar producto del carrito",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-secondary mt-14 text-xl">
        Puedes agregar platos ahora o elegir en el restaurante
      </p>

      {/* Opciones finales */}
      <div className="space-y-3 pt-4 flex justify-center items-center flex-col mb-4">
        {cartItems.length === 0 ? (
          <div className="w-full flex justify-between gap-14">
            <ButtonNextAndBack
              voltearPaso={voltearPaso}
              isMobile={isMobile}
              confirmarPaso={handleConfirmarReserva}
              next="Confirmar reserva"
              currentStep={currentStep}
              pasos={pasos}
            />

            <AbrirMenu handleClick={handleAbrirMenu} />
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between gap-14">
              <ButtonNextAndBack
                voltearPaso={voltearPaso}
                isMobile={isMobile}
                confirmarPaso={handleConfirmarReserva}
                next="Confirmar reserva"
                currentStep={currentStep}
                pasos={pasos}
              />

              <AbrirMenu handleClick={handleAbrirMenu} />
            </div>
            <div className="w-72 flex justify-center items-center relative">
              <input type="checkbox" />
              <Button
                type="enlace"
                onClick={() => {}}
                title={"¿Quieres Marchar plato?"}
                fontSize={isMobile ? "md" : "base"}
                width="ajustado"
              />
              <Button
                type="just-icon"
                onClick={() => {}}
                Icon={CircleQuestionMark}
                iconSize="small"
                customClass="absolute -right-4 top-1"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
