import { useEffect, useState } from "react";

export const useObserverVisibility = (selector, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si el selector empieza con ".", es una clase; si no, es un ID
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      // Si alguno de los elementos es visible, setear isVisible a true
      const anyVisible = entries.some((entry) => entry.isIntersecting);
      setIsVisible(anyVisible);
    }, observerOptions);

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [selector, options]);

  return isVisible;
};
