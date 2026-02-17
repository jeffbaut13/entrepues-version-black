import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Slider de categorías minimalista
 * - Muestra solo 5 items (desayunos, entradas, platos fuertes, bebidas, postres)
 * - La seleccionada va al centro con opacidad 100% y línea debajo
 * - Las demás tienen opacidad 80%
 * - Loop infinito continuo (reinicia silenciosamente)
 */
export default function CategoriesSlider({
  orderedCategories,
  selectedCategory,
  onCategoryChange,
  normalize,
}) {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  const selectedIndex = orderedCategories.findIndex(
    (cat) => normalize(cat) === normalize(selectedCategory)
  );

  // Scroll para centrar un elemento
  const scrollToCenter = (index, smooth = true) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const items = container.querySelectorAll("[data-category-item]");

    if (items[index]) {
      const item = items[index];
      const containerWidth = container.offsetWidth;
      const itemWidth = item.offsetWidth;
      const itemLeft = item.offsetLeft;

      const scrollLeft = itemLeft - containerWidth / 2 + itemWidth / 2;

      isAutoScrollingRef.current = true;
      container.scrollTo({
        left: scrollLeft,
        behavior: smooth ? "smooth" : "auto",
      });

      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 500);
    }
  };

  // Calcular índice central visible
  const getCenterIndex = () => {
    if (!scrollContainerRef.current) return -1;

    const container = scrollContainerRef.current;
    const items = container.querySelectorAll("[data-category-item]");
    const containerCenter = container.offsetWidth / 2 + container.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  // Efecto inicial: centrar el elemento seleccionado
  useEffect(() => {
    setTimeout(() => scrollToCenter(selectedIndex, false), 0);
  }, [selectedIndex]);

  // Efecto: centrar cuando cambia la categoría seleccionada
  useEffect(() => {
    if (selectedIndex !== -1) {
      scrollToCenter(selectedIndex);
    }
  }, [selectedCategory, selectedIndex]);

  // Manejar scroll para detectar el elemento central
  const handleScroll = () => {
    if (isScrolling || isAutoScrollingRef.current) return;

    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const items = container.querySelectorAll("[data-category-item]");
      const centerIndex = getCenterIndex();

      const category = orderedCategories[centerIndex];

      if (category && normalize(category) !== normalize(selectedCategory)) {
        onCategoryChange(category);
      }

      // Loop infinito silencioso
      const firstItemWidth = items[0]?.offsetWidth || 0;
      const lastItemWidth = items[items.length - 1]?.offsetWidth || 0;
      const containerWidth = container.offsetWidth;
      const totalContentWidth = items[items.length - 1]?.offsetLeft +
        lastItemWidth -
        items[0]?.offsetLeft;

      const maxScroll = totalContentWidth - containerWidth;
      const currentScroll = container.scrollLeft;

      // Si se scrollea demasiado a la derecha, reinicia desde la izquierda
      if (currentScroll > maxScroll - 50) {
        isAutoScrollingRef.current = true;
        container.scrollLeft = 50;
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 50);
      }
      // Si se scrollea demasiado a la izquierda desde la derecha, jump al final
      else if (currentScroll < 50 && currentScroll > 0) {
        isAutoScrollingRef.current = true;
        container.scrollLeft = maxScroll - 50;
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 50);
      }

      setIsScrolling(false);
    }, 150);
  };

  // Navegar con flechas
  const handleNavigation = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const items = container.querySelectorAll("[data-category-item]");
    const currentCenter = getCenterIndex();

    const nextIndex =
      direction === "next"
        ? (currentCenter + 1) % items.length
        : (currentCenter - 1 + items.length) % items.length;

    scrollToCenter(nextIndex);
  };

  return (
    <div className="relative w-full group flex items-center gap-6 py-4 px-2">
      {/* Botón anterior */}
      <button
        onClick={() => handleNavigation("prev")}
        className="z-20 p-1 flex-shrink-0 text-gray-400 hover:text-gray-900 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Contenedor scrollable - solo muestra los 5 items */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar flex-1"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {orderedCategories.map((category, index) => {
          const isSelected =
            normalize(selectedCategory) === normalize(category);

          return (
            <div
              key={`${category}-${index}`}
              data-category-item
              onClick={() => {
                onCategoryChange(category);
                scrollToCenter(index);
              }}
              className="flex-shrink-0 cursor-pointer transition-all duration-300 pb-2 relative whitespace-nowrap"
            >
              <div
                className={`text-xs font-medium tracking-widest uppercase transition-opacity duration-300 ${
                  isSelected ? "opacity-100 text-gray-900" : "opacity-80 text-gray-600"
                }`}
              >
                {category.replace(/_/g, " ")}
              </div>

              {/* Línea divisoria debajo del elemento seleccionado */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 transition-all duration-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* Botón siguiente */}
      <button
        onClick={() => handleNavigation("next")}
        className="z-20 p-1 flex-shrink-0 text-gray-400 hover:text-gray-900 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
