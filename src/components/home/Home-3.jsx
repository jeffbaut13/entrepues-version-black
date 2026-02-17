import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Header } from "../header/Header";
import { Titulo } from "../ui/Titulo";
import { easing } from "../../constants/easing";
import { CallToActions } from "../common/CallToAction/CallToActions";
import useReservaStore from "../../store/reservaStore";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { reservaResult } = useReservaStore();

  return (
    <>
      <Header loading={true} />
      <main
        style={{
          backgroundImage: isMobile
            ? 'url("/imagenes/background-home.jpg")'
            : 'url("/imagenes/background-home.jpg")',
        }}
        className="size-full flex flex-col items-center justify-center max-md:gap-12 max-md:pt-18 relative  bg-cover bg-center"
      >
        <div className="size-full absolute top-0 left-0 bg-gradient-to-b from-black/20 via-transparent via-70% to-80% to-black/50"></div>
        <div className="size-full relative z-10 flex flex-col items-center justify-end pb-12">
          <CallToActions />
        </div>
      </main>
    </>
  );
};
