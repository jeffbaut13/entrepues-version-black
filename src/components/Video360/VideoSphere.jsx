import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Html, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

import { PuntoHover } from "./PuntoHover";
import { animationSphere } from "../../helpers/animations";
import { ubicacionPunto } from "../../helpers/Puntos";

export const VideoSphere = ({
  videoUrl,
  visible,
  ubicacion3d,
  handleUbicacion,
  img,
}) => {
  const texture = useVideoTexture(videoUrl, {
    start: true,
    crossOrigin: "Anonymous",
    muted: true, // Añade esta línea
    playsInline: true, // Añade esta línea
  });
  const sphereRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      animationSphere(visible, tl, sphereRef);
    },
    { scope: sphereRef, dependencies: [visible] }
  );

  // Invertir coordenadas UV
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = -1; // Invertir horizontalmente
    }
  }, [texture]);

  const puntosUbicaciones = ubicacionPunto[0];

  return (
    <>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.BackSide}
          //transparent
          //opacity={0}
        />
      </mesh>

      {puntosUbicaciones[ubicacion3d].map((punto, index) => (
        <Html key={index} position={punto}>
          <PuntoHover
            handleUbicacion={() => handleUbicacion(index)}
            img={img}
            ubicacion={`${visible === index ? "hidden" : ""} bg-transparent`}
          />
        </Html>
      ))}
    </>
  );
};
