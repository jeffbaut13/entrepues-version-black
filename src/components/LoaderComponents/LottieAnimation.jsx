import Lottie from "lottie-react";
import cartaAnimation from "../../data/carne.json";

export const LottieAnimation = ({width="w-260", className = "" }) => {
  return (
    <div className={`${width} h-auto ${className}`}>
      <Lottie
        animationData={cartaAnimation}
        loop={true}
        autoplay={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
