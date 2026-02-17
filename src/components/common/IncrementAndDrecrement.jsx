import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";

export const IncremenAndDecrementComponent = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  colorItems = "text-secondary",
}) => {
  return (
    <div className="flex items-center gap-2 rounded-lg ">
      <Button
        type="button-thirty"
        Icon={Minus}
        iconSize="small"
        IconColor={colorItems}
        onClick={decreaseQuantity}
        props={{ "aria-label": "Disminuir cantidad" }}
        customClass={`opacity-40 hover:opacity-100 !p-1 !rounded-md border ${colorItems}/60`}
      />

      <span className="w-6 text-center">{item}</span>
      <Button
        type="button-thirty"
        Icon={Plus}
        iconSize="small"
        IconColor={colorItems}
        onClick={increaseQuantity}
        props={{ "aria-label": "Aumentar cantidad" }}
        customClass={`opacity-40 hover:opacity-100 !p-1 !rounded-md border ${colorItems}/60`}
      />
    </div>
  );
};
