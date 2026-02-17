import { ChevronDown, Check } from "lucide-react";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";

/**
 * Header del acordeón para cada paso de la reserva
 * Muestra el número, título, descripción y estado del paso
 */
export default function HeaderPaso({
  index,
  paso,
  isExpanded,
  isCompleted,
  currentStep,
  onClick,
}) {
  const isDisabled = index > currentStep && !isCompleted;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="w-full grid grid-cols-4 gap-4 items-center"
    >
      {/* Número del paso */}
      <div className="flex items-center gap-3 text-left justify-self-start">
        <p className="flex items-center justify-center text-3xl tracking-widest scale-y-65">
          0{index + 1}.
        </p>
      </div>

      {/* Título y descripción */}
      <div className="justify-self-center text-center col-span-2">
        <p className="">{paso.titulo}</p>
        {/* <p className=" text-sm mt-1">
          {isCompleted ? capitalizeFirst(paso.descripcion) : ""}
        </p> */}
      </div>

      {/* Indicador de estado */}
      <div
        className={`border rounded-full size-4 flex justify-center items-center justify-self-end ${
          isCompleted
            ? "border-green-500"
            : !isExpanded && !isCompleted
            ? "border-secondary/0"
            : "border-white"
        }`}
      >
        {isCompleted ? (
          <Check className="size-3 text-green-500" />
        ) : (
          <>{isExpanded && <ChevronDown className="size-3 text-secondary" />}</>
        )}
      </div>
    </button>
  );
}
