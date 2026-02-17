import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { easing } from "../../constants/easing";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Titulo = () => {
  const titleControls = useAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      // En mobile: solo fade (opacity)
      titleControls.start({
        opacity: 1,
        transition: { duration: 3, ease: "easeOut", delay: 0 },
      });
    } else {
      // En desktop: movimiento hacia arriba + fade
      titleControls.start({
        y: -130,
        transition: { duration: 3, ease: "easeOut", delay: 0 },
      });
    }
  }, [titleControls, isMobile]);

  return (
    <div className="md:w-fit w-full flex justify-center items-center z-10">
      <motion.h1
        animate={titleControls}
        className="md:translate-y-[130px] /80 text-center md:text-6xl text-4xl font-black leading-7 md:leading-[3rem] px-4 md:tracking-widest tracking-wider"
        style={{ willChange: "transform" }}
      >
        {/* Línea 1 */}
        <WordOnce d={0.0}>La cocina más rica</WordOnce> <br />
        <WordOnce d={0.5}>de nuestro país</WordOnce>
        <br />
      </motion.h1>
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
function WordOnce({ children, d = 0 }) {
  const [played, setPlayed] = useState(false);

  return (
    <motion.span
      className="inline-block align-top mr-4"
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
