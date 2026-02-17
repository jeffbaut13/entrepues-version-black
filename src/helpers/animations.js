export const animationSphere = (visible, tl, sphereRef) => {
  if (visible) {
    tl.to(sphereRef.current.material, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
    tl.from(
      sphereRef.current.scale,
      {
        z: 3,
        y: 3,
        x: 3,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    );
  } else {
    tl.to(sphereRef.current.material, {
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    });
    tl.from(
      sphereRef.current.scale,
      {
        z: 3,
        y: 3,
        x: 3,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    );
  }
};
