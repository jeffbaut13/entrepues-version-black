import { motion } from "framer-motion";
import {
  ArrowLeft,
  ConciergeBell,
  Notebook,
  RefreshCcwDot,
} from "lucide-react";

import { Button } from "../../ui/Button";
import { redes } from "../../../constants/redesSociales";
import useMenuStore from "../../../store/menuStore";
import useReservaStore from "../../../store/reservaStore";

export const CallToActions = ({ site = "home" }) => {
  // zustand
  const openMenuWithContext = useMenuStore(
    (state) => state.openMenuWithContext
  );
  const { openBookingWithOrigin } = useReservaStore();

  const handleOpenbooking = () => {
    openBookingWithOrigin("home");
  };
  const handleOpenMenu = () => {
    openMenuWithContext("home");
  };

  return (
    <div className="max-w-62 w-full flex flex-col md:gap-4 gap-4 text-2xl z-20">
      <div className="w-full flex md:flex-row flex-col justify-center items-center gap-4 overflow-hidden">
        <Button
          width="full"
          type="button-primary"
          title="Reservar"
          onClick={handleOpenbooking}
          Icon={ConciergeBell}
          motionProps={{
            initial: { y: 100 },
            animate: { y: 0 },
            transition: { delay: 0.8, ease: "easeInOut", duration: 1 },
          }}
        />
      </div>
      <div
        className={`w-full flex ${
          site === "home" ? "" : "flex-row-reverse"
        } justify-evenly items-center  overflow-hidden `}
      >
        <Button
          type="button-secondary"
          title={"Menú"}
          onClick={handleOpenMenu}
          Icon={Notebook}
          motionProps={{
            initial: { y: 100 },
            animate: { y: 0 },
            transition: { delay: 1.2, ease: "easeInOut", duration: 1 },
          }}
        />

        {site == "home" ? (
          <>
            <Button
              type="enlace"
              title="Vista 360°"
              Icon={RefreshCcwDot}
              href="/descubrenos"
              motionProps={{
                initial: { y: 100 },
                animate: { y: 0 },
                transition: { delay: 1.4, ease: "easeInOut", duration: 1 },
              }}
            />
          </>
        ) : (
          <Button
            type="enlace"
            title="Volver"
            Icon={ArrowLeft}
            href="/"
            motionProps={{
              initial: { y: 100 },
              animate: { y: 0 },
              transition: { delay: 1, ease: "easeInOut", duration: 1 },
            }}
          />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, ease: "easeInOut", duration: 1 }}
        className="flex justify-center items-center gap-12"
      >
        <div className="flex items-center justify-center gap-8">
          {redes.map((red, inx) => {
            const IconComponent = red.icon;
            return (
              <Button
                type="just-icon"
                target="_blank"
                href={red.url}
                key={inx}
                props={{ "aria-label": red.label }}
                Icon={IconComponent}
                iconSize="small"
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
