import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Button = ({
  type = "button-primary",
  title,
  Icon,
  onClick,
  motionProps,
  props = {},
  target = "_self",
  href,
  width = "ajustado",
  iconSize = "medio",
  fontSize = "lg",
  customClass = "",
  disabled = false,
}) => {
  const getWidthClass = (width) => {
    switch (width) {
      case "ajustado":
        return "w-fit";
      case "full":
        return "w-full";
      case "medio ":
      default:
        return "md:min-w-40 min-w-34";
    }
  };

  const getIconSize = (iconSize) => {
    switch (iconSize) {
      case "small":
        return 18;
      case "tall":
        return 30;
      case "medium":
      default:
        return 24;
    }
  };

  const getFontSizeClass = (fontSize) => {
    switch (fontSize) {
      case "xs":
        return "text-xs";
      case "md":
        return "text-md";
      case "lg":
        return "text-lg";
      case "base":
      default:
        return "text-base";
    }
  };

  const listas = {
    "button-primary":
      "flex justify-center items-center gap-1 cursor-pointer text-center bg-secondary text-black border border-secondary rounded-full py-1.5 pb-2 hover:opacity-65 ease-in-out duration-300",
    enlace:
      "relative lineDown  flex justify-center items-center gap-1 cursor-pointer text-center ease-in-out duration-300",
    "button-secondary":
      "relative lineDown  flex justify-center items-center gap-1 cursor-pointer text-center ease-in-out duration-300",
    "button-thirty":
      "relative  flex justify-center items-center gap-1 cursor-pointer text-center ease-in-out duration-300 py-1.5 pb-2 border-[1px] border-white/40 rounded-full  flex justify-center items-center gap-2 cursor-pointer hover:opacity-65 text-center ease-in-out duration-300",
    "just-icon":
      "flex h-fit transition-opacity hover:opacity-70 ease-in-out duration-300",
    "just-icon-rounded":
      "cursor-pointer transition-opacity hover:opacity-70 rounded-full p-1 border border-white aspect-square ease-in-out duration-300",
  };

  switch (type) {
    case "enlace":
      return (
        <motion.a
          href={href}
          target={target}
          className={`w-fit ${getWidthClass(width)} ${getFontSizeClass(
            fontSize
          )} ${listas[type]}`}
          {...motionProps}
          {...props}
          onClick={onClick ? onClick : null}
        >
          {Icon && <Icon size={getIconSize(iconSize)} className="" />}
          {title}
        </motion.a>
      );
    case "button-primary":
      return (
        <motion.button
          {...motionProps}
          {...props}
          className={`${getWidthClass(width)} ${getFontSizeClass(fontSize)} ${
            listas[type]
          } ${customClass} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
          onClick={disabled ? null : onClick}
          disabled={disabled}
        >
          {Icon && <Icon size={getIconSize(iconSize)} />}
          {title}
        </motion.button>
      );
    case "button-secondary":
      return (
        <motion.button
          {...motionProps}
          {...props}
          className={`${getWidthClass(width)} ${getFontSizeClass(fontSize)} ${
            listas[type]
          } ${customClass}`}
          onClick={onClick}
        >
          {Icon && <Icon size={getIconSize(iconSize)} className="" />}
          {title}
        </motion.button>
      );
    case "button-thirty":
      return (
        <motion.button
          {...motionProps}
          {...props}
          className={`${getWidthClass(width)} ${getFontSizeClass(fontSize)} ${
            listas[type]
          } ${customClass}`}
          onClick={onClick}
        >
          {Icon && <Icon size={getIconSize(iconSize)} className="" />}
          {title}
        </motion.button>
      );
    case "just-icon":
      return (
        <a
          target={target}
          {...props}
          href={href}
          onClick={onClick ? onClick : null}
          className={`cursor-pointer ${
            listas[type]
          } ${customClass} ${getWidthClass(width)}`}
        >
          <Icon size={getIconSize(iconSize)} />
        </a>
      );
    case "just-icon-rounded":
      return (
        <a
          target={target}
          {...props}
          href={href}
          onClick={onClick ? onClick : null}
          className={`${listas[type]} ${customClass}`}
        >
          <Icon size={getIconSize(iconSize)} />
        </a>
      );
    default:
      return null;
  }
};
