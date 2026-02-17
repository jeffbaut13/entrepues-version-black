import {
  Trash2,
  CircleQuestionMark,
  Edit2,
  Check,
  Edit,
  ConciergeBell,
  Notebook,
  X,
} from "lucide-react";
import { Button } from "../ui/Button";
import { AbrirMenu } from "../common/AbrirMenu";
import { convertTo12Hour, getAmPm } from "./horaUtils";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";
import { CardItems } from "../carrito/cardItems";

/**
 * Card de resumen final de la reserva
 * Muestra todo lo seleccionado y opciones para reservar
 */
export default function ResumenCard({
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
  removeFromCart,
  handleConfirmarReserva,
  handleAbrirMenu,
  isMobile,
  onEditReserva,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto  p-8 space-y-8 relative">
      {/* Resumen de la reserva */}

      {/* <Button
        type="button-secondary"
        width="ajustado"
        onClick={onEditReserva}
        title={"Editar mis datos"}
        Icon={Edit}
        iconSize="small"
        props={{ "aria-label": "Editar reserva" }}
        customClass="!absolute right-0 -top-6"
        fontSize="xs"
      /> */}
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl text-center font-bold">RESERVA CONFIRMADA</h2>
          <h3 className="text-2xl text-center">N° de reserva 12545235445</h3>

          <p>
            Te hemos enviado al email un correo con los detalles de tu reserva
          </p>
          <p>¿Te gustaría que la comida esté lista a tu llegada?</p>
        </div>
      </div>

      {/* Opciones finales */}
      <div>
        <div className="flex justify-center items-center gap-14 ">
          <Button
            type="button-primary"
            onClick={handleAbrirMenu}
            Icon={Notebook}
            title="Si quiero"
            width="full"
            fontSize={isMobile ? "xs" : "lg"}
          />
          <Button
            type="button-thirty"
            onClick={handleConfirmarReserva}
            Icon={X}
            title="No, cerrar"
            width="full"
            fontSize={isMobile ? "xs" : "lg"}
          />
        </div>
      </div>
    </div>
  );
}
