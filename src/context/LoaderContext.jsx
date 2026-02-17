import { createContext, useContext } from "react";

// Contexto para saber si el loader ha completado
// Esto permite que componentes como Header y CallToActions esperen antes de animar
const LoaderContext = createContext({
  loadingComplete: false,
});

export const useLoaderContext = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoaderContext must be used within LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children, loadingComplete }) => {
  return (
    <LoaderContext.Provider value={{ loadingComplete }}>
      {children}
    </LoaderContext.Provider>
  );
};
