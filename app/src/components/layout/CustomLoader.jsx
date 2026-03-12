import { useApp } from "../../context/AppContext";

const CustomLoader = () => {

  const { loading } = useApp();


  return (
    <>
      {loading && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="relative flex items-center justify-center">
          {/* Outer Ring - Slow rotation */}
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-primary border-b-primary opacity-20"></div>

          {/* Inner Ring - Fast rotation */}
          <div className="h-16 w-16 animate-[spin_0.8s_linear_infinite] rounded-full border-4 border-transparent border-t-primary/80 border-r-primary/80"></div>

          {/* Center Glow */}
          <div className="absolute h-4 w-4 rounded-full bg-primary blur-[2px] animate-pulse"></div>
        </div>
      </div>}</>
  );
};

export default CustomLoader;