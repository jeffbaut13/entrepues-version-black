import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";

import { Header } from "../header/Header";
import { VideoSphere } from "./VideoSphere";
import { RotatingGroup } from "./RotatingGroup";
import { puntos } from "../../helpers/Puntos";
import { CallToActions } from "../common/CallToAction/CallToActions";

export default function Video360({ visibleIndex, setVisibleIndex }) {
  const redes = [
    { url: "https://maps.app.goo.gl/w3ARr68Ps4bvSYrp7", icon: "map" },
    {
      url: "https://www.facebook.com/profile.php?id=100063785760156&mibextid=eHce3h",
      icon: "facebook",
    },
    { url: "https://www.instagram.com/entrepues/", icon: "instagram" },
  ];

  const cameraRef = useRef();
  const { contextSafe } = useGSAP({ scope: cameraRef });

  const handlePointClick = contextSafe((newIndex) => {
    if (!cameraRef.current) return;
    const tl = gsap.timeline();
    tl.to(cameraRef.current.position, { x: 0, y: 0, z: 500, duration: 1 })
      .to(cameraRef.current.rotation, { x: 0, y: 0, z: 0, duration: 1 }, "<")
      .add(() => setVisibleIndex?.(newIndex), "<");
  });

  return (
    <>
      <Header loading={true} />
      <Canvas className="z-10">
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 500]} />
        <OrbitControls
          minDistance={300}
          maxDistance={700}
          enableZoom={true}
          zoomSpeed={0.5}
          autoRotate={false}
        />
        <RotatingGroup>
          {puntos.map((punto, index) =>
            visibleIndex === index ? (
              <VideoSphere
                key={index}
                videoUrl={punto.videoUrl}
                visible={index}
                handleUbicacion={handlePointClick}
                img={punto.img}
                ubicacion3d={punto.ubicacion3d}
              />
            ) : null
          )}
        </RotatingGroup>
      </Canvas>

      {/* Botones de acción y redes */}

      <CallToActions site="360" />
      <div
        className="absolute bottom-0 w-full h-58 z-50 pointer-events-none"
        style={{
          background: "linear-gradient(to top, black 5%, transparent 100%)",
        }}
      ></div>
    </>
  );
}
