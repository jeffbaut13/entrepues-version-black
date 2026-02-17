import { motion } from "framer-motion";

export const IconoSeparador = ({ theme = "brown" }) => {
  const Theme = () => {
    switch (theme) {
      case "light":
        return "invert";
      case "dark":
        return "invert-1";
      default:
        return "invert-0";
    }
  };
  return (
    <motion.picture
      className="lg:h-20 h-12 w-auto inline-block"
      variants={{
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img
        className={`size-full object-contain inline-block ${Theme()}`}
        src="/imagenes/vectorOne.svg"
        alt="vector decorativo"
      />
    </motion.picture>
  );
};
