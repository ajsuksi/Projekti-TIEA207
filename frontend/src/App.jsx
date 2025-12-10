import ParkingMap from "./map";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Lisää/poista dark-mode luokka body-elementista
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <div>
      <ParkingMap darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;