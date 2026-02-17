import { useEffect } from "react";

/**
 * Hook personalizado para ejecutar una acción al presionar ESC
 * @param {Function} callback - Función a ejecutar cuando se presiona ESC
 * @param {boolean} enabled - Determina si el hook está activo (default: true)
 */
export const useEscapeKey = (callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback, enabled]);
};
