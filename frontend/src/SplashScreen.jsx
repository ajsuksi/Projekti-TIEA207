import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#ffffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <img
        src="/src/icons/logo.svg"
        alt="Parkkisovellus"
        style={{ width: "180px", opacity: 1 }}
      />
    </div>
  );
}
