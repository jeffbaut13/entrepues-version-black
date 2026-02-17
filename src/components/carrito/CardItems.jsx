import { Trash2 } from "lucide-react";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import useCartStore from "../../store/cartStore";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";
import { Button } from "../ui/Button";

export const CardItems = ({ footer = false, size = "medium" }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
    clearCart,
  } = useCartStore();
  const cantidadItems = getCartItemsCount();
  const total = getCartTotal();

  const sizeClass = () => {
    switch (size) {
      case "full":
        return "h-full";
      case "small":
        return "h-65";

      case "large":
        return "h-80";
      case "medium":
        return "h-70";
      default:
        return "h-60";
    }
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`bg-gradient-to-b to-[#141414] z-50 to-94% from-80% sticky top-0 left-0 w-full pointer-events-none ${sizeClass()}`}
      />
      <div className="flex-1 absolute top-0 left-0 size-full z-10">
        <div className={`${sizeClass()} space-y-3 overflow-y-auto pb-8`}>
          {cartItems.map((item) => (
            <div
              className="flex relative gap-4 min-h-18 bg-white/5 rounded-lg p-4"
              key={`${item.id}-${item.subcategoria}`}
            >
              {/* Info del producto */}

              <picture className="h-full flex-1 flex items-center rounded-2xl overflow-hidden">
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="size-full object-cover"
                />
              </picture>

              <div className="w-[80%] flex justify-between items-start gap-2 rounded-lg p-1">
                <div className="w-full flex flex-col justify-between items-start">
                  <h3 className="inline-flex">
                    {capitalizeFirst(item.nombre)}
                  </h3>
                  <p className="font-light text-secondary">
                    $
                    {(parseFloat(item.precio) * item.quantity).toLocaleString(
                      "es-CO"
                    )}
                  </p>
                  <IncremenAndDecrementComponent
                    item={item.quantity}
                    increaseQuantity={() =>
                      increaseQuantity(item.id, item.subcategoria)
                    }
                    decreaseQuantity={() =>
                      decreaseQuantity(item.id, item.subcategoria)
                    }
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start">
                  <Button
                    type="just-icon"
                    onClick={() => removeFromCart(item.id, item.subcategoria)}
                    Icon={Trash2}
                    iconSize="small"
                    customClass="opacity-40 hover:opacity-100 hover:text-red-500"
                    props={{
                      "aria-label": "Eliminar producto del carrito",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {footer && (
        <div className="space-y-2 md:pt-7 pt-3">
          <div className="flex justify-between text-sm text-secondary/70">
            <span>Cantidad de productos:</span>
            <span>{cantidadItems}</span>
          </div>
          <div className="flex justify-between font-bold text-secondary">
            <span>Total:</span>
            <span>${total.toLocaleString("es-CO")}</span>
          </div>
        </div>
      )}
    </div>
  );
};
