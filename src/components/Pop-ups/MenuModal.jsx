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
import { Title } from "../ui/Title";
import { IconoSeparador } from "../ui/IconoSeparador";
import { MediaDisplay } from "../ui/MediaDisplay";
import { s, title } from "framer-motion/client";
import { Link } from "react-router-dom";

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

  const content = [
    {
      type: "row",
      title: "La bandeja paisa",
      description: "más rica del país",
      videoSrc: "",
      imageSrc: "/imagenes/menu/menu-bandeja-paisa.jpg",
      width: "w-full",
      invert: false,
    },
    {
      type: "row",
      title: "El ajiaco",
      description: "más rico del país",
      videoSrc: "",
      imageSrc: "/imagenes/menu/menu-ajiaco.jpg",
      width: "w-full",
      invert: true,
    },
    {
      type: "row",
      title: "El sancocho",
      description: "más rico del país",
      videoSrc: "",
      imageSrc: "/imagenes/menu/menu-Sancocho.jpg",
      invert: false,
      width: "w-full",
    },
  ];
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
        <div className="w-full flex justify-center items-center flex-col">
          <SectionOne />

          <SectionTwo />
          {content.map((section, index) => (
            <Sections key={index} content={section} invert={section.invert} />
          ))}

          <SectionMenu handleClick={() => closeMenu()} />
        </div>
      </ModalLayout>
    </>
  );
}

const SectionOne = () => {
  return (
    <main className="size-full flex justify-center items-center relative">
      <div
        className="relative w-full lg:h-[30rem] h-96 bg-cover bg-no-repeat bg-center overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: "url('/imagenes/menu/background_menu.webp')",
        }}
      >
        <MediaDisplay
          videoSrc={"/video/menu-intro.mp4"}
          imageSrc={"/imagenes/menu/background_menu.webp"}
          alt={"La casa de la cocina"}
          className="w-full h-auto object-cover"
          autoPlay={true}
          muted={false}
          animated={true}
          animationVariants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
        />
      </div>
    </main>
  );
};

const SectionTwo = () => {
  return (
    <div className="w-full h-[26.9rem] flex justify-center items-center">
      <div className="w-full bg-contain bg-center overflow-hidden flex items-center justify-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full relative z-20 text-center"
        >
          <Textos
            title={"los favoritos de la casa"}
            parraf={"De esos que uno no olvida y siempre vuelve a pedir"}
          />

          <span className="block mb-12" />
          <IconoSeparador />
        </motion.div>
      </div>
    </div>
  );
};

const Sections = ({ invert = false, content }) => {
  const direction = () => {
    switch (content.type) {
      case "row":
        return (
          <div
            className={`${content.width} text-secondary h-dvh flex ${
              invert ? "lg:flex-row-reverse flex-col" : "lg:flex-row flex-col"
            } items-center bg-cover bg-no-repeat bg-center`}
            style={{ backgroundImage: `url(${content.imageSrc})` }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative z-20 text-center my-20"
            >
              <Textos title={content.title} parraf={content.description} />
            </motion.div>
          </div>
        );
      case "column":
        return (
          <div
            className={`${content.width} h-full flex flex-col justify-between bg-white`}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full relative z-20 text-center text-dark my-20"
            >
              <Textos
                title={content.title}
                parraf={content.description !== "" ? content.description : null}
              />
            </motion.div>

            {/* Usando el componente reutilizable MediaDisplay */}
            <div className="flex-1 overflow-hidden">
              <MediaDisplay
                videoSrc={content.videoSrc !== "" ? content.videoSrc : null}
                imageSrc={content.imageSrc !== "" ? content.imageSrc : null}
                alt={content.title}
                className="w-full h-full object-cover"
                autoPlay={true}
                controls={false}
                muted={true}
                loop={true}
                animated={true}
              />
            </div>
          </div>
        );
    }
  };

  return <>{direction()}</>;
};

const SectionMenu = ({ handleClick }) => {
  const navegate = () => {
    handleClick();
  };
  return (
    <div
      className="w-full h-dvh bg-cover bg-no-repeat bg-center flex justify-center items-center"
      style={{ backgroundImage: 'url("/imagenes/menu/carne-asada.jpg")' }}
    >
      {" "}
      <Link
        className="bg-[#e7eda7] px-12 text-3xl py-3 rounded-full text-dark font-bold"
        to="/menu"
        onClick={navegate}
      >
        Ver menú completo
      </Link>
    </div>
  );
};

const Textos = ({ title, parraf }) => {
  return (
    <>
      <h2 className="font-danson lg:!text-6xl">{title}</h2>
      {parraf && <p>{parraf}</p>}
    </>
  );
};
