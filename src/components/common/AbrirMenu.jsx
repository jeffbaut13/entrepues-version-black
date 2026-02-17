import { Notebook } from "lucide-react";
import { Button } from "../ui/Button";
import { useIsMobile } from "../../hooks/useIsMobile";

export const AbrirMenu = ({ handleClick, titulo }) => {
  const isMobile = useIsMobile();
  return (
    <>
      <Button
        type="button-thirty"
        onClick={handleClick}
        title={titulo ? titulo : "Agregar platos"}
        Icon={Notebook}
        fontSize={isMobile ? "xs" : "lg"}
        iconSize="small"
        width="full"
        props={{
          "aria-label": titulo ? titulo : "Agregar platos",
        }}
      />
    </>
  );
};
