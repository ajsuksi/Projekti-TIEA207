import { useState, useEffect } from "react";

export default function Paneeli({onFilterChange}) {
  const [selectedTypes, setSelectedTypes] = useState(["Kadunvarsi", "Pysäköintihalli", "Parkkipaikka", "Muu"]);
  const [showPaid, setShowPaid] = useState(true);
  const [showFree, setShowFree] = useState(true);
  const [selectedPayments, setSelectedPayments] = useState([
    "Kortti",
    "Käteinen",
    "Moovy",
  ]);

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => 
      prev.includes(type)
      ? prev.filter((t) => t !== type)
      : [...prev, type]);
  };

  const handlePaymentChange = (method) => {
    setSelectedPayments((prev) =>
      prev.includes(method)
      ? prev.filter((m) => m !== method)
      : [...prev, method]);
  };

  useEffect(() => {
    onFilterChange({selectedTypes, showPaid, showFree, selectedPayments});
  }, [selectedTypes, showPaid, showFree, selectedPayments, onFilterChange]);



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

      <h3>Parkkipaikan tyyppi</h3>
      {["Kadunvarsi", "Pysäköintihalli", "Parkkipaikka", "Muu"].map((type) => (
        <label key={type} style={{display: "block"}}>
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeChange(type)}
            />
          {" "}{type}
        </label>
      ))}

      <h3>Maksullisuus</h3>
      <label style={{display: "block"}}>
        <input
          type="checkbox"
          checked={showPaid}
          onChange={() => setShowPaid(!showPaid)}
          />
        {" "}Maksullinen
        </label>
        <label style={{display: "block"}}>
        <input
          type="checkbox"
          checked={showFree}
          onChange={() => setShowFree(!showFree)}
          />
        {" "}Ilmainen
        </label>
      
      {/* Näytetään maksutavat, jos "Maksullinen" on valittu */}
      {showPaid && (
        <>
        {/*   <hr style={{ margin: "1rem 0" }} />  */}
        <h3>Maksutavat</h3>
        {["Kortti", "Käteinen", "Moovy"].map((method) => (
          <label key={method} style={{display: "block"}}>
            <input
              type="checkbox"
              checked={selectedPayments.includes(method)}
              onChange={() => handlePaymentChange(method)}
              />
            {" "}{method}
          </label>
        ))}
        </>
      )}

{/*       <h3>Parkkipaikat</h3>
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
      </>)} */}
    </div>
  );
}
