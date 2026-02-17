import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import { obtenerTodasLasCategorias } from "../../firebase/actions";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../Pop-ups/slider/styleVertical.css";
import { Check, ChevronLeft, Trash } from "lucide-react";
import { IncremenAndDecrementComponent } from "../common/IncrementAndDrecrement";
import { LottieAnimation } from "../LoaderComponents/LottieAnimation";
import { useNavigate } from "react-router-dom";
import useReservaStore from "../../store/reservaStore";

// ===========================
// FUNCIONES UTILITARIAS
// ===========================

/**
 * Normalizar nombres para comparación
 */
const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/**
 * Generar JSON con los datos de la reserva
 */
const generarJSON = (firestoreId, platosSeleccionados, asistentes) => {
  return {
    firestoreId,
    fecha: new Date().toISOString(),
    platosSeleccionados: Object.entries(platosSeleccionados).map(
      ([asistenteIndex, platos]) => ({
        asistente: asistentes[asistenteIndex],
        asistenteIndex: parseInt(asistenteIndex),
        platos: platos.map((p) => ({
          id: p.originalId || p.id, // Usar el ID original para Firestore
          nombre: p.nombre,
          precio: p.precio,
          cantidad: p.cantidad,
          categoria: p.categoria,
          subcategoria: p.subcategoria,
          subtotal: p.precio * p.cantidad,
        })),
        totalPlatos: platos.reduce((sum, p) => sum + p.cantidad, 0),
        totalPrecio: platos.reduce((sum, p) => sum + p.precio * p.cantidad, 0),
      })
    ),
  };
};

// ===========================
// COMPONENTE PRINCIPAL
// ===========================

/**
 * Componente para la selección de platos por asistente
 */
export default function PlatosSeleccion({
  asistentes,
  firestoreId,
  onConfirmar,
  onVolver,
}) {
  // ===========================
  // ESTADOS
  // ===========================
  const [asistenteActual, setAsistenteActual] = useState(0);
  const [platosSeleccionados, setPlatosSeleccionados] = useState({});
  const [categoriaActual, setCategoriActual] = useState("desayunos");
  const [subcategoriaActual, setSubcategoriaActual] = useState(null);
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const swiperRef = useRef(null);
  const hydratedRef = useRef(false);
  const checkoutTempIdRef = useRef(null);
  const navigate = useNavigate();
  const {
    reservaData,
    setReservaResult,
    closeBooking,
    showMenuSelected,
    updatePlatosSeleccionados,
    prepararDatosCheckout,
  } = useReservaStore();

  const asistentesLista = useMemo(() => {
    if (Array.isArray(asistentes)) return asistentes;

    if (asistentes && typeof asistentes === "object") {
      if (Array.isArray(asistentes.asistentes)) {
        return asistentes.asistentes;
      }

      const adultosCount = Number(asistentes.adultos || 0);
      const ninosCount = Number(asistentes.ninos || 0);

      const asistentesAdultos = Array.from(
        { length: adultosCount },
        (_, i) => `Adulto ${i + 1}`
      );
      const asistentesNinos = Array.from(
        { length: ninosCount },
        (_, i) => `Niño ${i + 1}`
      );

      return [...asistentesAdultos, ...asistentesNinos];
    }

    return [];
  }, [asistentes]);

  // ===========================
  // EFECTOS Y MEMOS
  // ===========================

  // Cargar datos de Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await obtenerTodasLasCategorias();
        setCategoriesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando categorías:", error);
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Obtener categorías ordenadas
  const categorias = useMemo(() => {
    const categoryOrder = [
      "desayunos",
      "entradas",
      "platos_fuertes",
      "bebidas",
      "postres",
    ];

    return categoryOrder.filter((cat) =>
      Object.keys(categoriesData).some(
        (key) => normalize(key) === normalize(cat)
      )
    );
  }, [categoriesData]);

  const productosIndexados = useMemo(() => {
    const index = {
      byOriginalId: {},
      byCompositeId: {},
      byNombre: {},
    };

    Object.entries(categoriesData || {}).forEach(([catKey, catValue]) => {
      const subcategorias = catValue?.subcategorias || {};

      Object.entries(subcategorias).forEach(([subcategoria, subData]) => {
        const productos = subData?.productos || [];

        productos.forEach((plato, idx) => {
          const normalizedCat = normalize(catKey).replace(/\s+/g, "_");
          const compositeId = `${normalizedCat}__${subcategoria}__${plato.id}__${idx}`;
          const productoNormalizado = {
            id: compositeId,
            originalId: plato.id,
            nombre: plato.nombre,
            descripcion: plato.descripcion || "",
            precio: parseFloat(String(plato.precio).replace(/\D/g, "")),
            categoria: normalizedCat,
            subcategoria,
            img: plato.img,
          };

          index.byOriginalId[String(plato.id)] = productoNormalizado;
          index.byCompositeId[compositeId] = productoNormalizado;
          index.byNombre[normalize(plato.nombre)] = productoNormalizado;
        });
      });
    });

    return index;
  }, [categoriesData]);

  // Inicializar / rehidratar desde localStorage cuando ya hay catálogo y asistentes
  useEffect(() => {
    if (hydratedRef.current) return;
    if (!asistentesLista.length || !Object.keys(categoriesData || {}).length)
      return;

    const inicial = {};
    asistentesLista.forEach((_, index) => {
      inicial[index] = [];
    });

    try {
      const raw = localStorage.getItem("checkout:reserva:temp");
      if (!raw) {
        setPlatosSeleccionados(inicial);
        setAsistenteActual(0);
        hydratedRef.current = true;
        return;
      }

      const parsed = JSON.parse(raw);
      checkoutTempIdRef.current = parsed?.id || null;
      const guardados = Array.isArray(parsed?.platosSeleccionados)
        ? parsed.platosSeleccionados
        : [];

      const restaurados = { ...inicial };
      const indicesConDatos = [];

      guardados.forEach((asistenteData) => {
        const idx = Number(asistenteData?.asistenteIndex);
        if (Number.isNaN(idx) || idx < 0 || idx >= asistentesLista.length)
          return;

        const platos = Array.isArray(asistenteData?.platos)
          ? asistenteData.platos
          : [];

        const platosNormalizados = platos
          .map((platoGuardado, i) => {
            const fromOriginal =
              productosIndexados.byOriginalId[String(platoGuardado?.id)];
            const fromComposite =
              productosIndexados.byCompositeId[platoGuardado?.id];
            const fromNombre =
              productosIndexados.byNombre[normalize(platoGuardado?.nombre)];

            const base = fromOriginal || fromComposite || fromNombre;

            return {
              id:
                base?.id ||
                `restored__${idx}__${String(platoGuardado?.id || i)}__${i}`,
              originalId: base?.originalId || platoGuardado?.id,
              nombre: base?.nombre || platoGuardado?.nombre || "Plato",
              descripcion: base?.descripcion || "",
              precio: Number(base?.precio ?? platoGuardado?.precio ?? 0),
              categoria: base?.categoria || platoGuardado?.categoria || "",
              subcategoria:
                base?.subcategoria || platoGuardado?.subcategoria || "",
              img: base?.img || platoGuardado?.img || "",
              cantidad: Math.max(1, Number(platoGuardado?.cantidad || 1)),
            };
          })
          .filter((plato) => plato.nombre && !Number.isNaN(plato.precio));

        restaurados[idx] = platosNormalizados;
        if (platosNormalizados.length > 0) {
          indicesConDatos.push(idx);
        }
      });

      setPlatosSeleccionados(restaurados);

      if (indicesConDatos.length > 0) {
        const ordenados = [...new Set(indicesConDatos)].sort((a, b) => a - b);
        const ultimoConDatos = ordenados[ordenados.length - 1];
        setAsistenteActual(Math.max(0, ultimoConDatos));
      } else {
        setAsistenteActual(0);
      }
    } catch (error) {
      console.error("Error rehidratando platos desde localStorage:", error);
      setPlatosSeleccionados(inicial);
      setAsistenteActual(0);
    } finally {
      hydratedRef.current = true;
    }
  }, [asistentesLista, categoriesData, productosIndexados]);

  // ===========================
  // FUNCIONES DE UTILIDAD DEL COMPONENTE
  // ===========================

  // Obtener productos por categoría específica
  const getProductosPorCategoria = (categoria) => {
    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(categoria)
    );

    if (!catKey) return [];

    const subcategoriesData = categoriesData[catKey]?.subcategorias || {};
    const todosLosProductos = [];

    // Iterar sobre todas las subcategorías para obtener todos los productos
    Object.entries(subcategoriesData).forEach(([subcategoria, data]) => {
      const productos = data?.productos || [];

      productos.forEach((plato, index) => {
        todosLosProductos.push({
          id: `${categoria}__${subcategoria}__${plato.id}__${index}`,
          originalId: plato.id,
          nombre: plato.nombre,
          descripcion: plato.descripcion || "",
          precio: parseFloat(String(plato.precio).replace(/\D/g, "")),
          categoria: categoria,
          subcategoria: subcategoria,
          img: plato.img,
        });
      });
    });

    return todosLosProductos;
  };

  const esPlatoSeleccionado = (platoId) => {
    return (platosSeleccionados[asistenteActual] || []).some(
      (p) => p.id === platoId
    );
  };

  // ===========================
  // MANEJADORES DE EVENTOS
  // ===========================

  // Manejar cambio de categoría y slider
  const handleCategoriaChange = (categoria) => {
    const categoriaIndex = categorias.indexOf(categoria);
    setCategoriActual(categoria);

    // Cambiar el slide del swiper
    if (swiperRef.current && categoriaIndex >= 0) {
      swiperRef.current.swiper.slideTo(categoriaIndex);
    }
  };

  // Manejar cambio de slide
  const handleSlideChange = (swiper) => {
    const categoriaSeleccionada = categorias[swiper.activeIndex];
    if (categoriaSeleccionada && categoriaSeleccionada !== categoriaActual) {
      setCategoriActual(categoriaSeleccionada);
    }
  };

  const handleSeleccionarPlato = (plato) => {
    setPlatosSeleccionados((prev) => {
      const actual = prev[asistenteActual] || [];
      const existe = actual.some((p) => p.id === plato.id);

      if (existe) {
        return {
          ...prev,
          [asistenteActual]: actual.filter((p) => p.id !== plato.id),
        };
      } else {
        // Agregar plato con cantidad por defecto de 1
        const platoConCantidad = {
          ...plato,
          cantidad: 1,
        };
        return {
          ...prev,
          [asistenteActual]: [...actual, platoConCantidad],
        };
      }
    });
  };

  const handleIncrementarCantidad = (platoId) => {
    setPlatosSeleccionados((prev) => {
      const actual = prev[asistenteActual] || [];
      const actualizado = actual.map((p) =>
        p.id === platoId ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      return {
        ...prev,
        [asistenteActual]: actualizado,
      };
    });
  };

  const handleDisminuirCantidad = (platoId) => {
    setPlatosSeleccionados((prev) => {
      const actual = prev[asistenteActual] || [];
      const actualizado = actual.map((p) => {
        if (p.id === platoId) {
          const nuevaCantidad = p.cantidad - 1;
          // Si la cantidad llega a 0, mantener el plato pero con cantidad 1
          return { ...p, cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad };
        }
        return p;
      });
      return {
        ...prev,
        [asistenteActual]: actualizado,
      };
    });
  };

  const irAlSiguiente = () => {
    if (asistenteActual < asistentesLista.length - 1) {
      setAsistenteActual(asistenteActual + 1);
    }
  };

  const irAlAnterior = () => {
    if (asistenteActual > 0) {
      setAsistenteActual(asistenteActual - 1);
    }
  };

  const handleConfirmar = async () => {
    // Validar que todos los asistentes tienen al menos un plato
    const asistentesSinPlatos = [];
    for (let i = 0; i < asistentesLista.length; i++) {
      if (!platosSeleccionados[i] || platosSeleccionados[i].length === 0) {
        asistentesSinPlatos.push(asistentesLista[i]);
      }
    }

    // Si hay asistentes sin platos, mostrar alerta
    if (asistentesSinPlatos.length > 0) {
      const asistentesTexto = asistentesSinPlatos.join(", ");
      alert(
        `⚠️ Los siguientes asistentes no tienen platos seleccionados:\n\n${asistentesTexto}\n\nPor favor, agrega al menos un plato para cada asistente antes de continuar.`
      );
      return; // No continuar
    }

    setGuardando(true);
    try {
      // Generar datos JSON para los platos seleccionados
      const datosJSON = generarJSON(
        firestoreId || checkoutTempIdRef.current || `temp-${Date.now()}`,
        platosSeleccionados,
        asistentesLista
      );

      // Usar la función del store para preparar datos de checkout
      const resultado = prepararDatosCheckout(datosJSON.platosSeleccionados);

      if (!resultado.ok) {
        throw new Error(resultado.error || "No se pudieron preparar los datos");
      }

      console.log("✅ Datos guardados temporalmente para checkout");

      closeBooking(); // Cerrar modal de reserva

      // Redirigir al checkout
      navigate("/checkout");
    } catch (error) {
      console.error("Error al preparar datos para checkout:", error);
      alert("Error al preparar la reserva. Por favor, intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  // ===========================
  // VARIABLES DERIVADAS
  // ===========================

  const platosDelAsistente = platosSeleccionados[asistenteActual] || [];

  // Calcular totales para el asistente actual
  const totalCantidad = platosDelAsistente.reduce(
    (sum, plato) => sum + plato.cantidad,
    0
  );
  const totalPrecio = platosDelAsistente.reduce(
    (sum, plato) => sum + plato.precio * plato.cantidad,
    0
  );

  // Calcular totales generales de toda la reserva
  const totalGeneralCantidad = Object.values(platosSeleccionados).reduce(
    (total, platos) =>
      total + platos.reduce((sum, plato) => sum + plato.cantidad, 0),
    0
  );
  const totalGeneralPrecio = Object.values(platosSeleccionados).reduce(
    (total, platos) =>
      total +
      platos.reduce((sum, plato) => sum + plato.precio * plato.cantidad, 0),
    0
  );

  // ===========================
  // RENDER
  // ===========================

  return (
    <div className="w-full h-full flex">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="size-full text-center bg-dark animate-pulse text-dark flex items-center justify-center rounded-lg flex-col"
          >
            <span />
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-hidden flex flex-col"
        >
          {/* Contenido principal: 2 columnas */}
          <div className="flex flex-row-reverse items-center flex-1 overflow-hidden">
            {/* Columna izquierda: Asistente Actual */}
            <div className="h-full flex flex-col bg-dark text-secondary w-[40%] p-6 rounded-lg">
              <h4 className="font-semibold mb-4">
                Por favor, seleccione al menos un plato del menú para persona
                No. {asistenteActual + 1}
              </h4>

              {/* Asistente Actual */}
              <div className="rounded-lg mb-4 flex-1 flex flex-col min-h-0 overflow-hidden">
                <div className="flex flex-col overflow-hidden">
                  {/* Lista de platos con scroll */}
                  <div className="flex-1 min-h-0">
                    <div className="h-full overflow-y-auto max-h-[60vh]">
                      {platosDelAsistente.length > 0 ? (
                        <div className="space-y-4 pr-2">
                          {platosDelAsistente.map((plato) => (
                            <motion.div
                              key={plato.id}
                              className={`bg-black/40 text-secondary flex items-center gap-3 px-3 py-4 rounded-lg transition-all cursor-pointer relative`}
                            >
                              <picture className="w-auto h-14 inline-block">
                                <img
                                  className="size-full object-cover inline-block rounded-lg"
                                  src={plato.img}
                                  alt={plato.nombre}
                                />
                              </picture>
                              <div className="flex-1 space-y-2">
                                <div className="w-full flex items-center justify-between">
                                  <p className="max-w-52 font-medium text-start line-clamp-1">
                                    {plato.nombre}
                                  </p>
                                  <span
                                    onClick={() =>
                                      handleSeleccionarPlato(plato)
                                    }
                                    className="size-8 flex items-center justify-end rounded-full"
                                  >
                                    <Trash className="opacity-40 hover:text-red-500 hover:opacity-100" />
                                  </span>
                                </div>

                                <div className="w-full flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <p className="font-semibold text-start">
                                      ${plato.precio.toLocaleString("es-CO")}{" "}
                                      c/u
                                    </p>
                                  </div>

                                  <IncremenAndDecrementComponent
                                    item={plato.cantidad}
                                    increaseQuantity={() =>
                                      handleIncrementarCantidad(plato.id)
                                    }
                                    decreaseQuantity={() =>
                                      handleDisminuirCantidad(plato.id)
                                    }
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navegación entre asistentes - Fija en la parte inferior */}
              <div className="flex flex-col gap-2 mt-4 flex-shrink-0">
                {totalCantidad > 0 && (
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <p className="">Productos seleccionados</p>
                      <span>{totalCantidad}</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="font-bold">Subtotal total</p>
                      <p>
                        <span>{totalPrecio.toLocaleString("es-CO")}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Resumen Total de la Reserva */}
                {asistenteActual === asistentesLista.length - 1 &&
                  totalGeneralCantidad > 0 && (
                    <div className="flex flex-col w-full mt-4 pt-4 border-t border-dark/20">
                      <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Total a pagar</p>
                        <p className="font-bold">
                          <span>
                            ${totalGeneralPrecio.toLocaleString("es-CO")}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                <div className="flex justify-between items-center gap-4 mt-4">
                  {asistenteActual !== 0 && (
                    <Button
                      onClick={irAlAnterior}
                      title="Persona anterior"
                      type="button-primary"
                      customClass={`flex-1 py-1 px-3 ${
                        asistenteActual === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={asistenteActual === 0}
                      gap-4
                    />
                  )}

                  {asistenteActual === asistentesLista.length - 1 ? (
                    <Button
                      onClick={handleConfirmar}
                      title={guardando ? "Guardando..." : "Pagar y reservar"}
                      type="button-primary"
                      customClass="flex-1 py-1 px-3"
                      disabled={guardando}
                    />
                  ) : (
                    <Button
                      onClick={irAlSiguiente}
                      title="Siguiente"
                      width=""
                      type="button-primary"
                      customClass={`flex-1 py-1 px-3 ${
                        asistenteActual === asistentesLista.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={asistenteActual === asistentesLista.length - 1}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Columna derecha: Platos por categorías */}
            <MenuSelected
              categorias={categorias}
              categoriaActual={categoriaActual}
              handleCategoriaChange={handleCategoriaChange}
              swiperRef={swiperRef}
              handleSlideChange={handleSlideChange}
              getProductosPorCategoria={getProductosPorCategoria}
              esPlatoSeleccionado={esPlatoSeleccionado}
              handleSeleccionarPlato={handleSeleccionarPlato}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ===========================
// COMPONENTE MENU SELECTED
// ===========================

/**
 * Componente para mostrar el menú de categorías y platos
 */
const MenuSelected = ({
  categorias,
  categoriaActual,
  handleCategoriaChange,
  swiperRef,
  handleSlideChange,
  getProductosPorCategoria,
  esPlatoSeleccionado,
  handleSeleccionarPlato,
}) => {
  return (
    <div className="flex-1 flex h-full overflow-hidden bg-secondary text-dark p-6 rounded-lg">
      {/* Nombres de Categorías */}
      {categorias.length > 0 && (
        <div className="flex-1 h-full mb-4">
          <div className="font-danson h-full flex flex-col justify-between overflow-x-auto">
            <h2 className="text-7xl mb-4">Menú</h2>
            {categorias.map((categoria, index) => (
              <div
                className={`pl-3 size-full relative border-l-1 flex items-center justify-start border-dark/20 ${
                  index !== categorias.length - 1 ? "border-b-1" : ""
                }`}
                key={categoria}
              >
                <Button
                  key={categoria}
                  type="button-thirty"
                  onClick={() => handleCategoriaChange(categoria)}
                  title={capitalizeFirst(categoria.replace(/_/g, " "))}
                  customClass={`!text-2xl text-start ${
                    categoriaActual === categoria
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platos de la categoría con Slider Vertical */}
      <div className="w-[29rem] h-full space-y-2 overflow-y-auto bg-secondary pl-4 rounded-lg">
        <Swiper
          ref={swiperRef}
          direction="vertical"
          pagination={false}
          modules={[]}
          className="mySwiper w-full h-full"
          onSlideChange={handleSlideChange}
          initialSlide={categorias.indexOf(categoriaActual)}
          allowTouchMove={true}
          simulateTouch={true}
          keyboard={false}
        >
          {categorias.map((categoria) => {
            const productosCategoria = getProductosPorCategoria(categoria);

            return (
              <SwiperSlide key={categoria} className="h-full">
                <div className="w-full h-full overflow-y-auto space-y-2 pr-2">
                  {productosCategoria.length > 0 ? (
                    productosCategoria.map((plato) => (
                      <motion.div
                        key={plato.id}
                        className={`flex items-center gap-2 p-3 rounded-lg transition-all cursor-pointer hover:bg-dark/10 relative`}
                        onClick={() => handleSeleccionarPlato(plato)}
                      >
                        <picture className="w-16 h-auto aspect-square inline-block">
                          <img
                            className="size-full object-cover inline-block"
                            src={plato.img}
                            alt={plato.nombre}
                          />
                        </picture>
                        <div className="flex flex-col items-start justify-center ">
                          {esPlatoSeleccionado(plato.id) && (
                            <span className="bg-green-100 size-8 flex items-center justify-center rounded-full absolute right-4 top-1/2 -translate-y-1/2">
                              <Check className="text-green-400" />
                            </span>
                          )}

                          <p className="font-medium text-dark text-start line-clamp-1 max-w-86">
                            {plato.nombre}
                          </p>

                          <p className="font-semibold text-dark mt-1 text-start">
                            ${plato.precio.toLocaleString("es-CO")}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center text-dark/60 py-8">
                      <p className="text-sm">No hay platos en esta categoría</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
