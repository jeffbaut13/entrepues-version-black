import React, { useState, useEffect } from "react";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";
import { Cat, Dog, DogIcon } from "lucide-react";
import { MesasSelectorx4, MesasSelectorx6 } from "../common/MesasSelector";

const PasoCantidad = ({
  adults = 1,
  children = 0,
  mascotas = 0,
  setAdults,
  setChildren,
  setMascotas,
}) => {
  // Asegurar que los valores sean números válidos

  const adultsNum = Number(adults) || 1;
  const childrenNum = Math.max(
    0,
    Number(children) === 0 ? 0 : Number(children) || 0
  );
  const mascotasNum = Math.max(
    0,
    Number(mascotas) === 0 ? 0 : Number(mascotas) || 0
  );

  // Calcular total de personas
  const totalPersonas = adultsNum + childrenNum;

  const [rellenar, setRellenar] = useState({
    index: totalPersonas,
    colorRelleno: "fill-brown",
    strokeSecondary: "var(--secondary)",
    strokeDark: "var(--dark)",
  });

  // Efecto para actualizar el índice de rellenar basado en adultos + niños
  useEffect(() => {
    const totalPersonas = adultsNum + childrenNum;
    setRellenar((prev) => ({
      ...prev,
      index: totalPersonas,
    }));
  }, [adultsNum, childrenNum]);

  return (
    <>
      <div className="flex max-w-xs mx-auto flex-col gap-6 z-10 items-center md:w-full">
        {/* Adultos */}
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="mb-1">Adultos</p>
          </div>
          <div className="flex items-center gap-4">
            <IncremenAndDecrementComponent
              colorItems="text-dark"
              item={adultsNum}
              increaseQuantity={() => {
                // No permitir más de 6 personas en total
                if (adultsNum + childrenNum < 6) {
                  setAdults(adultsNum + 1);
                } else {
                  alert("⚠️ El límite es de 6 personas para esta reserva");
                }
              }}
              decreaseQuantity={() => setAdults(Math.max(adultsNum - 1, 1))}
            />
          </div>
        </div>

        {/* Niños */}
        <div className="w-full flex justify-between items-center">
          <div className="text-start">
            <p className="mb-1">Niños</p>
            <p className="mb-3 !text-xs">(Hasta 17 años):</p>
          </div>
          <div className="flex items-center gap-4">
            <IncremenAndDecrementComponent
              item={childrenNum}
              colorItems="text-dark"
              increaseQuantity={() => {
                // No permitir más de 6 personas en total
                if (adultsNum + childrenNum < 6) {
                  setChildren(childrenNum + 1);
                } else {
                  alert("⚠️ El límite es de 6 personas para esta reserva");
                }
              }}
              decreaseQuantity={() => setChildren(Math.max(childrenNum - 1, 0))}
            />
          </div>
        </div>

        {/* Mascotas */}
        <div className="w-full flex justify-between items-center">
          <div className="text-start">
            <p className="mb-1">Mascotas (máx 4)</p>
          </div>
          <div className="flex items-center gap-4">
            <IncremenAndDecrementComponent
              item={mascotasNum}
              colorItems="text-dark"
              increaseQuantity={() => {
                // Limitar mascotas a 4
                if (mascotasNum < 4) {
                  setMascotas(mascotasNum + 1);
                } else {
                  alert("⚠️ El límite es de 4 mascotas por reserva");
                }
              }}
              decreaseQuantity={() => setMascotas(Math.max(mascotasNum - 1, 0))}
            />
          </div>
        </div>
        {/* Mesas */}
        {/*    <div className="size-1/2"> */}
        {/* Mostrar mesa de 4 si hay <= 4 personas */}
        {/*  {totalPersonas <= 4 && (
            <MesasSelectorx4
              index={rellenar.index}
              colorRelleno={rellenar.colorRelleno}
              strokeSecondary={rellenar.strokeSecondary}
              strokeDark={rellenar.strokeDark}
            />
          )} */}

        {/* Mostrar mesa de 6 si hay > 4 personas */}
        {/*  {totalPersonas > 4 && (
            <MesasSelectorx6
              index={rellenar.index}
              colorRelleno={rellenar.colorRelleno}
              strokeSecondary={rellenar.strokeSecondary}
              strokeDark={rellenar.strokeDark}
            />
          )} */}
        {/*  </div> */}
      </div>
    </>
  );
};

export default PasoCantidad;
