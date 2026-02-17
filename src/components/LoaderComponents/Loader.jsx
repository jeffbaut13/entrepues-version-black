import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LottieAnimation } from "./LottieAnimation";
import { Logo } from "../ui/Logo";

export const Loader = ({ onLoadingComplete }) => {
  const [div1Visible, setDiv1Visible] = useState(true);
  const [div2Visible, setDiv2Visible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldEnd, setShouldEnd] = useState(false);

  useEffect(() => {
    // Div2 aparece a los 1000ms
    const showDiv2Timer = setTimeout(() => {
      setDiv2Visible(true);
    }, 1000);

    // Div1 se va a los 1200ms
    const hideDiv1Timer = setTimeout(() => {
      setDiv1Visible(false);
    }, 5200);

    // Loader termina a los 2000ms
    const endLoaderTimer = setTimeout(() => {
      setDiv2Visible(false);
      setShouldEnd(true);
    }, 7000);

    return () => {
      clearTimeout(showDiv2Timer);
      clearTimeout(hideDiv1Timer);
      clearTimeout(endLoaderTimer);
    };
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 w-full h-full z-[5000]"
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldEnd ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (shouldEnd) {
          setIsLoading(false);
          onLoadingComplete?.();
        }
      }}
    >
      {/* Div 1: Background secondary con Lottie */}
      <motion.div
        className="fixed inset-0 w-full h-full bg-secondary flex justify-center items-center z-[100]"
        initial={{ opacity: 1 }}
        animate={{ opacity: div1Visible ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      >
        <LottieAnimation />
      </motion.div>

      {/* Div 2: Backdrop blur con Logo */}
      <motion.div
        className="fixed inset-0 w-full h-full bg-white/10 backdrop-blur-xl flex justify-center items-center z-[99]"
        initial={{ opacity: 0 }}
        animate={{ opacity: div2Visible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: div2Visible && !div1Visible ? 1 : 0,
            opacity: div2Visible ? 1 : 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Logo color="white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
