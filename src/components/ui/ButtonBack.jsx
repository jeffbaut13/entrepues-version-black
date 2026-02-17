import { ArrowLeft, ChevronLeft, X } from "lucide-react";
import { Button } from "./Button";

import { capitalizeFirst } from "../../constants/firsLetterUppercase";

export const ButtonBack = ({
  closeModal,
  title,
  close = false,
  customStyles,
}) => {
  // Obtener estados de los stores

  return (
    <span
      onClick={closeModal}
      className={`w-fit ${
        close ? "justify-self-end" : "justify-self-start"
      } cursor-pointer flex items-center ${customStyles ? customStyles : ""}`}
    >
      <Button
        type="just-icon"
        Icon={close ? X : ChevronLeft}
        motionProps={{
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.95 },
        }}
        customClass="cursor-pointer"
      />
      {title && (
        <span className="md:block hidden">
          {capitalizeFirst(title)}
        </span>
      )}
    </span>
  );
};
