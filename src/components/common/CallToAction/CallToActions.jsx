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
import { useObserverVisibility } from "../../../hooks/useObserverVisibility";
import { useLoaderContext } from "../../../context/LoaderContext";

export const CallToActions = ({ site = "home" }) => {
  // zustand
  const openMenuWithContext = useMenuStore(
    (state) => state.openMenuWithContext
  );
  const { openBookingWithOrigin } = useReservaStore();
  const isSectionVisible = useObserverVisibility(".hide-logo-section");
  const { loadingComplete } = useLoaderContext();

  const handleOpenbooking = () => {
    openBookingWithOrigin("Volver al inicio");
  };
  const handleOpenMenu = () => {
    openMenuWithContext("Volver al inicio");
  };

  // Los delays se calculan desde el final del loader (2s) + delay adicional
  // Los delays originales se mantienen sumando 2s
  const getAnimationDelay = (originalDelay) => {
    return loadingComplete ? originalDelay : 2 + originalDelay;
  };

  return (
    <div className="size-full z-[51] flex flex-col items-center justify-end pb-6">
      <div className="md:max-w-2xl max-w-sm w-full flex flex-col md:gap-6 gap-4 text-2xl z-20">
        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-4 overflow-hidden">
          <Button
            width="full"
            customClass={`order-2 ${
              site == "home" ? "md:order-1" : "md:order-3"
            }`}
            type="button-secondary"
            title={"Menú"}
            fontSize="2xl"
            onClick={handleOpenMenu}
            motionProps={{
              initial: { y: 100 },
              animate: { y: 0 },
              transition: {
                delay: getAnimationDelay(1.2),
                ease: "easeInOut",
                duration: 1,
              },
            }}
          />
          <Button
            width="full"
            customClass="order-1  md:order-2 bg-black/10 backdrop-blur-sm border border-secondary/40"
            type="enlace"
            href="/reservar"
            title="Reservar"
            fontSize="2xl"
            
            onClick={handleOpenbooking}
            motionProps={{
              initial: { y: 100 },
              animate: { y: 0 },
              transition: {
                delay: getAnimationDelay(0.8),
                ease: "easeInOut",
                duration: 1,
              },
            }}
          />
          {site == "home" ? (
            <>
              <Button
                width="full"
                customClass="order-3 md:order-3"
                type="enlace"
                title="Vista 360°"
                href="/descubrenos"
                fontSize="2xl"
                motionProps={{
                  initial: { y: 100 },
                  animate: { y: 0 },
                  transition: {
                    delay: getAnimationDelay(1.3),
                    ease: "easeInOut",
                    duration: 1,
                  },
                }}
              />
            </>
          ) : (
            <Button
              width="full"
              customClass="order-3 md:order-1"
              type="enlace"
              title="Volver"
              Icon={ArrowLeft}
              href="/"
              motionProps={{
                initial: { y: 100 },
                animate: { y: 0 },
                transition: {
                  delay: getAnimationDelay(1),
                  ease: "easeInOut",
                  duration: 1,
                },
              }}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: getAnimationDelay(1.5),
            ease: "easeInOut",
            duration: 1,
          }}
          className="flex justify-center items-center gap-12 max-md:mt-4"
        >
          <div
            className={`flex items-center justify-center gap-8 ${
              isSectionVisible ? "text-brown" : "text-secondary"
            } `}
          >
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
    </div>
  );
};
