import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { obtenerTodasLasCategorias } from "../firebase/actions";
import { capitalizeFirst } from "../constants/firsLetterUppercase";

/**
 * Normalizar nombres para comparación
 */
const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const Menu = () => {
  // ===========================
  // ESTADOS
  // ===========================
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const scrollContainerRef = useRef(null);
  const subcategoriaRefs = useRef({});
  const navCategoriasRef = useRef(null);
  const categoryButtonRefs = useRef({});

  // ===========================
  // EFECTOS Y MEMOS
  // ===========================

  // Cargar datos de Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await obtenerTodasLasCategorias();
        setCategoriesData(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
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

  // Detectar categoría activa al hacer scroll manual
  useEffect(() => {
    if (
      !mostrarProductos ||
      !scrollContainerRef.current ||
      categorias.length === 0
    ) {
      return;
    }

    const container = scrollContainerRef.current;
    const activationOffset = 48;
    let ticking = false;

    const updateActiveCategory = () => {
      const containerRect = container.getBoundingClientRect();
      const currentScroll = container.scrollTop + activationOffset;

      let activeCategory = categorias[0];

      for (const categoria of categorias) {
        const section = subcategoriaRefs.current[categoria];
        if (!section) continue;

        const sectionTopInContainer =
          section.getBoundingClientRect().top - containerRect.top + container.scrollTop;

        if (sectionTopInContainer <= currentScroll) {
          activeCategory = categoria;
        } else {
          break;
        }
      }

      setCategoriaSeleccionada((prev) =>
        prev === activeCategory ? prev : activeCategory
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveCategory();
        ticking = false;
      });
    };

    updateActiveCategory();
    requestAnimationFrame(updateActiveCategory);
    container.addEventListener("scroll", onScroll, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveCategory);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveCategory);
    };
  }, [mostrarProductos, categorias]);

  // Establecer categoría inicial al mostrar productos
  useEffect(() => {
    if (mostrarProductos && categorias.length > 0 && !categoriaSeleccionada) {
      setCategoriaSeleccionada(categorias[0]);
    }
  }, [mostrarProductos, categorias, categoriaSeleccionada]);

  // Mantener visible el botón activo en mobile
  useEffect(() => {
    if (
      !mostrarProductos ||
      !categoriaSeleccionada ||
      !navCategoriasRef.current
    ) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const activeButton = categoryButtonRefs.current[categoriaSeleccionada];
    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [mostrarProductos, categoriaSeleccionada]);

  // ===========================
  // FUNCIONES UTILITARIAS
  // ===========================

  // Obtener nombre personalizado de categoría
  const getCategoryDisplayName = (categoria) => {
    const specialNames = {
      platos_fuertes: "Almuerzos",
      entradas: "Pa'picar",
    };

    return (
      specialNames[categoria] || capitalizeFirst(categoria.replace(/_/g, " "))
    );
  };

  // Obtener productos por categoría específica
  const getProductosPorCategoria = (categoria) => {
    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(categoria)
    );

    if (!catKey) return [];

    const subcategoriesData = categoriesData[catKey]?.subcategorias || {};
    const subcategoriasConProductos = [];

    Object.entries(subcategoriesData).forEach(([subcategoria, data]) => {
      const productos = data?.productos || [];
      if (productos.length > 0) {
        subcategoriasConProductos.push({
          nombre: subcategoria,
          productos: productos.map((producto) => ({
            ...producto,
            categoria: categoria,
            subcategoria: subcategoria,
          })),
        });
      }
    });

    return subcategoriasConProductos;
  };

  // ===========================
  // MANEJADORES DE EVENTOS
  // ===========================

  const handleCategorySelect = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarProductos(true);
  };

  const handleKategoryNavigation = (categoria) => {
    setCategoriaSeleccionada(categoria);

    // Scroll automático a la subcategoría
    const subcategoriaElement = subcategoriaRefs.current[categoria];
    if (subcategoriaElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const sectionRect = subcategoriaElement.getBoundingClientRect();
      const targetTop =
        container.scrollTop + (sectionRect.top - containerRect.top) - 10;

      container.scrollTo({
        top: Math.max(0, targetTop),
        /*   behavior: "smooth", */
      });
    }
  };

  const handleVolver = () => {
    setMostrarProductos(false);
    setCategoriaSeleccionada(null);
  };

  // ===========================
  // RENDER
  // ===========================

  if (loading) {
    return (
      <div
        className="w-full h-dvh relative overflow-hidden bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/imagenes/background-home.jpg')" }}
      >
        <div className="absolute size-full top-0 left-0 bg-black/20 backdrop-blur-md z-0" />
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-2xl font-semibold">Cargando menú...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-dvh relative overflow-hidden bg-cover bg-center flex flex-col text-white "
      style={{ backgroundImage: "url('/imagenes/background-home.jpg')" }}
    >
      {mostrarProductos ? (
        <div className="absolute size-full top-0 left-0 bg-secondary z-0" />
      ) : (
        <div className="absolute size-full top-0 left-0 bg-black/20 backdrop-blur-md z-0" />
      )}

      <AnimatePresence mode="wait">
        {!mostrarProductos ? (
          // Vista inicial - Solo categorías
          <motion.div
            key="categorias"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 relative z-10 flex items-center justify-center"
          >
            <div className="max-w-4xl flex flex-col items-center text-center">
              <Logo size="md" color="white" />
              <h1 className="font-danson text-7xl mb-8">Menú</h1>

              <div className="w-full flex flex-col justify-center gap-4 max-w-sm">
                {categorias.map((categoria) => (
                  <motion.div
                    key={categoria}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handleCategorySelect(categoria)}
                      title={getCategoryDisplayName(categoria)}
                      type="button-primary"
                      customClass="w-full py-4 text-xl font-semibold !rounded-2xl md:!text-3xl"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="mt-12">
                Si usted tiene alguna observación con respecto <br />a alergias,
                por favor notifíquelas antes de ordenar
              </p>
            </div>
          </motion.div>
        ) : (
          // Vista de productos
          <motion.div
            key="productos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 relative z-10 flex w-full min-w-0 flex-col overflow-hidden text-dark max-w-4xl mx-auto md:py-12 py-4"
          >
            <div className="absolute size-full top-0 left-0 bg-gradient-to-t to-10% from-2% from-secondary pointer-events-none z-50" />
            {/* Categorías horizontales */}
            <div className="flex-shrink-0 mb-4 w-full min-w-0 overflow-hidden px-6">
              <div
                ref={navCategoriasRef}
                className="flex w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2 md:justify-between"
              >
                {categorias.map((categoria, index) => (
                  <button
                    key={categoria}
                    ref={(el) => {
                      categoryButtonRefs.current[categoria] = el;
                    }}
                    onClick={() => handleKategoryNavigation(categoria)}
                    className={`${index < categorias.length - 1 ? "border-dark/20 border-r" : ""} px-4 shrink-0 whitespace-nowrap font-bold font-danson md:text-3xl text-2xl flex flex-col ${
                      categoriaSeleccionada === categoria
                        ? "opacity-100"
                        : "opacity-40"
                    }`}
                  >
                    {getCategoryDisplayName(categoria)}
                    {categoriaSeleccionada === categoria && (
                      <span className="w-full md:h-1 h-0.5 rounded-full bg-dark" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full h-36 bg-center bg-cover flex items-center justify-center relative"
              style={{
                backgroundImage: `url('/imagenes/menu/${categoriaSeleccionada}.webp')`,
              }}
            >
              <div className="absolute size-full top-0 left-0 bg-black/40 z-0" />
              <h2 className="font-danson text-5xl text-center text-secondary relative z-10">
                {getCategoryDisplayName(categoriaSeleccionada)}
              </h2>
            </div>

            {/* Contenido de productos con scroll */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto pb-6 bg-secondary rounded-t-2xl -translate-y-4"
            >
              <div className="max-w-6xl mx-auto space-y-12">
                {categorias.map((categoria) => {
                  const subcategoriasConProductos =
                    getProductosPorCategoria(categoria);

                  return (
                    <div
                      key={categoria}
                      ref={(el) => (subcategoriaRefs.current[categoria] = el)}
                      data-categoria={categoria}
                      className="space-y-8 pt-6 px-6"
                    >
                      {subcategoriasConProductos.map((subcategoriaData) => (
                        <div
                          key={subcategoriaData.nombre}
                          className="space-y-4 "
                        >
                          <h3 className="font-semibold text-2xl border-b border-white/30 pb-2">
                            {capitalizeFirst(
                              subcategoriaData.nombre.replace(/_/g, " ")
                            )}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {subcategoriaData.productos.map((producto) => (
                              <motion.div key={producto.id}>
                                <div className="flex flex-col items-start gap-4">
                                  <div className="w-full flex justify-between">
                                    <h4 className="font-semibold text-lg">
                                      {producto.nombre}
                                    </h4>
                                    <p className="font-bold text-xl ">
                                      $
                                      {producto.precio?.toLocaleString(
                                        "es-CO"
                                      ) || "0"}
                                    </p>
                                  </div>
                                  <p className="">
                                    {producto.descripcion ||
                                      "Delicioso plato de nuestra cocina"}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
