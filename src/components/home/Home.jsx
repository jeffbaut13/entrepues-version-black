import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { CallToActions } from "../common/CallToAction/CallToActions";
import { Logo } from "../ui/Logo";
import { Title } from "../ui/Title";

const easing = [0.22, 1, 0.36, 1];

// Componente para fondo dinámico
const DynamicBackground = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/imagenes/home/fondo-1.jpg",
    "/imagenes/home/fondo-2.jpg",
    "/imagenes/home/fondo-3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          className="absolute w-full h-full object-cover"
          src={images[currentImage]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
        />
      </AnimatePresence>
    </div>
  );
};

// Variantes por palabra
const wordVariants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  show: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay, duration: 1.6, ease: easing },
  }),
};

// Palabra que se anima SOLO una vez y luego queda fija
function WordOnce({ children, d = 0, size = "medium" }) {
  const [played, setPlayed] = useState(false);

  const sizeTheme = () => {
    switch (size) {
      case "small":
        return "text-xl md:text-4xl";
      case "medium":
        return "text-4xl md:text-7xl";
      case "big":
        return "md:text-8xl text-4xl leading-8 md:leading-[3rem]";
      default:
        return "text-4xl md:text-7xl";
    }
  };
  return (
    <motion.span
      className={`inline-block align-top ${sizeTheme()}`}
      variants={wordVariants}
      custom={d}
      initial={played ? false : "initial"}
      animate={played ? undefined : "show"}
      inherit={false}
      onAnimationComplete={() => setPlayed(true)}
      style={{ willChange: played ? "auto" : "filter, opacity" }}
    >
      {children}
    </motion.span>
  );
}

export const Home = () => {
  const [loading, setloading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const titleControls = useAnimation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setloading(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="w-full h-dvh relative overflow-hidden">
      <motion.div className="size-full relative overflow-hidden z-10 flex flex-col items-center justify-center gap-4">
        {/* Fondo */}
        <DynamicBackground />

        {/* H1 (solo traslada en Y al cargar) */}

        <Logo size="md" />

        <Title
          headContent={"La casa de la cocina"}
          content={"Más rica del país"}
          theme="light"
          headingLevel="h1"
          className="z-20 relative mt-12"
        />

        {/* Overlay: visible al inicio; al cargar, se va hacia arriba */}
        <AnimatePresence initial={false}>
          {!loading && (
            <motion.div
              key="overlay"
              className="absolute inset-0 bg-black z-[50] flex items-center justify-center"
              initial={{ y: "0%", opacity: 1 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: easing }}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.div
                  className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin"
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carne PNG (z-10) */}
        <span className="w-220 h-[30rem] inline-block z-[21]"></span>

        <div className="w-full h-fit relative z-[22]">
          <CallToActions />
        </div>
      </motion.div>
      {/* SOLO muestra los links y botones en HomeTwo */}

      {/* Fondo dinámico que cambia cada 3 segundos */}
    </main>
  );
};
