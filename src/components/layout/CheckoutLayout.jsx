import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowLeft, ChevronLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../ui/Logo";

const CheckoutLayout = () => {
  return (
    <div className="w-full h-dvh flex flex-col overflow-hidden">
      <Header useNavigate={useNavigate} />
      <Outlet />
    </div>
  );
};
export default CheckoutLayout;

const Header = ({ useNavigate }) => {
  const navigate = useNavigate();
  return (
    <motion.header
      className="z-10 relative grid grid-cols-3 items-center place-items-center gap-4 w-full max-w-5xl mx-auto flex-shrink-0 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <motion.div
        className="w-fit inline-flex text-secondary gap-4 items-center justify-self-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        <Button
          type="enlace"
          Icon={Home}
          //title="Inicio"
          onClick={() => navigate("/")}
        />
        |
        <Button
          type="enlace"
          Icon={ChevronLeft}
          title="Volver"
          onClick={() => navigate(-1)}
        />
      </motion.div>
      <Logo color="white" size="md" />
      <div /> {/* Spacer */}
    </motion.header>
  );
};
