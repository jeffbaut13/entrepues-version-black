import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Header } from "../header/Header";
import { Titulo } from "../ui/Titulo";
import { easing } from "../../constants/easing";
import { CallToActions } from "../common/CallToAction/CallToActions";
import useReservaStore from "../../store/reservaStore";
import ArcScrollReveal from "../ScrollSvg";
import { Logo } from "../ui/Logo";
import { Title } from "../ui/Title";
import { IconoSeparador } from "../ui/IconoSeparador";

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
      <main className="w-full relative bg-black text-brown">
        <CallToActions />

        <ArcScrollReveal />
        <SectionTwo />
        <SectionThree />
        <Footer />
      </main>
    </>
  );
};

const SectionTwo = () => {
  return (
    <>
      <section
        className="hide-logo-section h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/imagenes/backgroundTwo.webp')" }}
      >
        <div className="w-1/2 h-full flex justify-center items-center">
          <motion.div
            className="max-w-lg text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18, ease: "easeOut" },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Title headContent={"La casa"} content={"Del sabor Colombiano"} />
            </motion.div>
            <IconoSeparador />
            <motion.p
              className="text-center text-2xl "
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              En Entrepués cocinamos con tradición, con tiempo,
              <br className="hidden lg:block" /> con cariño y con ese sabor que
              empieza en la casa. <br className="hidden lg:block" />
              Aquí cada plato trae una historia y cada espacio{" "}
              <br className="hidden lg:block" />
              es un pedacito del país, pensado para que te sientes{" "}
              <br className="hidden lg:block" />
              sin afán, compartas y te antojes de recorrerlo todo.
            </motion.p>
          </motion.div>
        </div>
        <div className="w-1/2"></div>
      </section>
    </>
  );
};
const SectionThree = () => {
  const imagenes = [
    {
      url: 0,
      title: "La bandeja paisa",
    },
    {
      url: 0,
      title: "El sanchocho",
    },
    {
      url: 0,
      title: "El ajiaco",
    },
  ];
  return (
    <>
      <section
        className="hide-logo-section h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/imagenes/background_texture.webp')" }}
      >
        <div className="w-full h-full flex flex-col justify-center gap-4 items-center">
          <motion.div
            className="max-w-full text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18, ease: "easeOut" },
              },
            }}
          >
            <motion.h2
              className="text-8xl font-danson pt-16"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              LOS FAVORITOS DE LA CASA
            </motion.h2>
            <motion.p
              className="text-2xl my-6"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              De esos que uno no olvida y siempre vuelve a pedir.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex-1 w-full flex justify-between relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, ease: "easeOut" },
              },
            }}
          >
            <picture className="absolute -top-8 left-0 w-full h-25 z-10">
              <img
                className="size-full inline-block"
                src="/imagenes/divisor.webp"
                alt=""
              />
            </picture>
            {imagenes.map((item, i) => (
              <motion.div
                key={i}
                style={{
                  backgroundImage: `url(/imagenes/section-four/la-cocina-más-rica-del-país-${
                    i + 1
                  }.webp)`,
                }}
                className="bg-cover bg-center bg-no-repeat w-full h-full flex justify-center items-end pb-8 relative"
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-t from-black/60 pointer-events-none absolute top-0 left-0 size-full" />
                <h4 className="max-w-xl flex flex-col font-danson text-secondary text-center z-10 relative">
                  <span className="flex justify-center items-center gap-4">
                    <span className="flex-1 h-px rounded-full bg-secondary" />
                    <span className="w-fit !text-4xl">{item.title}</span>
                    <span className="flex-1 h-px rounded-full bg-secondary" />
                  </span>
                  <span className="!text-7xl !leading-14">
                    más rica del país
                  </span>
                </h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
const Footer = () => {
  return (
    <>
      <footer
        className="hide-logo-section h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/imagenes/background_texture.webp')" }}
      >
        <div className="size-full flex justify-center items-center">
          <motion.div
            className="max-w-2xl text-center space-y-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18, ease: "easeOut" },
              },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              CHÍA, CUNDINAMARCA, 1987
            </motion.p>
            <motion.h2
              className="text-8xl font-danson"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Nuestra Inspiración
            </motion.h2>
            <motion.picture
              className="h-20 w-auto inline-block"
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                className="size-full object-contain inline-block"
                src="/imagenes/vectorOne.svg"
                alt="vector decorativo"
              />
            </motion.picture>
            <motion.p
              className="text-2xl"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Entrepués nace del orgullo por lo nuestro. De esa cocina
              colombiana <br className="hidden lg:block" /> tradicional que se
              hace con manos sabias y con familia alrededor{" "}
              <br className="hidden lg:block" /> Queríamos que toda la riqueza
              del país tuviera una casa donde <br className="hidden lg:block" />
              se vea, se sienta y se comparta en cada región. Aquí cada receta{" "}
              <br className="hidden lg:block" /> guarda memoria, cada
              ingrediente tiene origen y cada visita{" "}
              <br className="hidden lg:block" />
              se siente como en casa.
            </motion.p>
          </motion.div>
        </div>
        <div className="w-1/2"></div>
      </footer>
    </>
  );
};


