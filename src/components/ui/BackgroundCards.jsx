export const BackgroundCards = ({
  children,
  fullWidth = "small",
  rounded = "full",
  padding = true,
  customClasses = "",
}) => {
  const width = (fullWidth) => {
    switch (fullWidth) {
      case "medium":
        return "max-w-3xl";
      case "large":
        return "max-w-4xl";
      case "full":
        return "max-w-full";
      case "small":
      default:
        return "md:max-w-xl";
    }
  };
  const Rounded = (rounded) => {
    switch (rounded) {
      case "small":
        return "rounded-lg";
      case "large":
        return " rounded-3xl";
      case "full":
        return " rounded-full";
      case "medium":
      default:
        return "rounded-xl";
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${
        padding ? "px-4" : "p-0"
      } ${width(fullWidth)} h-full ${Rounded(
        rounded
      )} select-none ${customClasses}`}
    >
      <div className="background size-full absolute top-0 left-0 z-0 overflow-hidden">
        <div className="size-full absolute bg-[#e9ecf6] opacity-40 top-0 left-0 z-10" />
        <div className="size-full absolute bg-gradient-to-tl blur-3xl -rotate-12 from-black z-11 via-[#0e0e0e] to-[#1f1f1f] opacity-65 top-0 left-0 2xl" />
        <div className="size-full absolute bg-gradient-to-tl from-black z-12 via-[#0e0e0e] to-[#1f1f1f] opacity-50 top-0 left-0 2xl" />
        <div
          className={`size-full absolute border-[1px] border-[#fff6ea] opacity-30 ${Rounded(
            rounded
          )} top-0 left-0 z-13`}
        />
      </div>
      <div
        className={`relative z-10 space-y-3 flex justify-between flex-col h-full ${
          padding ? "p-6" : "p-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
