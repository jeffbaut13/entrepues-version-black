import React, { useLayoutEffect, useRef, useId, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArcScrollReveal() {
  const images = [
    "/img_scroll/img-1.jpg",
    "/img_scroll/img-2.jpg",
    "/img_scroll/img-3.jpg",
    "/img_scroll/img-4.jpg",
    "/img_scroll/img-5.jpg",
  ];

  const wrapRef = useRef(null);
  const pathRefs = useRef([]);
  const uid = useId();

  // viewBox dinámico para respetar el aspecto del contenedor
  const [vb, setVb] = useState({ w: 1000, h: 562 }); // default 16:9 aprox.

  // PUERTA PERFECTA (tu forma) que además puede "salirse" por arriba cuando p>1
  // p=0 -> no se ve nada (puerta abajo fuera)
  // p=1 -> puerta completa (semicírculo toca arriba)
  // p=2 -> arco ya se fue por arriba, queda full rectángulo (sin curva visible)
  const makeDoorPath = (p, w, h) => {
    const clamped = Math.max(0, Math.min(2, p));
    const r = w / 2;

    // base del semicírculo:
    // p=0  -> capBaseY = h + r (todo fuera)
    // p=1  -> capBaseY = r     (puerta completa)
    // p=2  -> capBaseY = r - h (arco fuera por arriba)
    const capBaseY = (h + r) - clamped * h;

    return `M 0 ${h} L ${w} ${h} L ${w} ${capBaseY} A ${r} ${r} 0 0 0 0 ${capBaseY} Z`;
  };

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // medir contenedor y setear viewBox proporcional
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // mantenemos un ancho fijo y calculamos alto según ratio real
      const w = 1000;
      const h = Math.max(1, Math.round((1000 * height) / width));
      setVb({ w, h });
      ScrollTrigger.refresh();
    });
    ro.observe(wrap);

    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      // init paths
      images.forEach((_, i) => {
        const path = pathRefs.current[i];
        if (!path) return;
        path.setAttribute("d", makeDoorPath(i === 0 ? 2 : 0, vb.w, vb.h));
        // nota: img-1 la dejamos ya "sin arco" (p=2) para que sea full desde el inicio
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: `+=${images.length * 1400}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Para cada imagen desde la 2da:
      // 0->1 revela puerta
      // 1->2 el arco se va por arriba y desaparece (queda full)
      for (let i = 1; i < images.length; i++) {
        const path = pathRefs.current[i];
        const prog = { p: 0 };

        tl.to(prog, {
          p: 2,
          duration: 1.2,
          ease: "none",
          onUpdate: () => {
            path.setAttribute("d", makeDoorPath(prog.p, vb.w, vb.h));
          },
        });

        // hold opcional (full sin arco)
        tl.to({}, { duration: 0.35 });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [vb.w, vb.h]);

  return (
    <section
      ref={wrapRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "black",
      }}
    >
      {images.map((src, i) => (
        <svg
          key={src}
          viewBox={`0 0 ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMid meet" // ✅ CONTAIN (no crop)
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: i,
          }}
        >
          <defs>
            <clipPath id={`clip-${uid}-${i}`} clipPathUnits="userSpaceOnUse">
              <path ref={(el) => (pathRefs.current[i] = el)} />
            </clipPath>
          </defs>

          <image
            href={src}
            x="0"
            y="0"
            width={vb.w}
            height={vb.h}
            preserveAspectRatio="xMidYMid slice" // ✅ CONTAIN (no crop)
            clipPath={`url(#clip-${uid}-${i})`}
          />
        </svg>
      ))}
    </section>
  );
}

