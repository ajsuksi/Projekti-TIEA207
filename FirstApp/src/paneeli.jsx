import { useState } from "react";

export default function Paneeli() {
  const [onMaksullinen, asetaMaksullinen] = useState(true);
  const [onIlmainen, asetaIlmainen] = useState(true);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        width: "10vw",
        left: 0,
        top: 0,
        height: "100vh",
        borderRight: "1px solid #ccc",
        /* paddingLeft: "1rem", */
        padding: "1rem",
        transform: "translateX(-9vw)", // Piilotetaan (10vw - 9vw kahva)
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "#222",
        color: "white",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(0)"; // Näytetään paneeli
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(-9vw)"; // Piilotetaan paneeli
      }}
    >
      <h3>Parkkipaikat</h3>
      <div>
        <strong>Tyyppi:</strong>
        <br />
        <label>
          <input type="checkbox" name="kadunvarsi" defaultChecked />
          Kadunvarsi
        </label>
        <br />

        <label>
          <input type="checkbox" name="pysakointihalli" defaultChecked />
          Pysäköintihalli
        </label>
        <br />

        <label>
          <input type="checkbox" name="parkkipaikka" defaultChecked />
          Parkkipaikka
        </label>
        <br />

        <label>
          <input type="checkbox" name="muu" defaultChecked />
          Muu
        </label>
      </div>
      <br />
      
      <div>
        <strong>Maksullisuus:</strong>
        <br />

        <label>
          <input
            type="checkbox"
            name="ilmainen"
            checked={onIlmainen}
            onChange={() => asetaIlmainen(!onIlmainen)}
          />
          Ilmainen
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            name="maksullinen"
            checked={onMaksullinen}
            onChange={() => asetaMaksullinen(!onMaksullinen)}
          />
          Maksullinen
        </label>
        <br />
      </div>
      <br />

{ onMaksullinen && (
  <>
      <div>
        <strong>Maksutapa:</strong>
        <br />
        <label>
          <input type="checkbox" name="kortti" defaultChecked />
          Kortti
        </label>
        <br />

        <label>
          <input type="checkbox" name="kateinen" defaultChecked />
          Käteinen
        </label>
        <br />

        <label>
          <input type="checkbox" name="moovy" defaultChecked />
          Moovy
        </label>
        <br />
      </div>
      </>)}
    </div>
  );
}
