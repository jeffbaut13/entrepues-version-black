export const PuntoHover = ({ img, handleUbicacion, ubicacion }) => {
  return (
    // Contenedor clickeable (con group para poder animar internos si quisieras)
    <span
      onClick={handleUbicacion}
      className={`${ubicacion} group inline-flex items-center justify-center cursor-pointer`}
      role="button"
      aria-label="Punto interactivo"
    >
      {/* Anillo exterior */}
      <span className="inline-flex items-center justify-center rounded-full border-2 border-white p-[2px]">
        {/* Anillo intermedio */}
        <span className="inline-flex items-center justify-center rounded-full h-20 w-20 bg-white/50 p-[2px]">
          {/* === Span ORIGINAL (núcleo) === */}
          <span className="inline-block xs:w-4 xs:h-4 lg:w-15 lg:h-15 hover:scale-[2] transition-all border-4 border-secondary rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full rounded-full transition-all"
              src={img}
              alt=""
            />
          </span>
        </span>
      </span>
    </span>
  );
};
