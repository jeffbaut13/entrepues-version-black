export const MesasSelectorx4 = ({
  index = 0,
  size = "lg",
  colorRelleno = "fill-[#ffffff00]",
  strokeSecondary = "var(--secondary)",
  strokeDark = "var(--dark)",
  numeroAsistentes,
}) => {
  const width = () => {
    switch (size) {
      case "sm":
        return "w-6";
      case "md":
        return "w-8";
      case "lg":
        return "w-10";
      default:
        return "w-8";
    }
  };

  // Función para determinar el color de relleno de cada silla
  const getColorForSilla = (sillaNumber) => {
    return sillaNumber < index ? colorRelleno : "fill-[#ffffff00]";
  };

  // Función para determinar el color del stroke de cada silla
  const getStrokeForSilla = (sillaNumber) => {
    return sillaNumber < index ? strokeSecondary : strokeDark;
  };

  return (
    <picture className={`${width()} h-auto relative`}>
      <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        {numeroAsistentes}
      </span>

      <svg
        id="uuid-b9dc02be-eb8e-43af-b1d6-12117cc3cc19"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 136.88 135.65"
        className="size-full object-contain inline-block"
      >
        <g id="uuid-27f1e31e-d3ef-422c-b33f-6c344fad3bd7" data-name="Capa 1">
          <g id="uuid-2e5b18aa-4089-4226-82fb-06529921be0c" data-name="mesax4">
            <g
              id="uuid-ea9742af-da21-4a87-a93c-e592e00b3513"
              data-name="silla_0"
            >
              <g
                className={getColorForSilla(0)}
                id="uuid-6ce0b6aa-f738-463f-a79c-c25eb2972f4b"
                data-name="rellena"
              >
                <path d="M55.36,9.8s.71-3.09,1.4-3.41l.75.79,1.33.33,2.07-1.37,3.25-1.67,2.37-.4,2.98.11,2.33.48,2.84,1.48.98,1.04s1.41.22,1.48.22.72-.46.72-.46l.52-.56.73,1.03.4.99.24,1.06.1.41-.92,1.05,1.52,11.99s.55.99.68,1.08.66.36.66.36l.18.71.3,1.26-.09,1.49-.62,1.51-.89,1.04-1.43.87s-1.08.35-1.25.3-18.26,0-18.26,0l-.84-.09-1.38-.41-1.11-.61-1.07-.95-.84-1.18-.72-1.47-.05-1.8v-.52l.55-.23.63-.67.32-1.92,1.17-9.81v-.68s-.3-.83-.3-.83l-.76-.54Z" />
                <path d="M51.25,10.99l-1.35,11.1s-.01,2.21,1.47,2.29l1.81.19s1.55.02,1.89-1.33l1.36-11.39s.21-1.76-1.39-2.16c0,0-3.36-1.07-3.79,1.29Z" />
                <path d="M80.49,22.9s.06,1.95,2.54,1.69c0,0,2.84.08,2.68-2.25l-1.16-7.75-.55-3.67s-.39-1.5-1.68-1.41l-2.08.2s-1.53.12-1.37,2.35l1.13,8.15.48,2.7Z" />
                <path d="M56.77,4.97s1.07-1.69,4.09-3.1c0,0,3.78-1.69,6.78-1.54,0,0,4.64-.21,9.04,2.89,0,0,2.86,1.76,1.75,3.16,0,0-.37,1.5-2.23,1.09l-.66-.38-.85-.69-1.27-.82-1.18-.57-1.16-.42-1.54-.4-1.66-.11h-1.33l-1.74.34-1.98.67-1.9,1.06-1.42,1.11-.65.26-.73.03-.75-.36-.42-.46-.32-.76v-.82l.14-.17Z" />
              </g>
              <g
                id="uuid-568e94b9-eb7d-48d8-b027-80012fb5b086"
                data-name="borde"
              >
                <g
                  id="uuid-b77a4632-6372-4045-904b-7f1525dee4c8"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-99281250-5bf9-42da-b3eb-bd265b5f5673"
                    data-name="LINE"
                  >
                    <line
                      x1="59.99"
                      y1="31.52"
                      x2="78.03"
                      y2="31.52"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b5bef69f-8b8e-4cfc-a711-a55fbe20c35e"
                    data-name="LINE"
                  >
                    <line
                      x1="81.84"
                      y1="24.67"
                      x2="81.82"
                      y2="24.51"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c2be0598-6df9-4f0c-a8ca-56349b38fd32"
                    data-name="LINE"
                  >
                    <line
                      x1="55.48"
                      y1="9.59"
                      x2="55.45"
                      y2="9.85"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-bf226669-2178-4832-9712-e79dbffea9f5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M79.79,9.6c-.12-1.17-.56-2.29-1.29-3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f2531d80-f0aa-4878-a19b-fa54ee6d6073"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M56.77,6.37c-.72.93-1.17,2.04-1.29,3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7fad3884-8524-49cc-b3f7-b02e15247cf9"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.03,31.52c2.62-.26,4.54-2.59,4.28-5.21-.06-.57-.21-1.13-.47-1.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-88eff5d0-3b76-4de8-b952-00279a9b4878"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M53.79,24.66c-.34,3.43,2.16,6.49,5.59,6.83.21.02.41.03.62.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-636be329-8d44-415a-b4a1-102bec3b3089"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M84.04,24.43c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3c4d2546-de90-49df-a659-37627f48c419"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M49.91,22.36c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9c67c189-54f5-4b57-a36a-d440a62ded2b"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M75.64,7.17c-4.53-4.13-11.47-4.14-16-.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e732c826-51b7-49ad-ac96-54db226bb07c"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M77.9,4.19c-5.87-5.15-14.65-5.16-20.53-.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-86792391-78b5-416f-b116-660ebb045ee8"
                    data-name="LINE"
                  >
                    <line
                      x1="78.13"
                      y1="6.97"
                      x2="78.13"
                      y2="6.97"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-79507d44-48fb-41a6-becf-5c2d0a23c805"
                    data-name="LINE"
                  >
                    <line
                      x1="57.14"
                      y1="6.96"
                      x2="57.14"
                      y2="6.96"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0a17f2bc-b064-44af-90f8-c0fa3b4d63ac"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.13,6.97c.71-.75.68-1.93-.07-2.65-.05-.05-.1-.09-.16-.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7273ee7b-7ee2-4d4a-9ec1-d9058afff18e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M75.64,7.17c.76.58,1.83.49,2.49-.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-bc27a9d3-d78f-4dc2-90fa-4bad72f10685"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.14,6.96c.66.69,1.73.78,2.49.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9298cadf-5208-43c3-803b-4128dcb18e5b"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.37,4.18c-.82.63-.98,1.8-.36,2.62.04.05.09.11.13.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0cc37296-8b64-4163-9a29-6e10f7401a93"
                    data-name="LINE"
                  >
                    <line
                      x1="79.82"
                      y1="9.86"
                      x2="79.79"
                      y2="9.6"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ac9bc33b-f257-47b1-a86e-c6a8d29871f2"
                    data-name="LINE"
                  >
                    <line
                      x1="53.8"
                      y1="24.5"
                      x2="53.79"
                      y2="24.66"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-600c1f04-4eb2-4448-b625-9fd9e3a0981e"
                    data-name="LINE"
                  >
                    <line
                      x1="51.22"
                      y1="11.17"
                      x2="49.91"
                      y2="22.36"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-aadc85c6-52bb-4bd9-9680-a363f7d855b0"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M53.27,9.49c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3650da00-8b37-42ef-b314-d957ae887b67"
                    data-name="LINE"
                  >
                    <line
                      x1="54.77"
                      y1="9.64"
                      x2="53.27"
                      y2="9.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-15ff6023-8d81-43b7-b82f-1e7aa8f1cee6"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M56.44,11.69c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2768e2e9-86ec-4df0-a7d3-f2eb4a04a0fd"
                    data-name="LINE"
                  >
                    <line
                      x1="55.14"
                      y1="22.89"
                      x2="56.44"
                      y2="11.69"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8489aaef-2aab-4f09-9409-f4f4e827ec8f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M53.09,24.56c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-57d57d1c-c500-4092-b6bb-782048b14eea"
                    data-name="LINE"
                  >
                    <line
                      x1="51.59"
                      y1="24.41"
                      x2="53.09"
                      y2="24.56"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-466f9992-b297-44d7-9b93-78718d1d3d27"
                    data-name="LINE"
                  >
                    <line
                      x1="84.06"
                      y1="11.18"
                      x2="85.72"
                      y2="22.38"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b37c0722-957d-4f1a-9e25-3b229789980f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M84.06,11.18c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-db01a8b7-6621-45e4-923e-8cf8d5ec84c9"
                    data-name="LINE"
                  >
                    <line
                      x1="80.5"
                      y1="9.66"
                      x2="82.01"
                      y2="9.51"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-52e30861-7a08-453d-aaaf-b864b89f5baf"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M80.5,9.66c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-11384bc1-6df2-477f-a9ec-4d8bd0abfeea"
                    data-name="LINE"
                  >
                    <line
                      x1="80.49"
                      y1="22.9"
                      x2="78.83"
                      y2="11.71"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-422b6a5b-17cf-4990-815c-235e025a30fe"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M80.49,22.9c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c74a07d6-13dd-416b-b3f9-cf7876550231"
                    data-name="LINE"
                  >
                    <line
                      x1="84.04"
                      y1="24.43"
                      x2="82.54"
                      y2="24.58"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-72cd7710-d5b4-420c-9f28-e62531739aa6"
              data-name="silla_1"
            >
              <g
                className={getColorForSilla(1)}
                id="uuid-7b0addfa-38ed-416f-83cd-295de2ee68cd"
                data-name="rellena"
              >
                <path d="M80.26,125.85s-.71,3.09-1.4,3.41l-.75-.79-1.33-.33-2.07,1.37-3.25,1.67-2.37.4-2.98-.11-2.33-.48-2.84-1.48-.98-1.04s-1.41-.22-1.48-.22-.72.46-.72.46l-.52.56-.73-1.03-.4-.99-.24-1.06-.1-.41.92-1.05-1.52-11.99s-.55-.99-.68-1.08-.66-.36-.66-.36l-.18-.71-.3-1.26.09-1.49.62-1.51.89-1.04,1.43-.87s1.08-.35,1.25-.3,18.26,0,18.26,0l.84.09,1.38.41,1.11.61,1.07.95.84,1.18.72,1.47.05,1.8v.52l-.55.23-.63.67-.32,1.92-1.17,9.81v.68s.3.83.3.83l.76.54Z" />
                <path d="M84.38,124.66l1.35-11.1s.01-2.21-1.47-2.29l-1.81-.19s-1.55-.02-1.89,1.33l-1.36,11.39s-.21,1.76,1.39,2.16c0,0,3.36,1.07,3.79-1.29Z" />
                <path d="M55.14,112.75s-.06-1.95-2.54-1.69c0,0-2.84-.08-2.68,2.25l1.16,7.75.55,3.67s.39,1.5,1.68,1.41l2.08-.2s1.53-.12,1.37-2.35l-1.13-8.15-.48-2.7Z" />
                <path d="M78.86,130.68s-1.07,1.69-4.09,3.1c0,0-3.78,1.69-6.78,1.54,0,0-4.64.21-9.04-2.89,0,0-2.86-1.76-1.75-3.16,0,0,.37-1.5,2.23-1.09l.66.38.85.69,1.27.82,1.18.57,1.16.42,1.54.4,1.66.11h1.33l1.74-.34,1.98-.67,1.9-1.06,1.42-1.11.65-.26.73-.03.75.36.42.46.32.76v.82l-.14.17Z" />
              </g>
              <g
                id="uuid-74f65390-8cc1-4691-b66f-771f31779fe8"
                data-name="borde"
              >
                <g
                  id="uuid-1c65d788-ea81-418c-9d70-99b7a47609b3"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-ea6ea8dc-bf04-4361-bec2-f03b82a505c7"
                    data-name="LINE"
                  >
                    <line
                      x1="75.63"
                      y1="104.13"
                      x2="57.6"
                      y2="104.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0fe3aef5-735c-4c55-9969-2f3ca4fec7ed"
                    data-name="LINE"
                  >
                    <line
                      x1="53.78"
                      y1="110.98"
                      x2="53.8"
                      y2="111.14"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-08bae361-e5cc-4c1a-940d-6c22bd02feb0"
                    data-name="LINE"
                  >
                    <line
                      x1="80.14"
                      y1="126.06"
                      x2="80.17"
                      y2="125.8"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3c749573-2baa-42f9-a118-aa1ac0337143"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M55.83,126.05c.12,1.17.56,2.29,1.29,3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-610bf3e5-2207-4d60-a49a-8e466276a19c"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.86,129.27c.72-.93,1.17-2.04,1.29-3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-47101735-7b86-46b5-aa88-95c2ebef4892"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.6,104.13c-2.62.26-4.54,2.59-4.28,5.21.06.57.21,1.13.47,1.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4cb2a855-a030-4153-ab06-b16d803e2b5e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M81.84,110.99c.34-3.43-2.16-6.49-5.59-6.83-.21-.02-.41-.03-.62-.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ee1fe208-ddf8-4358-a4c9-993eca951774"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M51.59,111.22c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7df282e3-8b87-4ef4-b95c-d3f1d9e285f0"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M85.72,113.28c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-53d8c4c3-d5c2-4726-b1ef-e6afc61c3930"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M59.99,128.47c4.53,4.13,11.47,4.14,16,.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-26849dc9-955b-4e53-98b1-d61caddd1379"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.72,131.46c5.87,5.15,14.65,5.16,20.53.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-169d19c1-8105-4b05-b8aa-e435574f648c"
                    data-name="LINE"
                  >
                    <line
                      x1="57.5"
                      y1="128.68"
                      x2="57.5"
                      y2="128.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5f968651-bb99-4ef1-aa4e-930d61dc09c2"
                    data-name="LINE"
                  >
                    <line
                      x1="78.48"
                      y1="128.69"
                      x2="78.48"
                      y2="128.69"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f6dfe908-71be-4051-901c-72140323128e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.5,128.68c-.71.75-.68,1.93.07,2.65.05.05.1.09.16.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-de3102f8-21ab-46c6-98a6-fbd5a4e4116c"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M59.99,128.47c-.76-.58-1.83-.49-2.49.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4451881c-0a38-4642-8900-8114b4a1b3b3"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.48,128.69c-.66-.69-1.73-.78-2.49-.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3c6e4b74-b545-46cd-984f-3149ffc27dd6"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.26,131.47c.82-.63.98-1.8.36-2.62-.04-.05-.09-.11-.13-.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c92bde0e-ccc6-4d42-b5e3-eb05f9203b6e"
                    data-name="LINE"
                  >
                    <line
                      x1="55.81"
                      y1="125.78"
                      x2="55.83"
                      y2="126.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d0f395c5-0935-4066-962d-60f16b185570"
                    data-name="LINE"
                  >
                    <line
                      x1="81.82"
                      y1="111.15"
                      x2="81.84"
                      y2="110.99"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-27d8425d-6fa5-49ca-901f-4429cfd6d348"
                    data-name="LINE"
                  >
                    <line
                      x1="84.41"
                      y1="124.48"
                      x2="85.72"
                      y2="113.28"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ac5655a4-c1ee-445a-9704-aecfc6c6c8f5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M82.36,126.15c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1cec884d-0883-4e76-9c0c-3becfde0c82b"
                    data-name="LINE"
                  >
                    <line
                      x1="80.86"
                      y1="126"
                      x2="82.36"
                      y2="126.15"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9afb89e2-1103-42e2-8a5e-9c91e8184943"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M79.18,123.95c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1d485257-11de-4209-a18b-f9484d1e4523"
                    data-name="LINE"
                  >
                    <line
                      x1="80.49"
                      y1="112.76"
                      x2="79.18"
                      y2="123.95"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-76891c14-5d75-4f19-84de-5f73530075e3"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M82.54,111.08c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-84b45081-3ecc-4175-b083-547852cecf92"
                    data-name="LINE"
                  >
                    <line
                      x1="84.04"
                      y1="111.23"
                      x2="82.54"
                      y2="111.08"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-646f03af-41c3-4924-b0b7-9e1a4a1bb5f8"
                    data-name="LINE"
                  >
                    <line
                      x1="51.57"
                      y1="124.46"
                      x2="49.91"
                      y2="113.27"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-225baa1c-e1ae-4b85-9321-ab6de617e620"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M51.57,124.46c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c7b0d9de-4c8f-4df7-80ad-3c0f9549087f"
                    data-name="LINE"
                  >
                    <line
                      x1="55.12"
                      y1="125.99"
                      x2="53.62"
                      y2="126.14"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5b184bfb-4018-44e8-a2e2-997d4b641f13"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M55.12,125.99c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-694fcec6-8cc9-4bc4-b078-3e7c5f6ac374"
                    data-name="LINE"
                  >
                    <line
                      x1="55.14"
                      y1="112.75"
                      x2="56.8"
                      y2="123.94"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e500e3ca-cead-41a3-b69c-1a5739bf7403"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M55.14,112.75c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-86b790a2-2efe-4110-b88c-4335ee20a232"
                    data-name="LINE"
                  >
                    <line
                      x1="51.59"
                      y1="111.22"
                      x2="53.09"
                      y2="111.07"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-f3e773bc-92bf-4222-9e64-917adc980a90"
              data-name="silla_2"
            >
              <g
                className={getColorForSilla(2)}
                id="uuid-7a4d1ae2-ff3e-45b8-ae7c-c282c7357c14"
                data-name="rellena"
              >
                <path d="M126.08,55.18s3.09.71,3.41,1.4l-.79.75-.33,1.33,1.37,2.07,1.67,3.25.4,2.37-.11,2.98-.48,2.33-1.48,2.84-1.04.98s-.22,1.41-.22,1.48.46.72.46.72l.56.52-1.03.73-.99.4-1.06.24-.41.1-1.05-.92-11.99,1.52s-.99.55-1.08.68-.36.66-.36.66l-.71.18-1.26.3-1.49-.09-1.51-.62-1.04-.89-.87-1.43s-.35-1.08-.3-1.25,0-18.26,0-18.26l.09-.84.41-1.38.61-1.11.95-1.07,1.18-.84,1.47-.72,1.8-.05h.52l.23.55.67.63,1.92.32,9.81,1.17h.68s.83-.3.83-.3l.54-.76Z" />
                <path d="M124.89,51.07l-11.1-1.35s-2.21-.01-2.29,1.47l-.19,1.81s-.02,1.55,1.33,1.89l11.39,1.36s1.76.21,2.16-1.39c0,0,1.07-3.36-1.29-3.79Z" />
                <path d="M112.98,80.31s-1.95.06-1.69,2.54c0,0-.08,2.84,2.25,2.68l7.75-1.16,3.67-.55s1.5-.39,1.41-1.68l-.2-2.08s-.12-1.53-2.35-1.37l-8.15,1.13-2.7.48Z" />
                <path d="M130.91,56.59s1.69,1.07,3.1,4.09c0,0,1.69,3.78,1.54,6.78,0,0,.21,4.64-2.89,9.04,0,0-1.76,2.86-3.16,1.75,0,0-1.5-.37-1.09-2.23l.38-.66.69-.85.82-1.27.57-1.18.42-1.16.4-1.54.11-1.66v-1.33l-.34-1.74-.67-1.98-1.06-1.9-1.11-1.42-.26-.65-.03-.73.36-.75.46-.42.76-.32h.82l.17.14Z" />
              </g>
              <g
                id="uuid-9afe166e-28c1-462f-a0fd-9b2a5ddc3750"
                data-name="borde"
              >
                <g
                  id="uuid-537dde14-7bbd-40d5-92eb-97d0a643eb39"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-a5007799-c3aa-4942-8416-fd5e456781c8"
                    data-name="LINE"
                  >
                    <line
                      x1="104.36"
                      y1="59.81"
                      x2="104.36"
                      y2="77.85"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0d301085-dc9a-437a-b2e2-382e8a1d5f82"
                    data-name="LINE"
                  >
                    <line
                      x1="111.21"
                      y1="81.66"
                      x2="111.37"
                      y2="81.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-18120fe7-31bc-49eb-bb06-6f1d290f1953"
                    data-name="LINE"
                  >
                    <line
                      x1="126.29"
                      y1="55.3"
                      x2="126.03"
                      y2="55.27"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c008c50b-f6fa-4ec9-bbcc-8f21f5cb53fc"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M126.28,79.61c1.17-.12,2.29-.56,3.21-1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1ec0bab6-7db5-4e12-95d8-c10a01b82582"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M129.51,56.59c-.93-.72-2.04-1.17-3.21-1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-022e325b-51a5-4e1e-9201-f9f01079a8f2"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M104.36,77.85c.26,2.62,2.59,4.54,5.21,4.28.57-.06,1.13-.21,1.64-.47"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-40e46d50-7dd5-4491-9553-1676e57fdde7"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M111.22,53.6c-3.43-.34-6.49,2.16-6.83,5.59-.02.21-.03.41-.03.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-19b12ee3-8992-4f07-b56c-25b15ced76ff"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M111.45,83.86c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4315edf9-79d0-4539-a2b7-4f4ec978efbe"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M113.52,49.73c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ffcb1b1b-c646-415c-985e-96cf97e6b52d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M128.71,75.46c4.13-4.53,4.14-11.47.01-16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-39b561d6-2aad-4d9d-be46-3497ac142407"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M131.69,77.72c5.15-5.87,5.16-14.65.01-20.53"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-939df4f8-3728-4750-bdb3-b2b31e9b5c82"
                    data-name="LINE"
                  >
                    <line
                      x1="128.91"
                      y1="77.95"
                      x2="128.91"
                      y2="77.95"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-fd848759-cd28-4102-a124-93fcaf9ff0db"
                    data-name="LINE"
                  >
                    <line
                      x1="128.92"
                      y1="56.96"
                      x2="128.92"
                      y2="56.96"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ca012140-5438-4f44-86d4-06cf52ca4970"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M128.91,77.95c.75.71,1.93.68,2.65-.07.05-.05.09-.1.13-.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c817b837-7109-4f7a-b363-89038e0a5bbe"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M128.71,75.46c-.58.76-.49,1.83.2,2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e4225eb0-7b94-413e-8150-30d0055be05b"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M128.92,56.96c-.69.66-.78,1.73-.2,2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3bb89a01-2920-4671-8c04-780a9a430e26"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M131.7,57.19c-.63-.82-1.8-.98-2.62-.36-.05.04-.11.09-.16.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0df1e8a7-438b-4b85-95b1-0864881506ec"
                    data-name="LINE"
                  >
                    <line
                      x1="126.02"
                      y1="79.64"
                      x2="126.28"
                      y2="79.61"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1d9886e6-f392-4d5e-910d-57ed73c3edff"
                    data-name="LINE"
                  >
                    <line
                      x1="111.38"
                      y1="53.62"
                      x2="111.22"
                      y2="53.6"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3cbe6a84-d401-489d-9478-7fbf44a17aab"
                    data-name="LINE"
                  >
                    <line
                      x1="124.71"
                      y1="51.04"
                      x2="113.52"
                      y2="49.73"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-732702f6-5e4b-4932-bfcc-4588a6bd1ac8"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M126.39,53.09c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-63b7d4a6-319e-4411-ad78-27c5bf3ccbd7"
                    data-name="LINE"
                  >
                    <line
                      x1="126.24"
                      y1="54.59"
                      x2="126.39"
                      y2="53.09"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-07c7be47-e076-4047-bf1e-edd8c8a7c3db"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M124.19,56.26c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-6aa4aae3-9d37-4384-b301-d9333088c534"
                    data-name="LINE"
                  >
                    <line
                      x1="112.99"
                      y1="54.96"
                      x2="124.19"
                      y2="56.26"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9b4b4f5c-32a8-42ab-8518-8ae4b0c63a9e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M111.32,52.91c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-cf3a0efb-3d6c-480a-90da-c6e0a395ac33"
                    data-name="LINE"
                  >
                    <line
                      x1="111.47"
                      y1="51.41"
                      x2="111.32"
                      y2="52.91"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-88955991-c7b7-4196-a74b-3907f2d825d6"
                    data-name="LINE"
                  >
                    <line
                      x1="124.7"
                      y1="83.88"
                      x2="113.5"
                      y2="85.54"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-390c1aa3-f461-4762-af29-ad4b943e9c72"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M124.7,83.88c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-99637503-d176-4e03-94ab-899018c5ccd8"
                    data-name="LINE"
                  >
                    <line
                      x1="126.22"
                      y1="80.32"
                      x2="126.37"
                      y2="81.83"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1f45d000-d34e-4170-afdf-bbf59103f043"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M126.22,80.32c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0da3a7f2-f870-4ad8-8fd6-09dd7e13f678"
                    data-name="LINE"
                  >
                    <line
                      x1="112.98"
                      y1="80.31"
                      x2="124.17"
                      y2="78.65"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8e05af53-db91-4b5b-a20d-7d21061211e5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M112.98,80.31c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-76304e55-3ef2-428b-8fcc-8ff4a6d5b32a"
                    data-name="LINE"
                  >
                    <line
                      x1="111.45"
                      y1="83.86"
                      x2="111.3"
                      y2="82.36"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-254131c8-9fd4-4772-a4d2-d07a1de96c0c"
              data-name="silla_3"
            >
              <g
                className={getColorForSilla(3)}
                id="uuid-4c8407f1-bb25-4f2a-9ed3-b8691982e39f"
                data-name="rellena"
              >
                <path d="M9.8,80.08s-3.09-.71-3.41-1.4l.79-.75.33-1.33-1.37-2.07-1.67-3.25-.4-2.37.11-2.98.48-2.33,1.48-2.84,1.04-.98s.22-1.41.22-1.48-.46-.72-.46-.72l-.56-.52,1.03-.73.99-.4,1.06-.24.41-.1,1.05.92,11.99-1.52s.99-.55,1.08-.68.36-.66.36-.66l.71-.18,1.26-.3,1.49.09,1.51.62,1.04.89.87,1.43s.35,1.08.3,1.25,0,18.26,0,18.26l-.09.84-.41,1.38-.61,1.11-.95,1.07-1.18.84-1.47.72-1.8.05h-.52l-.23-.55-.67-.63-1.92-.32-9.81-1.17h-.68s-.83.3-.83.3l-.54.76Z" />
                <path d="M10.99,84.2l11.1,1.35s2.21.01,2.29-1.47l.19-1.81s.02-1.55-1.33-1.89l-11.39-1.36s-1.76-.21-2.16,1.39c0,0-1.07,3.36,1.29,3.79Z" />
                <path d="M22.9,54.96s1.95-.06,1.69-2.54c0,0,.08-2.84-2.25-2.68l-7.75,1.16-3.67.55s-1.5.39-1.41,1.68l.2,2.08s.12,1.53,2.35,1.37l8.15-1.13,2.7-.48Z" />
                <path d="M4.97,78.68s-1.69-1.07-3.1-4.09c0,0-1.69-3.78-1.54-6.78,0,0-.21-4.64,2.89-9.04,0,0,1.76-2.86,3.16-1.75,0,0,1.5.37,1.09,2.23l-.38.66-.69.85-.82,1.27-.57,1.18-.42,1.16-.4,1.54-.11,1.66v1.33l.34,1.74.67,1.98,1.06,1.9,1.11,1.42.26.65.03.73-.36.75-.46.42-.76.32h-.82l-.17-.14Z" />
              </g>
              <g
                id="uuid-c6515095-2418-4aba-91ce-ff9fe074dad5"
                data-name="borde"
              >
                <g
                  id="uuid-d02adf16-6e63-42d6-a145-afbf34401bcd"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-34ebb6fe-f948-430e-8f1e-de3bfefae8e6"
                    data-name="LINE"
                  >
                    <line
                      x1="31.52"
                      y1="75.45"
                      x2="31.52"
                      y2="57.42"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5cacf5da-7556-4ec8-96a7-4acd8dafd2fd"
                    data-name="LINE"
                  >
                    <line
                      x1="24.67"
                      y1="53.6"
                      x2="24.51"
                      y2="53.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8adfe880-c054-40c3-9f68-c134bcdb73d6"
                    data-name="LINE"
                  >
                    <line
                      x1="9.59"
                      y1="79.96"
                      x2="9.85"
                      y2="79.99"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2654b81c-8a91-4990-a968-4360f7302449"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M9.6,55.65c-1.17.12-2.29.56-3.21,1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d14f94e7-eac5-40b8-9b8f-ae2604c7d0f4"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M6.37,78.68c.93.72,2.04,1.17,3.21,1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9c60fb48-4ed0-471f-a51f-a8afde397661"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M31.52,57.42c-.26-2.62-2.59-4.54-5.21-4.28-.57.06-1.13.21-1.64.47"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9bb03a16-d939-4296-9545-7192775dfc7a"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M24.66,81.66c3.43.34,6.49-2.16,6.83-5.59.02-.21.03-.41.03-.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-aea9c5a2-484e-4d11-8464-fc5bc1611b9f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M24.43,51.4c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-63a38504-62d7-4917-bc4b-64b46dc978b8"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M22.36,85.54c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8ca0928f-eec2-45e9-ac49-4247aa6c8b5e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M7.17,59.81c-4.13,4.53-4.14,11.47-.01,16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-926e0a73-917d-44ec-af94-bec41fa06e66"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M4.19,57.54c-5.15,5.87-5.16,14.65-.01,20.53"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-983915b5-5de7-4755-a2c9-58a673a9e50f"
                    data-name="LINE"
                  >
                    <line
                      x1="6.97"
                      y1="57.32"
                      x2="6.97"
                      y2="57.32"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-fb338ca4-ad09-4b56-9b0a-23e04dc079a3"
                    data-name="LINE"
                  >
                    <line
                      x1="6.96"
                      y1="78.3"
                      x2="6.96"
                      y2="78.3"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ddc26331-7f2d-401f-bb06-4f58454e75ce"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M6.97,57.32c-.75-.71-1.93-.68-2.65.07-.05.05-.09.1-.13.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2c3681a1-95f6-434b-a3ca-cc4135924fad"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M7.17,59.81c.58-.76.49-1.83-.2-2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5b3ffc2c-250a-48d0-92f4-593c945365f9"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M6.96,78.3c.69-.66.78-1.73.2-2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d752a5b5-9f5b-487e-948a-d2d6ae1cbcd7"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M4.18,78.08c.63.82,1.8.98,2.62.36.05-.04.11-.09.16-.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5be46592-4189-45cf-b731-4bc4d07f4cad"
                    data-name="LINE"
                  >
                    <line
                      x1="9.86"
                      y1="55.63"
                      x2="9.6"
                      y2="55.65"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-78c1f06d-eadc-4e9e-a5fc-f1df0129af45"
                    data-name="LINE"
                  >
                    <line
                      x1="24.5"
                      y1="81.64"
                      x2="24.66"
                      y2="81.66"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b2bbc066-8b9b-4766-88e6-ba8f64353db1"
                    data-name="LINE"
                  >
                    <line
                      x1="11.17"
                      y1="84.23"
                      x2="22.36"
                      y2="85.54"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-829958c8-d9f2-43dc-84e9-7c1697c6dd9e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M9.49,82.18c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-6f4efb58-5e63-49f3-81cd-5b7ad352ec9b"
                    data-name="LINE"
                  >
                    <line
                      x1="9.64"
                      y1="80.68"
                      x2="9.49"
                      y2="82.18"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e07987fb-7594-4e22-8b79-0da000663dcc"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M11.69,79c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-45f7350d-afc4-4b61-b5c9-cf4cdf3b0000"
                    data-name="LINE"
                  >
                    <line
                      x1="22.89"
                      y1="80.31"
                      x2="11.69"
                      y2="79"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-63d8cb1f-4a18-49cf-8eae-120b9b5e5b23"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M24.56,82.36c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5a4e9d3e-8160-4ed1-a732-e95c46aa1ecc"
                    data-name="LINE"
                  >
                    <line
                      x1="24.41"
                      y1="83.86"
                      x2="24.56"
                      y2="82.36"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d4410697-b625-448c-8a43-a1bd6eec1acb"
                    data-name="LINE"
                  >
                    <line
                      x1="11.18"
                      y1="51.39"
                      x2="22.38"
                      y2="49.73"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-913047c1-c162-4189-8663-7c43a0e8c998"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M11.18,51.39c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-05f246d9-4ce7-4130-807a-a3a23e98d139"
                    data-name="LINE"
                  >
                    <line
                      x1="9.66"
                      y1="54.94"
                      x2="9.51"
                      y2="53.44"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a107a5d1-1b95-47b9-a727-2c0435409e7f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M9.66,54.94c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-aca8983d-4886-46c2-a6bb-a635206f6cad"
                    data-name="LINE"
                  >
                    <line
                      x1="22.9"
                      y1="54.96"
                      x2="11.71"
                      y2="56.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-39ad6a32-c71f-412c-ba7e-edb93b3b1e84"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M22.9,54.96c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7f0445fd-c762-4b7b-a246-1c1ebfd2158b"
                    data-name="LINE"
                  >
                    <line
                      x1="24.43"
                      y1="51.4"
                      x2="24.58"
                      y2="52.91"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <rect
              id="uuid-582e4800-8d71-413f-9857-bfae63643f90"
              data-name="mesa"
              x="41.06"
              y="40.88"
              width="53.5"
              height="53.5"
              rx="1.49"
              ry="1.49"
              style={{
                fill: "none",
                stroke: "#1d1d1b",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: ".68px",
              }}
            />
          </g>
        </g>
      </svg>
    </picture>
  );
};

export const MesasSelectorx6 = ({
  index = 0,
  colorRelleno = "fill-secondary",
  strokeSecondary = "var(--secondary)",
  strokeDark = "var(--dark)",
}) => {
  // Función para determinar el color de relleno de cada silla
  const getColorForSilla = (sillaNumber) => {
    return sillaNumber < index ? colorRelleno : "fill-[#ffffff00]";
  };

  // Función para determinar el color del stroke de cada silla
  const getStrokeForSilla = (sillaNumber) => {
    return sillaNumber < index ? strokeSecondary : strokeDark;
  };

  return (
    <picture>
      <svg
        id="uuid-933c0d02-4a1d-4b6c-9df8-9829b03ad05a"
        data-name="Capa 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 189.4 135.72"
        className="size-full object-contain inline-block"
      >
        <g id="uuid-7287607d-f5db-4e05-be0e-0c74502f15a1" data-name="Capa 1">
          <g id="uuid-cc05b73c-2df0-4902-83c6-b8bb5ff43860" data-name="mesax6">
            <g
              id="uuid-4fe96b91-7c70-4c34-8843-f6e38c5d0092"
              data-name="silla_0"
            >
              <g
                id="uuid-4ae798cf-d63a-4da6-abd7-7096922f5931"
                data-name="rellena"
                className={getColorForSilla(0)}
              >
                <path d="M55.36,9.8s.71-3.09,1.4-3.41l.75.79,1.33.33,2.07-1.37,3.25-1.67,2.37-.4,2.98.11,2.33.48,2.84,1.48.98,1.04s1.41.22,1.48.22.72-.46.72-.46l.52-.56.73,1.03.4.99.24,1.06.1.41-.92,1.05,1.52,11.99s.55.99.68,1.08.66.36.66.36l.18.71.3,1.26-.09,1.49-.62,1.51-.89,1.04-1.43.87s-1.08.35-1.25.3-18.26,0-18.26,0l-.84-.09-1.38-.41-1.11-.61-1.07-.95-.84-1.18-.72-1.47-.05-1.8v-.52l.55-.23.63-.67.32-1.92,1.17-9.81v-.68s-.3-.83-.3-.83l-.76-.54Z" />
                <path d="M51.25,10.99l-1.35,11.1s-.01,2.21,1.47,2.29l1.81.19s1.55.02,1.89-1.33l1.36-11.39s.21-1.76-1.39-2.16c0,0-3.36-1.07-3.79,1.29Z" />
                <path d="M80.49,22.9s.06,1.95,2.54,1.69c0,0,2.84.08,2.68-2.25l-1.16-7.75-.55-3.67s-.39-1.5-1.68-1.41l-2.08.2s-1.53.12-1.37,2.35l1.13,8.15.48,2.7Z" />
                <path d="M56.77,4.97s1.07-1.69,4.09-3.1c0,0,3.78-1.69,6.78-1.54,0,0,4.64-.21,9.04,2.89,0,0,2.86,1.76,1.75,3.16,0,0-.37,1.5-2.23,1.09l-.66-.38-.85-.69-1.27-.82-1.18-.57-1.16-.42-1.54-.4-1.66-.11h-1.33l-1.74.34-1.98.67-1.9,1.06-1.42,1.11-.65.26-.73.03-.75-.36-.42-.46-.32-.76v-.82l.14-.17Z" />
              </g>
              <g
                id="uuid-a676b8d0-d724-4962-b2b7-974129401a4a"
                data-name="borde"
              >
                <g
                  id="uuid-dd57f6cd-d767-4ef1-adba-6e32e9949178"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-f5bbbc18-b974-4135-878e-9c5adb40b161"
                    data-name="LINE"
                  >
                    <line
                      x1="59.99"
                      y1="31.52"
                      x2="78.03"
                      y2="31.52"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-689632e1-02ff-4431-a986-aeb0f3dd8dae"
                    data-name="LINE"
                  >
                    <line
                      x1="81.84"
                      y1="24.67"
                      x2="81.82"
                      y2="24.51"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-00ef3f06-7d04-4136-a6a0-d55d14410518"
                    data-name="LINE"
                  >
                    <line
                      x1="55.48"
                      y1="9.59"
                      x2="55.45"
                      y2="9.85"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-915ae1cd-e7de-432d-a16e-bb3db34ee430"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M79.79,9.6c-.12-1.17-.56-2.29-1.29-3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-dbe1ff88-4869-4d92-877c-64301d9ea78a"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M56.77,6.37c-.72.93-1.17,2.04-1.29,3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-232ad05c-43bc-42dc-ad1b-38b537d191c5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.03,31.52c2.62-.26,4.54-2.59,4.28-5.21-.06-.57-.21-1.13-.47-1.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-38bcf2eb-d6d5-4ab2-8cb6-9fb9b3c8f1da"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M53.79,24.66c-.34,3.43,2.16,6.49,5.59,6.83.21.02.41.03.62.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-525ba557-680a-4102-a38a-af0fcb7d13b9"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M84.04,24.43c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d8d34d96-cbad-4a4b-af03-b5065072134e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M49.91,22.36c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e194e341-1f8b-46ce-8505-db4d68d1a1b2"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M75.64,7.17c-4.53-4.13-11.47-4.14-16-.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-79420b40-2f32-441b-98a8-a5bd78f03ead"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M77.9,4.19c-5.87-5.15-14.65-5.16-20.53-.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d662012b-03b8-4fc3-97f9-7278801e6404"
                    data-name="LINE"
                  >
                    <line
                      x1="78.13"
                      y1="6.97"
                      x2="78.13"
                      y2="6.97"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e835d4ed-4fca-46b7-aec9-1b4769a5fc4f"
                    data-name="LINE"
                  >
                    <line
                      x1="57.14"
                      y1="6.96"
                      x2="57.14"
                      y2="6.96"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-bbddde9e-5556-4bfc-bc07-609be436167d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.13,6.97c.71-.75.68-1.93-.07-2.65-.05-.05-.1-.09-.16-.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-91ebe5ff-cf83-4a4d-96b3-a6109676f40c"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M75.64,7.17c.76.58,1.83.49,2.49-.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0b5aecba-6786-4b27-a577-73503fb9eb93"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.14,6.96c.66.69,1.73.78,2.49.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-81728918-4fe2-47d5-94a5-ce3f33f9a051"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.37,4.18c-.82.63-.98,1.8-.36,2.62.04.05.09.11.13.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f0247616-b8a3-4fc3-8f4a-41f9a624ce98"
                    data-name="LINE"
                  >
                    <line
                      x1="79.82"
                      y1="9.86"
                      x2="79.79"
                      y2="9.6"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-47cab587-b8d9-4d21-a6f1-12403a987711"
                    data-name="LINE"
                  >
                    <line
                      x1="53.8"
                      y1="24.5"
                      x2="53.79"
                      y2="24.66"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b5e6f920-85bc-449d-a4bd-784e3d5ac69d"
                    data-name="LINE"
                  >
                    <line
                      x1="51.22"
                      y1="11.17"
                      x2="49.91"
                      y2="22.36"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7d3e3c75-2951-4223-8106-ec14a1367905"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M53.27,9.49c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e94b200e-dbe4-480e-955f-07fa8ba5b40b"
                    data-name="LINE"
                  >
                    <line
                      x1="54.77"
                      y1="9.64"
                      x2="53.27"
                      y2="9.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8cad169e-3035-4200-a77d-6a91e7ebca0a"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M56.44,11.69c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-948c3f71-e615-4ba2-837b-018b37dd41a0"
                    data-name="LINE"
                  >
                    <line
                      x1="55.14"
                      y1="22.89"
                      x2="56.44"
                      y2="11.69"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-96a90234-8dd4-45a0-ab72-730508a79aae"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M53.09,24.56c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-bf4dbd96-72d1-4682-b762-03c6c7562328"
                    data-name="LINE"
                  >
                    <line
                      x1="51.59"
                      y1="24.41"
                      x2="53.09"
                      y2="24.56"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-80e47233-569b-49fd-b414-4db03a8ff0ba"
                    data-name="LINE"
                  >
                    <line
                      x1="84.06"
                      y1="11.18"
                      x2="85.72"
                      y2="22.38"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0ec2378f-a3df-45f5-ac1c-1e9b8f183168"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M84.06,11.18c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b22be586-4549-4af6-9fd5-016815b5bcba"
                    data-name="LINE"
                  >
                    <line
                      x1="80.5"
                      y1="9.66"
                      x2="82.01"
                      y2="9.51"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d04436f6-62ac-4fa3-afe9-84e0dde5e9d5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M80.5,9.66c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c1ae9041-4e98-405f-af69-2fdb252fb004"
                    data-name="LINE"
                  >
                    <line
                      x1="80.49"
                      y1="22.9"
                      x2="78.83"
                      y2="11.71"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-19d149a7-b4dc-48fd-8461-a76cbe265f08"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M80.49,22.9c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-6033d8be-0ae0-4c86-92e5-2a91fd5017af"
                    data-name="LINE"
                  >
                    <line
                      x1="84.04"
                      y1="24.43"
                      x2="82.54"
                      y2="24.58"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(0),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-9e771256-dadc-4836-97e9-b14a9972a229"
              data-name="silla_1"
            >
              <g
                id="uuid-19eea99b-3779-4800-b46c-ccf12331817d"
                data-name="rellena"
                className={getColorForSilla(1)}
              >
                <path d="M80.26,125.85s-.71,3.09-1.4,3.41l-.75-.79-1.33-.33-2.07,1.37-3.25,1.67-2.37.4-2.98-.11-2.33-.48-2.84-1.48-.98-1.04s-1.41-.22-1.48-.22-.72.46-.72.46l-.52.56-.73-1.03-.4-.99-.24-1.06-.1-.41.92-1.05-1.52-11.99s-.55-.99-.68-1.08-.66-.36-.66-.36l-.18-.71-.3-1.26.09-1.49.62-1.51.89-1.04,1.43-.87s1.08-.35,1.25-.3,18.26,0,18.26,0l.84.09,1.38.41,1.11.61,1.07.95.84,1.18.72,1.47.05,1.8v.52l-.55.23-.63.67-.32,1.92-1.17,9.81v.68s.3.83.3.83l.76.54Z" />
                <path d="M84.38,124.66l1.35-11.1s.01-2.21-1.47-2.29l-1.81-.19s-1.55-.02-1.89,1.33l-1.36,11.39s-.21,1.76,1.39,2.16c0,0,3.36,1.07,3.79-1.29Z" />
                <path d="M55.14,112.75s-.06-1.95-2.54-1.69c0,0-2.84-.08-2.68,2.25l1.16,7.75.55,3.67s.39,1.5,1.68,1.41l2.08-.2s1.53-.12,1.37-2.35l-1.13-8.15-.48-2.7Z" />
                <path d="M78.86,130.68s-1.07,1.69-4.09,3.1c0,0-3.78,1.69-6.78,1.54,0,0-4.64.21-9.04-2.89,0,0-2.86-1.76-1.75-3.16,0,0,.37-1.5,2.23-1.09l.66.38.85.69,1.27.82,1.18.57,1.16.42,1.54.4,1.66.11h1.33l1.74-.34,1.98-.67,1.9-1.06,1.42-1.11.65-.26.73-.03.75.36.42.46.32.76v.82l-.14.17Z" />
              </g>
              <g
                id="uuid-bf7944f7-8b63-46b0-9291-8ded6f3f479c"
                data-name="borde"
              >
                <g
                  id="uuid-a219885c-f8ad-4e98-b3c6-1bff4c185ab4"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-d7cce942-95d3-47a4-b479-4c65faed6e4c"
                    data-name="LINE"
                  >
                    <line
                      x1="75.63"
                      y1="104.13"
                      x2="57.6"
                      y2="104.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-30427269-4059-4287-a2dd-83e254ee4303"
                    data-name="LINE"
                  >
                    <line
                      x1="53.78"
                      y1="110.98"
                      x2="53.8"
                      y2="111.14"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-32c0d282-491e-4788-9ad0-682ec19b09c2"
                    data-name="LINE"
                  >
                    <line
                      x1="80.14"
                      y1="126.06"
                      x2="80.17"
                      y2="125.8"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2f1cd7f1-c60d-4440-b65f-9190c249d683"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M55.83,126.05c.12,1.17.56,2.29,1.29,3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9fb04912-2e04-45b1-bf38-554979ce27cb"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.86,129.27c.72-.93,1.17-2.04,1.29-3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8317d6a2-c34d-419e-8f48-da6f418be81d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.6,104.13c-2.62.26-4.54,2.59-4.28,5.21.06.57.21,1.13.47,1.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9c4088ac-cc99-4bf4-9e97-4fbfcbdc3985"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M81.84,110.99c.34-3.43-2.16-6.49-5.59-6.83-.21-.02-.41-.03-.62-.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8f830ab0-5ae3-435a-ae23-291cff0d10f8"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M51.59,111.22c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a0461944-29af-42cd-b501-f176b3a93c51"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M85.72,113.28c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c7da2182-8ba7-4511-96ee-9dcea83a2c41"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M59.99,128.47c4.53,4.13,11.47,4.14,16,.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b1e4ae68-3f4b-4cdf-a9a7-439e96fbd301"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.72,131.46c5.87,5.15,14.65,5.16,20.53.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-8fc14500-a356-4b97-9024-8cfae675dfae"
                    data-name="LINE"
                  >
                    <line
                      x1="57.5"
                      y1="128.68"
                      x2="57.5"
                      y2="128.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3e29996b-f9fa-4687-8bb3-093de5fa268c"
                    data-name="LINE"
                  >
                    <line
                      x1="78.48"
                      y1="128.69"
                      x2="78.48"
                      y2="128.69"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-bd41348e-78b8-4a00-a7ca-d1bc2c08daac"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M57.5,128.68c-.71.75-.68,1.93.07,2.65.05.05.1.09.16.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e857e3bf-4183-4638-9cb9-91325c045c43"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M59.99,128.47c-.76-.58-1.83-.49-2.49.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c39ee34c-bc2d-4e1e-b6f8-f6d22784cafc"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.48,128.69c-.66-.69-1.73-.78-2.49-.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-93cf972f-5c04-414e-8ec3-1fbf6a5d8d06"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M78.26,131.47c.82-.63.98-1.8.36-2.62-.04-.05-.09-.11-.13-.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ccae1cb0-49cc-41b2-971a-d5b6018ce65d"
                    data-name="LINE"
                  >
                    <line
                      x1="55.81"
                      y1="125.78"
                      x2="55.83"
                      y2="126.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1b1aa882-7079-4949-8c06-ce36e9327aa6"
                    data-name="LINE"
                  >
                    <line
                      x1="81.82"
                      y1="111.15"
                      x2="81.84"
                      y2="110.99"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b2c5b7ff-77af-4ee4-aa9e-b370dd622966"
                    data-name="LINE"
                  >
                    <line
                      x1="84.41"
                      y1="124.48"
                      x2="85.72"
                      y2="113.28"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-31131923-bb4c-418f-828c-16e45b59194d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M82.36,126.15c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-577b5cec-0602-485c-9673-2ac268b7d7b5"
                    data-name="LINE"
                  >
                    <line
                      x1="80.86"
                      y1="126"
                      x2="82.36"
                      y2="126.15"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5118265b-faca-41e8-af71-1600e62359e1"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M79.18,123.95c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e9a70913-5725-44af-9da8-17c385205458"
                    data-name="LINE"
                  >
                    <line
                      x1="80.49"
                      y1="112.76"
                      x2="79.18"
                      y2="123.95"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7f9793ef-025d-4933-8d1d-848870a86560"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M82.54,111.08c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-febd5104-2378-4c91-90a9-b41ce9eb73c1"
                    data-name="LINE"
                  >
                    <line
                      x1="84.04"
                      y1="111.23"
                      x2="82.54"
                      y2="111.08"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-40ad731c-a5be-4dd8-a2d4-9a4aa4cb8073"
                    data-name="LINE"
                  >
                    <line
                      x1="51.57"
                      y1="124.46"
                      x2="49.91"
                      y2="113.27"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d799aec4-faba-48b5-8ee4-feec2ee843de"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M51.57,124.46c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9e362297-109a-46ac-8f55-5ba518e0844d"
                    data-name="LINE"
                  >
                    <line
                      x1="55.12"
                      y1="125.99"
                      x2="53.62"
                      y2="126.14"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-05f06577-e042-4044-8053-6715543ed600"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M55.12,125.99c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-79f93cc9-f2c7-4b2d-9e2e-ae0f97cb8e13"
                    data-name="LINE"
                  >
                    <line
                      x1="55.14"
                      y1="112.75"
                      x2="56.8"
                      y2="123.94"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5e605bdd-1e2a-45df-89c1-f3eba000da8d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M55.14,112.75c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-cef5761e-d474-47a1-949b-35a3ec8d752b"
                    data-name="LINE"
                  >
                    <line
                      x1="51.59"
                      y1="111.22"
                      x2="53.09"
                      y2="111.07"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(1),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-49c8d70c-3439-4fc2-b478-e53c85855b08"
              data-name="silla_2"
            >
              <g
                id="uuid-ddfa39b4-5978-472b-afc3-3d9989bfc2e9"
                data-name="rellena"
                className={getColorForSilla(2)}
              >
                <path d="M9.8,80.08s-3.09-.71-3.41-1.4l.79-.75.33-1.33-1.37-2.07-1.67-3.25-.4-2.37.11-2.98.48-2.33,1.48-2.84,1.04-.98s.22-1.41.22-1.48-.46-.72-.46-.72l-.56-.52,1.03-.73.99-.4,1.06-.24.41-.1,1.05.92,11.99-1.52s.99-.55,1.08-.68.36-.66.36-.66l.71-.18,1.26-.3,1.49.09,1.51.62,1.04.89.87,1.43s.35,1.08.3,1.25,0,18.26,0,18.26l-.09.84-.41,1.38-.61,1.11-.95,1.07-1.18.84-1.47.72-1.8.05h-.52l-.23-.55-.67-.63-1.92-.32-9.81-1.17h-.68s-.83.3-.83.3l-.54.76Z" />
                <path d="M10.99,84.2l11.1,1.35s2.21.01,2.29-1.47l.19-1.81s.02-1.55-1.33-1.89l-11.39-1.36s-1.76-.21-2.16,1.39c0,0-1.07,3.36,1.29,3.79Z" />
                <path d="M22.9,54.96s1.95-.06,1.69-2.54c0,0,.08-2.84-2.25-2.68l-7.75,1.16-3.67.55s-1.5.39-1.41,1.68l.2,2.08s.12,1.53,2.35,1.37l8.15-1.13,2.7-.48Z" />
                <path d="M4.97,78.68s-1.69-1.07-3.1-4.09c0,0-1.69-3.78-1.54-6.78,0,0-.21-4.64,2.89-9.04,0,0,1.76-2.86,3.16-1.75,0,0,1.5.37,1.09,2.23l-.38.66-.69.85-.82,1.27-.57,1.18-.42,1.16-.4,1.54-.11,1.66v1.33l.34,1.74.67,1.98,1.06,1.9,1.11,1.42.26.65.03.73-.36.75-.46.42-.76.32h-.82l-.17-.14Z" />
              </g>
              <g
                id="uuid-7cc6a800-e35b-443e-8f26-3e322542dec8"
                data-name="borde"
              >
                <g
                  id="uuid-0bf8bad5-ec0d-410b-adf6-761b6fb4246e"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-7955334d-56a1-4545-9049-5c192391d6dc"
                    data-name="LINE"
                  >
                    <line
                      x1="31.52"
                      y1="75.45"
                      x2="31.52"
                      y2="57.42"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3ab325fc-b83d-4ae9-bf41-695d8b71a46f"
                    data-name="LINE"
                  >
                    <line
                      x1="24.67"
                      y1="53.6"
                      x2="24.51"
                      y2="53.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0c215c5c-15b5-4c56-afe2-75ff2689aee8"
                    data-name="LINE"
                  >
                    <line
                      x1="9.59"
                      y1="79.96"
                      x2="9.85"
                      y2="79.99"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-94cba903-fe55-4c5c-9b52-99c4dd6eae4e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M9.6,55.65c-1.17.12-2.29.56-3.21,1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4d5fc5bc-6308-4beb-b611-343da7fea10e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M6.37,78.68c.93.72,2.04,1.17,3.21,1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9516ec46-1687-4dd8-83aa-5b14e670cf06"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M31.52,57.42c-.26-2.62-2.59-4.54-5.21-4.28-.57.06-1.13.21-1.64.47"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-206a880a-e8b4-4f17-99d3-5c59b9d806ce"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M24.66,81.66c3.43.34,6.49-2.16,6.83-5.59.02-.21.03-.41.03-.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e72ed6e8-24b9-47c5-a404-419c0916bcd8"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M24.43,51.4c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9d4e3651-b1ab-401a-9128-e2c48e2f6d0d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M22.36,85.54c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-31cc378f-eb0a-480d-b936-0e93b0731ba2"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M7.17,59.81c-4.13,4.53-4.14,11.47-.01,16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a4050186-8ac5-4c33-9228-a4c43e643265"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M4.19,57.54c-5.15,5.87-5.16,14.65-.01,20.53"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a8108d15-371a-4e95-b17f-c70ef2d1e825"
                    data-name="LINE"
                  >
                    <line
                      x1="6.97"
                      y1="57.32"
                      x2="6.97"
                      y2="57.32"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-322253bd-bd6d-4889-8c93-cdd03a6d5a0a"
                    data-name="LINE"
                  >
                    <line
                      x1="6.96"
                      y1="78.3"
                      x2="6.96"
                      y2="78.3"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e60cb203-9c46-4311-b9ab-7fb99cd4f450"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M6.97,57.32c-.75-.71-1.93-.68-2.65.07-.05.05-.09.1-.13.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-dd23712f-4e59-4218-be36-66a1153696ce"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M7.17,59.81c.58-.76.49-1.83-.2-2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-946369a4-422e-426e-b4f9-9d2cfe50e180"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M6.96,78.3c.69-.66.78-1.73.2-2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2d280b7f-f7d2-4419-ad52-9f237b71929a"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M4.18,78.08c.63.82,1.8.98,2.62.36.05-.04.11-.09.16-.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9567d3b4-0f49-47f5-b0eb-28bcb31d0aab"
                    data-name="LINE"
                  >
                    <line
                      x1="9.86"
                      y1="55.63"
                      x2="9.6"
                      y2="55.65"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-796a8d86-50c6-4aee-87b2-86f092cb26d2"
                    data-name="LINE"
                  >
                    <line
                      x1="24.5"
                      y1="81.64"
                      x2="24.66"
                      y2="81.66"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-73889262-a30a-481a-a468-79a24dc6b987"
                    data-name="LINE"
                  >
                    <line
                      x1="11.17"
                      y1="84.23"
                      x2="22.36"
                      y2="85.54"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0d803204-44b6-4f08-a13b-2b5dc5a1e49e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M9.49,82.18c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e821b952-635d-43e0-ae3b-dcaf7d7861a9"
                    data-name="LINE"
                  >
                    <line
                      x1="9.64"
                      y1="80.68"
                      x2="9.49"
                      y2="82.18"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-75105105-fe09-4a19-b5b4-fe62da1226b7"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M11.69,79c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-14ded4bf-19be-4cb1-b105-3a2fd4c25da3"
                    data-name="LINE"
                  >
                    <line
                      x1="22.89"
                      y1="80.31"
                      x2="11.69"
                      y2="79"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-796c2ef7-a07b-4eb6-8680-53c02e37da95"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M24.56,82.36c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-232b311a-4a29-448e-99cd-23e9beebe197"
                    data-name="LINE"
                  >
                    <line
                      x1="24.41"
                      y1="83.86"
                      x2="24.56"
                      y2="82.36"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-6419e95f-b503-409c-8dcc-3a3c699398c7"
                    data-name="LINE"
                  >
                    <line
                      x1="11.18"
                      y1="51.39"
                      x2="22.38"
                      y2="49.73"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d6b21ab7-9727-43cc-bb4d-3f35605ead69"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M11.18,51.39c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-388213ad-98aa-411b-9695-421f3081dddb"
                    data-name="LINE"
                  >
                    <line
                      x1="9.66"
                      y1="54.94"
                      x2="9.51"
                      y2="53.44"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-580c4164-54a4-4f25-8026-41d0bcc9654b"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M9.66,54.94c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-47a97bcf-f682-41ae-9fcb-78ed9b1950ff"
                    data-name="LINE"
                  >
                    <line
                      x1="22.9"
                      y1="54.96"
                      x2="11.71"
                      y2="56.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e88aabb7-4eb6-47a5-93e0-93fad0e565e4"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M22.9,54.96c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9d40225d-bdc0-4f85-a5ea-f8760d212ed4"
                    data-name="LINE"
                  >
                    <line
                      x1="24.43"
                      y1="51.4"
                      x2="24.58"
                      y2="52.91"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(2),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <rect
              id="uuid-edbc6893-45e5-49df-be88-cee886189d83"
              data-name="mesa"
              x="41.06"
              y="40.88"
              width="107.14"
              height="53.5"
              rx="1.49"
              ry="1.49"
              style={{
                fill: "none",
                stroke: "#1d1d1b",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: ".68px",
              }}
            />
            <g
              id="uuid-3eb93af4-5003-41ce-b196-3cd3dcc88ebd"
              data-name="silla_3"
            >
              <g
                id="uuid-9624935c-6eca-4de1-b726-ec49588b7ba0"
                data-name="rellena"
                className={getColorForSilla(3)}
              >
                <path d="M108.88,9.88s.71-3.09,1.4-3.41l.75.79,1.33.33,2.07-1.37,3.25-1.67,2.37-.4,2.98.11,2.33.48,2.84,1.48.98,1.04s1.41.22,1.48.22.72-.46.72-.46l.52-.56.73,1.03.4.99.24,1.06.1.41-.92,1.05,1.52,11.99s.55.99.68,1.08.66.36.66.36l.18.71.3,1.26-.09,1.49-.62,1.51-.89,1.04-1.43.87s-1.08.35-1.25.3-18.26,0-18.26,0l-.84-.09-1.38-.41-1.11-.61-1.07-.95-.84-1.18-.72-1.47-.05-1.8v-.52l.55-.23.63-.67.32-1.92,1.17-9.81v-.68s-.3-.83-.3-.83l-.76-.54Z" />
                <path d="M104.77,11.06l-1.35,11.1s-.01,2.21,1.47,2.29l1.81.19s1.55.02,1.89-1.33l1.36-11.39s.21-1.76-1.39-2.16c0,0-3.36-1.07-3.79,1.29Z" />
                <path d="M134.01,22.97s.06,1.95,2.54,1.69c0,0,2.84.08,2.68-2.25l-1.16-7.75-.55-3.67s-.39-1.5-1.68-1.41l-2.08.2s-1.53.12-1.37,2.35l1.13,8.15.48,2.7Z" />
                <path d="M110.29,5.04s1.07-1.69,4.09-3.1c0,0,3.78-1.69,6.78-1.54,0,0,4.64-.21,9.04,2.89,0,0,2.86,1.76,1.75,3.16,0,0-.37,1.5-2.23,1.09l-.66-.38-.85-.69-1.27-.82-1.18-.57-1.16-.42-1.54-.4-1.66-.11h-1.33l-1.74.34-1.98.67-1.9,1.06-1.42,1.11-.65.26-.73.03-.75-.36-.42-.46-.32-.76v-.82l.14-.17Z" />
              </g>
              <g
                id="uuid-300786d1-6e12-44d1-b82b-630e5710d548"
                data-name="borde"
              >
                <g
                  id="uuid-e8258aba-0f01-4d0d-a695-63c30594e0ba"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-dd5b1154-6f64-4e5f-98c5-1007c240c79d"
                    data-name="LINE"
                  >
                    <line
                      x1="113.52"
                      y1="31.59"
                      x2="131.55"
                      y2="31.59"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2978f1f9-d795-4893-ae07-046e4c9afcb5"
                    data-name="LINE"
                  >
                    <line
                      x1="135.36"
                      y1="24.74"
                      x2="135.35"
                      y2="24.58"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b670e6db-6420-4bb1-a0c8-9cd478310fcb"
                    data-name="LINE"
                  >
                    <line
                      x1="109"
                      y1="9.66"
                      x2="108.98"
                      y2="9.92"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-05d72fb1-867f-46c5-b1da-5cb46b6d0d39"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M133.31,9.68c-.12-1.17-.56-2.29-1.29-3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5d4ff999-6a2a-4651-ab4d-4af6b5930b4c"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M110.29,6.45c-.72.93-1.17,2.04-1.29,3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d5e9a773-053f-4cea-bfb3-72718bba5e0e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M131.55,31.59c2.62-.26,4.54-2.59,4.28-5.21-.06-.57-.21-1.13-.47-1.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ce1ad8c4-d1d8-4714-ade1-6aabe2b9e0d7"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M107.31,24.73c-.34,3.43,2.16,6.49,5.59,6.83.21.02.41.03.62.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a3afda1a-da68-4426-a6fb-ffdb761ace6d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M137.56,24.5c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-711e6112-38d7-443f-9add-62948f00b01b"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M103.43,22.44c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4ed8140c-a765-4260-a021-9f283f9b3916"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M129.16,7.25c-4.53-4.13-11.47-4.14-16-.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-69524c7a-0dfb-4367-a6c9-40c4aab897df"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M131.42,4.27c-5.87-5.15-14.65-5.16-20.53-.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-559cbec8-fb50-49a4-b375-4064e024f217"
                    data-name="LINE"
                  >
                    <line
                      x1="131.65"
                      y1="7.05"
                      x2="131.65"
                      y2="7.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-82fd9e38-7836-4209-b2fb-d16d6ffc4220"
                    data-name="LINE"
                  >
                    <line
                      x1="110.67"
                      y1="7.03"
                      x2="110.67"
                      y2="7.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-12515d5d-fed0-4c28-bf1a-3c8d683c8abb"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M131.65,7.05c.71-.75.68-1.93-.07-2.65-.05-.05-.1-.09-.16-.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f7a1eda3-136c-45c4-8c0f-2d20d868d81d"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M129.16,7.25c.76.58,1.83.49,2.49-.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-24dc05f4-a4f0-4a7c-a007-0f37ab73cd91"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M110.67,7.03c.66.69,1.73.78,2.49.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-096e38b8-3dcb-4880-97c5-77b4aafc948f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M110.89,4.25c-.82.63-.98,1.8-.36,2.62.04.05.09.11.13.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f450d7e9-41aa-40c1-b206-fb7adabc2083"
                    data-name="LINE"
                  >
                    <line
                      x1="133.34"
                      y1="9.94"
                      x2="133.31"
                      y2="9.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0f8a0449-310e-4b44-86a6-69f207f44df6"
                    data-name="LINE"
                  >
                    <line
                      x1="107.32"
                      y1="24.57"
                      x2="107.31"
                      y2="24.73"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-adff3bac-bea7-4da3-8b18-79edabcf76b2"
                    data-name="LINE"
                  >
                    <line
                      x1="104.74"
                      y1="11.24"
                      x2="103.43"
                      y2="22.44"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c63bfc81-d0b0-4c96-871f-7d283e14a564"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M106.79,9.57c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-efffda09-5659-45e8-b503-28e38e5d0275"
                    data-name="LINE"
                  >
                    <line
                      x1="108.29"
                      y1="9.72"
                      x2="106.79"
                      y2="9.57"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a52c72cd-582c-42ef-80fa-950c19983cf8"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M109.97,11.77c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c400f340-401d-4364-9792-96262d7001f5"
                    data-name="LINE"
                  >
                    <line
                      x1="108.66"
                      y1="22.96"
                      x2="109.97"
                      y2="11.77"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-87c9f1f5-bd5a-4d67-87f6-a4caf6971e62"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M106.61,24.64c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-561e0df5-27b6-4c38-9233-bf81c3404108"
                    data-name="LINE"
                  >
                    <line
                      x1="105.11"
                      y1="24.49"
                      x2="106.61"
                      y2="24.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-79c50b03-32f4-4c54-90b8-2add018f6711"
                    data-name="LINE"
                  >
                    <line
                      x1="137.58"
                      y1="11.26"
                      x2="139.24"
                      y2="22.45"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4f4028b3-bf23-4611-aa25-af3b14e1f64c"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M137.58,11.26c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-fcc1432c-bfa3-4826-86ee-3c4efece4860"
                    data-name="LINE"
                  >
                    <line
                      x1="134.03"
                      y1="9.73"
                      x2="135.53"
                      y2="9.58"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-37ad2753-074b-474b-ac82-4055013be936"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M134.03,9.73c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-dd75e0f1-d83d-4f36-b578-da1465810d25"
                    data-name="LINE"
                  >
                    <line
                      x1="134.01"
                      y1="22.97"
                      x2="132.35"
                      y2="11.78"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-927b5957-ba56-444a-bbef-4100c91a94f9"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M134.01,22.97c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1504e372-ba57-453f-a742-976e17f86555"
                    data-name="LINE"
                  >
                    <line
                      x1="137.56"
                      y1="24.5"
                      x2="136.06"
                      y2="24.65"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(3),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-fd9b8748-ecca-492e-8228-36b7f6c9fd7f"
              data-name="silla_4"
            >
              <g
                id="uuid-154c3539-f51e-47f6-a69e-f984593cd08d"
                data-name="rellena"
                className={getColorForSilla(4)}
              >
                <path d="M133.78,125.92s-.71,3.09-1.4,3.41l-.75-.79-1.33-.33-2.07,1.37-3.25,1.67-2.37.4-2.98-.11-2.33-.48-2.84-1.48-.98-1.04s-1.41-.22-1.48-.22-.72.46-.72.46l-.52.56-.73-1.03-.4-.99-.24-1.06-.1-.41.92-1.05-1.52-11.99s-.55-.99-.68-1.08-.66-.36-.66-.36l-.18-.71-.3-1.26.09-1.49.62-1.51.89-1.04,1.43-.87s1.08-.35,1.25-.3,18.26,0,18.26,0l.84.09,1.38.41,1.11.61,1.07.95.84,1.18.72,1.47.05,1.8v.52l-.55.23-.63.67-.32,1.92-1.17,9.81v.68s.3.83.3.83l.76.54Z" />
                <path d="M137.9,124.73l1.35-11.1s.01-2.21-1.47-2.29l-1.81-.19s-1.55-.02-1.89,1.33l-1.36,11.39s-.21,1.76,1.39,2.16c0,0,3.36,1.07,3.79-1.29Z" />
                <path d="M108.66,112.82s-.06-1.95-2.54-1.69c0,0-2.84-.08-2.68,2.25l1.16,7.75.55,3.67s.39,1.5,1.68,1.41l2.08-.2s1.53-.12,1.37-2.35l-1.13-8.15-.48-2.7Z" />
                <path d="M132.38,130.75s-1.07,1.69-4.09,3.1c0,0-3.78,1.69-6.78,1.54,0,0-4.64.21-9.04-2.89,0,0-2.86-1.76-1.75-3.16,0,0,.37-1.5,2.23-1.09l.66.38.85.69,1.27.82,1.18.57,1.16.42,1.54.4,1.66.11h1.33l1.74-.34,1.98-.67,1.9-1.06,1.42-1.11.65-.26.73-.03.75.36.42.46.32.76v.82l-.14.17Z" />
              </g>
              <g
                id="uuid-1fd492fc-9daa-4f27-a440-cd7a70041a54"
                data-name="borde"
              >
                <g
                  id="uuid-290e1a46-c262-4540-b41c-ce19f22fd8dc"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-8ef4ee17-1da6-4aab-9113-319b73fb0ee2"
                    data-name="LINE"
                  >
                    <line
                      x1="129.15"
                      y1="104.2"
                      x2="111.12"
                      y2="104.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-974b7486-266e-48f0-971f-bee318b467a7"
                    data-name="LINE"
                  >
                    <line
                      x1="107.31"
                      y1="111.05"
                      x2="107.32"
                      y2="111.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-24d930d1-bc5d-46ca-b82b-41aa756afd5f"
                    data-name="LINE"
                  >
                    <line
                      x1="133.67"
                      y1="126.13"
                      x2="133.69"
                      y2="125.87"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-34ae6789-a1ed-40df-aeb2-ccc324c60b9f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M109.35,126.12c.12,1.17.56,2.29,1.29,3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f248344a-dc53-4dde-822b-6fd320e58d9e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M132.38,129.35c.72-.93,1.17-2.04,1.29-3.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a48a8366-741b-4455-827e-638496dcdba5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M111.12,104.2c-2.62.26-4.54,2.59-4.28,5.21.06.57.21,1.13.47,1.64"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-0cfcc3ae-1b2c-492e-b431-d03f507f3922"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M135.36,111.06c.34-3.43-2.16-6.49-5.59-6.83-.21-.02-.41-.03-.62-.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-111608bb-1d7a-4c62-9e09-fe4b1ff86ec1"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M105.11,111.29c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-104d0a55-3e9c-40c1-a084-cd2d73cbc79a"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M139.24,113.36c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-73037567-1780-49e8-9ec3-4778208f2ebd"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M113.51,128.55c4.53,4.13,11.47,4.14,16,.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9cfaad6b-c3e6-4026-a001-8d96f7bc7055"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M111.24,131.53c5.87,5.15,14.65,5.16,20.53.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a8a11aeb-2a30-4bb1-b16a-a2b73e0a862c"
                    data-name="LINE"
                  >
                    <line
                      x1="111.02"
                      y1="128.75"
                      x2="111.02"
                      y2="128.75"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-a44ea86c-da9a-4a6f-897b-0cb209eb94d1"
                    data-name="LINE"
                  >
                    <line
                      x1="132"
                      y1="128.76"
                      x2="132"
                      y2="128.76"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-29357e88-d7b9-4ce3-93fb-863b7d6938af"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M111.02,128.75c-.71.75-.68,1.93.07,2.65.05.05.1.09.16.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-e51a2c54-8a85-4ce6-8e52-64d2cc5592ed"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M113.51,128.55c-.76-.58-1.83-.49-2.49.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-769fb9d2-3875-45f0-8703-43bb53d9fb9f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M132,128.76c-.66-.69-1.73-.78-2.49-.2"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4f128625-6b3c-4053-8e70-bf6ed869241b"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M131.78,131.54c.82-.63.98-1.8.36-2.62-.04-.05-.09-.11-.13-.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9707877f-37fe-4fec-a33b-8f42e45efd7d"
                    data-name="LINE"
                  >
                    <line
                      x1="109.33"
                      y1="125.86"
                      x2="109.35"
                      y2="126.12"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-afc527b9-034f-4c6c-9727-f7c7e4a5c769"
                    data-name="LINE"
                  >
                    <line
                      x1="135.35"
                      y1="111.22"
                      x2="135.36"
                      y2="111.06"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-dcc5cc75-20df-400f-92db-c8a1304df55c"
                    data-name="LINE"
                  >
                    <line
                      x1="137.93"
                      y1="124.55"
                      x2="139.24"
                      y2="113.36"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d11d855e-5f21-43c0-91df-f3b060a35a67"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M135.88,126.23c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ca00f14c-260b-4b65-b003-0c04511c912a"
                    data-name="LINE"
                  >
                    <line
                      x1="134.38"
                      y1="126.08"
                      x2="135.88"
                      y2="126.23"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-cdc340d9-48d9-40a8-8747-1b3e23885d07"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M132.7,124.03c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-54599bbd-1ac6-454c-9078-e125cbfb2dcb"
                    data-name="LINE"
                  >
                    <line
                      x1="134.01"
                      y1="112.83"
                      x2="132.7"
                      y2="124.03"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-36d8f858-7fc4-4a2e-9dde-078daf60ad48"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M136.06,111.16c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-13955e15-86fd-436b-80b0-277ae4cd7214"
                    data-name="LINE"
                  >
                    <line
                      x1="137.56"
                      y1="111.31"
                      x2="136.06"
                      y2="111.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-83bb0575-5d2b-4989-af23-c718c7ab6f17"
                    data-name="LINE"
                  >
                    <line
                      x1="105.09"
                      y1="124.54"
                      x2="103.43"
                      y2="113.34"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-20a95fc5-aad2-4618-96e9-a42516fe74ad"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M105.09,124.54c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-7abea9c2-9d88-4304-989b-ecd22f75d82d"
                    data-name="LINE"
                  >
                    <line
                      x1="108.64"
                      y1="126.06"
                      x2="107.14"
                      y2="126.21"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-b5e8e9c6-af1d-415c-bffa-0c6fe36d4018"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M108.64,126.06c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-cd8a3dc5-e0f5-4bb2-8458-b873bae4a366"
                    data-name="LINE"
                  >
                    <line
                      x1="108.66"
                      y1="112.82"
                      x2="110.32"
                      y2="124.01"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9498f773-a8e9-49ec-8aa1-5f5b49e43b65"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M108.66,112.82c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-68b2aaef-c427-4fee-bc06-714a25126007"
                    data-name="LINE"
                  >
                    <line
                      x1="105.11"
                      y1="111.29"
                      x2="106.61"
                      y2="111.14"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(4),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
            <g
              id="uuid-f60d5e4b-8332-4b6b-befd-8ec5c8bd8576"
              data-name="silla_5"
            >
              <g
                id="uuid-567b40a3-d7fa-454a-b958-731d494b8859"
                data-name="rellena"
                className={getColorForSilla(5)}
              >
                <path d="M179.6,55.26s3.09.71,3.41,1.4l-.79.75-.33,1.33,1.37,2.07,1.67,3.25.4,2.37-.11,2.98-.48,2.33-1.48,2.84-1.04.98s-.22,1.41-.22,1.48.46.72.46.72l.56.52-1.03.73-.99.4-1.06.24-.41.1-1.05-.92-11.99,1.52s-.99.55-1.08.68-.36.66-.36.66l-.71.18-1.26.3-1.49-.09-1.51-.62-1.04-.89-.87-1.43s-.35-1.08-.3-1.25,0-18.26,0-18.26l.09-.84.41-1.38.61-1.11.95-1.07,1.18-.84,1.47-.72,1.8-.05h.52l.23.55.67.63,1.92.32,9.81,1.17h.68s.83-.3.83-.3l.54-.76Z" />
                <path d="M178.41,51.14l-11.1-1.35s-2.21-.01-2.29,1.47l-.19,1.81s-.02,1.55,1.33,1.89l11.39,1.36s1.76.21,2.16-1.39c0,0,1.07-3.36-1.29-3.79Z" />
                <path d="M166.5,80.38s-1.95.06-1.69,2.54c0,0-.08,2.84,2.25,2.68l7.75-1.16,3.67-.55s1.5-.39,1.41-1.68l-.2-2.08s-.12-1.53-2.35-1.37l-8.15,1.13-2.7.48Z" />
                <path d="M184.44,56.66s1.69,1.07,3.1,4.09c0,0,1.69,3.78,1.54,6.78,0,0,.21,4.64-2.89,9.04,0,0-1.76,2.86-3.16,1.75,0,0-1.5-.37-1.09-2.23l.38-.66.69-.85.82-1.27.57-1.18.42-1.16.4-1.54.11-1.66v-1.33l-.34-1.74-.67-1.98-1.06-1.9-1.11-1.42-.26-.65-.03-.73.36-.75.46-.42.76-.32h.82l.17.14Z" />
              </g>
              <g
                id="uuid-1a4171b7-76f9-4dd3-a7c8-0e3c4877e3ec"
                data-name="borde"
              >
                <g
                  id="uuid-d49941f7-2ce2-400e-8a25-3a6671a353bd"
                  data-name="INSERT"
                >
                  <g
                    id="uuid-279ca92b-95cd-42f6-9737-417835656742"
                    data-name="LINE"
                  >
                    <line
                      x1="157.88"
                      y1="59.89"
                      x2="157.88"
                      y2="77.92"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-488e1cf1-24ac-4607-b01f-8d6c49647e84"
                    data-name="LINE"
                  >
                    <line
                      x1="164.73"
                      y1="81.73"
                      x2="164.89"
                      y2="81.72"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-38c6f04e-0624-4984-b40f-40ca4742f4b9"
                    data-name="LINE"
                  >
                    <line
                      x1="179.81"
                      y1="55.37"
                      x2="179.55"
                      y2="55.35"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2178d8a7-1ee9-4e96-b01e-960965630fa5"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M179.8,79.69c1.17-.12,2.29-.56,3.21-1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-d79c23cc-f307-4d92-bdd8-745d896d3496"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M183.03,56.66c-.93-.72-2.04-1.17-3.21-1.29"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-924e2de8-8e06-4dd3-b3dc-b6cc87c35cb6"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M157.88,77.92c.26,2.62,2.59,4.54,5.21,4.28.57-.06,1.13-.21,1.64-.47"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-651403d4-b46d-4c86-bf66-f652b18e3e0e"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M164.74,53.68c-3.43-.34-6.49,2.16-6.83,5.59-.02.21-.03.41-.03.62"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-eff3249b-2979-465d-b85f-a0a5741ba8b0"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M164.98,83.93c.1,1.03,1.02,1.78,2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2fd9afb4-2f2c-4f52-84fa-7194e7957139"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M167.04,49.8c-1.03-.1-1.95.65-2.05,1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-ae761ac7-32ac-455a-b725-94d83cf2086f"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M182.23,75.53c4.13-4.53,4.14-11.47.01-16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-02b34579-b9f8-4b73-9173-1922c5552b57"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M185.21,77.8c5.15-5.87,5.16-14.65.01-20.53"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-9eeacf3d-70d2-4be7-b7f4-5a1749c857a5"
                    data-name="LINE"
                  >
                    <line
                      x1="182.43"
                      y1="78.02"
                      x2="182.43"
                      y2="78.02"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-33bb85db-8754-4154-814a-55110c69bde1"
                    data-name="LINE"
                  >
                    <line
                      x1="182.44"
                      y1="57.04"
                      x2="182.44"
                      y2="57.04"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-50522e6d-3540-4f4e-8af8-30e613d490f8"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M182.43,78.02c.75.71,1.93.68,2.65-.07.05-.05.09-.1.13-.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-70e04a8e-1dff-4f01-98df-f329b01a5b74"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M182.23,75.53c-.58.76-.49,1.83.2,2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-750ff860-790c-4281-87e4-e7bacdedf6fc"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M182.44,57.04c-.69.66-.78,1.73-.2,2.49"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-de244e71-e7ec-48f6-acde-926b4f231964"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M185.22,57.26c-.63-.82-1.8-.98-2.62-.36-.05.04-.11.09-.16.13"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-f1925803-b72f-4adb-8c0c-69cdae45bf5c"
                    data-name="LINE"
                  >
                    <line
                      x1="179.54"
                      y1="79.71"
                      x2="179.8"
                      y2="79.69"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-fd43a10e-9408-40d5-ac3c-f960b768113d"
                    data-name="LINE"
                  >
                    <line
                      x1="164.91"
                      y1="53.69"
                      x2="164.74"
                      y2="53.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-2492f249-bebc-49ae-8fa8-7cca11cc7a92"
                    data-name="LINE"
                  >
                    <line
                      x1="178.23"
                      y1="51.11"
                      x2="167.04"
                      y2="49.8"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-27fd1394-74ca-43ed-a029-fe07fc8e9406"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M179.91,53.16c.1-1.03-.65-1.95-1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-98de938c-7d8a-4d92-b579-8386f40f508c"
                    data-name="LINE"
                  >
                    <line
                      x1="179.76"
                      y1="54.66"
                      x2="179.91"
                      y2="53.16"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-4e05f96b-d36f-4b00-a322-f671a6ae3c42"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M177.71,56.34c1.03.1,1.95-.65,2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5ba135a3-571b-4d25-8fcf-272b6e28c415"
                    data-name="LINE"
                  >
                    <line
                      x1="166.52"
                      y1="55.03"
                      x2="177.71"
                      y2="56.34"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-1fe9f65d-08ea-4710-b23c-6e273168ce58"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M164.84,52.98c-.1,1.03.65,1.95,1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-5ae614f3-4e1e-435d-9786-54255c3ec22b"
                    data-name="LINE"
                  >
                    <line
                      x1="164.99"
                      y1="51.48"
                      x2="164.84"
                      y2="52.98"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-c373d2ff-99e2-44d8-baca-8e48af161f0b"
                    data-name="LINE"
                  >
                    <line
                      x1="178.22"
                      y1="83.95"
                      x2="167.02"
                      y2="85.61"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-03ceb946-d09e-40de-8106-b41202d831b0"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M178.22,83.95c1.03-.1,1.78-1.02,1.68-2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-fbbfc190-6fc5-4604-9d99-ff68433f8f3a"
                    data-name="LINE"
                  >
                    <line
                      x1="179.74"
                      y1="80.4"
                      x2="179.89"
                      y2="81.9"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3373d7dc-c441-4fc2-9dec-fb3ffa7417c3"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M179.74,80.4c-.1-1.03-1.02-1.78-2.05-1.68"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-3593bd9f-341a-47b8-afba-e2c1fe40bb38"
                    data-name="LINE"
                  >
                    <line
                      x1="166.5"
                      y1="80.38"
                      x2="177.7"
                      y2="78.72"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-992a0143-df88-4421-b8f3-2ad888322466"
                    data-name="ELLIPSE"
                  >
                    <path
                      d="M166.5,80.38c-1.03.1-1.78,1.02-1.68,2.05"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                  <g
                    id="uuid-78c9a76b-6e65-493f-a9ca-495596a85e31"
                    data-name="LINE"
                  >
                    <line
                      x1="164.98"
                      y1="83.93"
                      x2="164.83"
                      y2="82.43"
                      style={{
                        fill: "none",
                        stroke: getStrokeForSilla(5),
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: ".65px",
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </picture>
  );
};
