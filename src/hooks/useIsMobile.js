import { useState, useEffect } from "react";

/**
 * Hook para detectar si el viewport es mobile
 * Reutilizable en toda la app en lugar de usar window.innerWidth directamente
 * @param {number} breakpoint - Ancho en píxeles para considerar mobile (default 768)
 * @returns {boolean} true si es mobile, false si es desktop
 */
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
