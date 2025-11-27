import ParkingMap from "./map";
import { useState } from "react";
import SplashScreen from "./SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <div>
      <ParkingMap />
    </div>
  );
}

export default App;