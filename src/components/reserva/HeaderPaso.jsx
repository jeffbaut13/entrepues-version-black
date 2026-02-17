import { ChevronDown, Check, ArrowRight, Calendar } from "lucide-react";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import { BackgroundCards } from "../ui/BackgroundCards";

/**
 * Header del acordeón para cada paso de la reserva
 * Muestra el número, título, descripción y estado del paso
 */
export default function HeaderPaso({
  index,
  paso,
  pasos,
  isExpanded,
  isCompleted,
  currentStep,
  onClick,
  content,
}) {
  const isDisabled = index > currentStep && !isCompleted;

  return (
    <div className="size-full relative">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`size-full pl-4 flex lg:flex-col flex-row lg:items-start items-center lg:justify-center justify-between ${
          isExpanded ? "" : "font-bold opacity-40"
        } ${
          isDisabled ? "!cursor-not-allowed" : "hover:opacity-100"
        } relative font-light transition ease-in-out`}
      >
        {/* Título y descripción */}

        {index < pasos.length - 1 && (
          <span className="absolute left-0 bottom-0 h-px w-full rounded-full bg-secondary" />
        )}

        <h3 className="text-xl">{paso.titulo}</h3>

        {content && <>{content}</>}
      </button>
    </div>
  );
}
