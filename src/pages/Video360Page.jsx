import { useState } from "react";
import Video360 from "../components/Video360/Video360";

const Video360Page = () => {
  const [visibleIndex, setVisibleIndex] = useState(6);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Video360 visibleIndex={visibleIndex} setVisibleIndex={setVisibleIndex} />
    </div>
  );
};

export default Video360Page;
