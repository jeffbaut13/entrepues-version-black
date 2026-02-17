import { motion, AnimatePresence } from "framer-motion";
import useMenuStore from "../../store/menuStore";
import useCartStore from "../../store/cartStore";
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import ProductPopup from "../menu/ProductPopup";
import { obtenerTodasLasCategorias } from "../../firebase/actions";
import { MenuSkeleton } from "../ui/SkeletonLoaders";
import { ModalLayout } from "../layout/ModalLayout";
import {
  Check,
  Coffee,
  Sandwich,
  Beef,
  CupSoda,
  CakeSlice,
  Handbag,
  ConciergeBell,
} from "lucide-react";
import { Button } from "../ui/Button";
import { ButtonBack } from "../ui/ButtonBack";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";

import useReservaStore from "../../store/reservaStore";
import { CardItems } from "../carrito/cardItems";
import { CardsProducts } from "../menu/CardsProducts";
import { p } from "framer-motion/client";

/**
 * Modal del menú con integración de Firebase
 * Muestra categorías, subcategorías y productos en 5 columnas
 */
export default function MenuModal() {
  const containerRef = useRef(null);

  const [productsHeight, setProductsHeight] = useState(0);

  const { isMenuOpen, closeMenu, originOpen } = useMenuStore();
  const { addToCart, cartItems, isSidebarCartOpen } = useCartStore();

  const { openBookingWithOrigin } = useReservaStore();
  const [categoriesData, setCategoriesData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("desayunos");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState({});

  const BuyProcess = cartItems.length > 0;

  const iconsCategorias = [Coffee, Sandwich, Beef, CupSoda, CakeSlice];
  // Orden específico de categorías
  const categoryOrder = [
    "desayunos",
    "entradas",
    "platos_fuertes",
    "bebidas",
    "postres",
  ];

  const handleBack = () => {
    if (originOpen == "reserva") {
      closeMenu();
      openBookingWithOrigin("Volver del inicio");
    } else {
      closeMenu();
    }
  };

  const CompletarReserva = () => {
    openBookingWithOrigin("Volver del inicio");
    closeMenu();
  };

  // Cargar datos de Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await obtenerTodasLasCategorias();

        setCategoriesData(data);
        setLoading(false);

        // Pre-cargar todas las imágenes para caché del navegador
        Object.values(data).forEach((category) => {
          Object.values(category?.subcategorias || {}).forEach((subcat) => {
            (subcat?.productos || []).forEach((producto) => {
              if (producto.img) {
                const img = new Image();
                img.src = producto.img;
              }
            });
          });
        });
      } catch (error) {
        console.error("Error cargando categorías:", error);
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Normalizar nombres para comparación
  const normalize = (s = "") =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Obtener categorías ordenadas
  const orderedCategories = useMemo(() => {
    const ordered = categoryOrder.filter((cat) =>
      Object.keys(categoriesData).some(
        (key) => normalize(key) === normalize(cat)
      )
    );
    return ordered;
  }, [categoriesData]);

  // Obtener subcategorías de la categoría seleccionada
  const activeSubcategories = useMemo(() => {
    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(selectedCategory)
    );
    if (!catKey) return [];
    return Object.keys(categoriesData[catKey]?.subcategorias || {});
  }, [selectedCategory, categoriesData]);

  // Resetear subcategoría cuando cambie la categoría
  useEffect(() => {
    setSelectedSubcategory(null);
  }, [selectedCategory]);

  // Establecer la primera subcategoría como activa cuando cambien las subcategorías
  useEffect(() => {
    if (activeSubcategories.length > 0 && !selectedSubcategory) {
      setSelectedSubcategory(activeSubcategories[0]);
    }
  }, [activeSubcategories, selectedSubcategory]);

  // Sincronizar addedItems con cartItems para reflejar cambios en tiempo real
  useEffect(() => {
    const newAddedItems = {};
    cartItems.forEach((item) => {
      const itemKey = `${item.id}-${item.subcategoria}`;
      newAddedItems[itemKey] = true;
    });
    setAddedItems(newAddedItems);
  }, [cartItems]);

  // Obtener productos de la subcategoría activa
  const activeProducts = useMemo(() => {
    if (!selectedSubcategory) return [];

    const catKey = Object.keys(categoriesData).find(
      (key) => normalize(key) === normalize(selectedCategory)
    );

    if (!catKey) return [];

    const subcategoriesData = categoriesData[catKey]?.subcategorias || {};
    const productsData =
      subcategoriesData[selectedSubcategory]?.productos || [];

    return productsData;
  }, [selectedCategory, selectedSubcategory, categoriesData]);

  // Abrir popup de producto
  const handleOpenPopup = (producto) => {
    setSelectedProduct(producto);
    setPopupOpen(true);
  };

  //Cerrar pop up de producto
  const handleClosePopup = () => {
    setPopupOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  // Agregar producto al carrito
  const handleAddToCart = (producto) => {
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: selectedCategory,
      subcategoria: producto.subcategoria || "general",
      img: producto.img,
      descripcion: producto.descripcion,
    });

    // Marcar como añadido
    const itemKey = `${producto.id}-${producto.subcategoria || "general"}`;
    setAddedItems((prev) => ({ ...prev, [itemKey]: true }));
    console.log(`✅ ${producto.nombre} agregado al carrito`);
  };

  // Verificar si un producto está en el carrito
  const isProductInCart = (producto) => {
    const itemKey = `${producto.id}-${producto.subcategoria || "general"}`;
    return (
      addedItems[itemKey] ||
      cartItems.some(
        (item) =>
          item.id === producto.id &&
          item.subcategoria === (producto.subcategoria || "general")
      )
    );
  };

  const handleProceedToCheckout = (producto) => {
    handleAddToCart(producto);
    handleClosePopup();
    // Solo agrega el producto, no abre el carrito
    // Se mantiene en el menú y se devolverá a la reserva al cerrar
  };

  // useLayoutEffect + ResizeObserver para medir con precisión el contenedor scrollable
  useLayoutEffect(() => {
    let mounted = true;
    let ro = null;

    const updateHeightForEl = (el) => {
      if (!mounted || !el) return;
      const h = el.offsetHeight || el.clientHeight || 0;
      setProductsHeight(h);
      console.log("Altura del contenedor (medida):", h);
    };

    // Retry loop using requestAnimationFrame in case the element mounts a few frames later
    const waitForEl = (attempt = 0) => {
      const el = containerRef.current;
      if (el) {
        updateHeightForEl(el);
        if (window.ResizeObserver) {
          ro = new ResizeObserver(() => updateHeightForEl(el));
          ro.observe(el);
        }
        return;
      }

      if (attempt < 10 && mounted) {
        requestAnimationFrame(() => waitForEl(attempt + 1));
      } else if (!containerRef.current) {
        console.log("containerRef no encontrado después de reintentos");
      }
    };

    // Only run when menu is open (the modal mounts), otherwise element won't exist
    if (isMenuOpen) waitForEl();

    return () => {
      mounted = false;
      if (ro && containerRef.current) ro.unobserve(containerRef.current);
    };
  }, [activeProducts, isMenuOpen]);

  return (
    <>
      <ModalLayout
        activeModal={isMenuOpen}
        Title="Menú"
        fullHeight={true}
        originBack={`Volver`}
        fullWidth={"full"}
        closeModal={() => closeMenu()}
        close={true}
        BackModal={handleBack}
      >
        <div className="h-full flex flex-col gap-6">
          <div className="sticky top-0 z-10 max-w-7xl w-full mx-auto  ">
            {/* Versión grid para desktop + scroll responsive */}
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="lg:grid lg:grid-cols-5 lg:gap-4 flex gap-4 lg:w-full w-max lg:justify-items-center lg:h-auto h-full items-center">
                  {orderedCategories.map((category, inx) => (
                    <Button
                      type="button-secondary"
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      title={capitalizeFirst(category.replace(/_/g, " "))}
                      Icon={iconsCategorias[inx]}
                      width="ajustado"
                      customClass={`${
                        normalize(selectedCategory) === normalize(category)
                          ? "active opacity-100"
                          : "opacity-50 hover:opacity-70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <MenuSkeleton />
          ) : (
            <>
              {/* SECCIÓN 2: Subcategorías */}
              {activeSubcategories.length > 1 ||
              (activeSubcategories.length === 1 &&
                activeSubcategories[0] !== selectedCategory) ? (
                <div className="flex-1">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {activeSubcategories.map((subcat) => (
                      <Button
                        type="button-thirty"
                        key={subcat}
                        onClick={() => setSelectedSubcategory(subcat)}
                        title={capitalizeFirst(subcat.replace(/_/g, " "))}
                        fontSize="base"
                        customClass={`flex-shrink-0 px-2 ${
                          selectedSubcategory === subcat
                            ? "opacity-100"
                            : "opacity-40 hover:opacity-80"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {/* SECCIÓN 3: Productos */}
              <div
                className={`h-[70vh] ${
                  productsHeight >= 497 ? "overflow-auto" : ""
                }`}
              >
                <div
                  style={{
                    height: productsHeight ? `${productsHeight}px` : undefined,
                  }}
                  className="size-full "
                >
                  {activeProducts.length > 0 && (
                    <div ref={containerRef} className="w-full flex gap-6">
                      <CardsProducts
                        isSidebarCartOpen={isSidebarCartOpen}
                        handleOpenPopup={handleOpenPopup}
                        selectedCategory={selectedCategory}
                        handleAddToCart={handleAddToCart}
                        isProductInCart={isProductInCart}
                        activeProducts={activeProducts}
                        BuyProcess={BuyProcess}
                      />

                      <AnimatePresence>
                        {isSidebarCartOpen > 0 && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="h-full flex-1 sticky top-0 p-4 bg-[#141414] rounded-3xl self-start"
                          >
                            <CardItems footer={true} size="large" />
                            <Button
                              type="button-primary"
                              onClick={CompletarReserva}
                              title="Completar reserva"
                              Icon={ConciergeBell}
                              width="full"
                              customClass="mt-4"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </ModalLayout>

      {/* Popup de producto */}
      <AnimatePresence>
        {popupOpen && (
          <ProductPopup
            open={popupOpen}
            onClose={handleClosePopup}
            producto={selectedProduct}
            onAdd={handleProceedToCheckout}
            isSidebarCartOpen={isSidebarCartOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
