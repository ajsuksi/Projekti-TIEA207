import { useState } from "react";

export default function Paneeli() {
  const [onMaksullinen, asetaMaksullinen] = useState(false);
  const [onIlmainen, asetaIlmainen] = useState(false);

  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
      }}
    >
      <h3>Parkkipaikat</h3>
      <div>
        <strong>Tyyppi:</strong>
        <br />
        <label>
          <input type="checkbox" name="kadunvarsi" />
          Kadunvarsi
        </label>
        <br />

        <label>
          <input type="checkbox" name="pysakointihalli" />
          Pysäköintihalli
        </label>
        <br />

        <label>
          <input type="checkbox" name="parkkipaikka" />
          Parkkipaikka
        </label>
        <br />

        <label>
          <input type="checkbox" name="muu" />
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
          <input type="checkbox" name="kortti" />
          Kortti
        </label>
        <br />

        <label>
          <input type="checkbox" name="kateinen" />
          Käteinen
        </label>
        <br />

        <label>
          <input type="checkbox" name="moovy" />
          Moovy
        </label>
        <br />
      </div>
      </>)}
    </div>
  );
}
