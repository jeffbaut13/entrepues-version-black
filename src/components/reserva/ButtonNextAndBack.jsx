import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { AbrirMenu } from "../common/AbrirMenu";

/**
 * Componente reutilizable para los botones de siguiente y atrás
 */
export default function ButtonNextAndBack({
  confirmarPaso,
  menu = false,
  next,
  handleAbrirMenu,
  disabled = false,
}) {
  return (
    <div className="flex justify-center items-center gap-14 mt-8">
      <Button
        type="button-primary"
        onClick={confirmarPaso}
        title={`${next ? next : ""}`}
        width="full"
        disabled={disabled}
      />
      {menu && (
        <AbrirMenu handleClick={handleAbrirMenu} titulo={"Agregar platos"} />
      )}
    </div>
  );
}
