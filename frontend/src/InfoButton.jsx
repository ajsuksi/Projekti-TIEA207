import { useState } from "react";

export default function InfoButton({ darkMode }) {
  const [showInfo, setShowInfo] = useState(false);

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: darkMode ? "#444444" : "#BDAEA3",
    color: darkMode ? "#ffffff" : "#000000",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
  };

  const modalStyle = {
    display: showInfo ? "block" : "none",
    position: "fixed",
    zIndex: 1000,
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  };

  const modalContentStyle = {
    backgroundColor: darkMode ? "#2d2d2d" : "#ffffff",
    margin: "5% auto",
    padding: "20px",
    border: darkMode ? "1px solid #444444" : "1px solid #888",
    width: "80%",
    maxWidth: "500px",
    borderRadius: "8px",
    color: darkMode ? "#ffffff" : "#000000",
    maxHeight: "80vh",
    overflowY: "auto"
  };

  const closeButtonStyle = {
    color: darkMode ? "#ffffff" : "#000000",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "0"
  };

  return (
    <>
      <button style={buttonStyle} onClick={() => setShowInfo(true)} title="Tietoa ohjelmasta">
        <img src="/src/icons/info.png" alt="info" style={{ height: "2rem", width: "auto"}} />
      </button>

      <div style={modalStyle} onClick={() => setShowInfo(false)}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <button
            style={closeButtonStyle}
            onClick={() => setShowInfo(false)}
          >
            &times;
          </button>
          <h2 style={{ marginTop: "0" }}>Tietoa ohjelmasta</h2>
          <p>
            <strong>Parkkisovellus</strong> auttaa käyttäjiä löytämään heille sopivia parkkipaikkoja kaupungissa. Sovelluksella käyttäjät voivat lisätä, muokata ja poistaa parkkipaikkoja kartalta. Lisäksi parkkipaikkoja voi suodattaa tyypin, maksullisuuden ja maksutapojen perusteella.
          </p>
          <h4>Ominaisuudet:</h4>
          <ul>
            <li>Parkkipaikkojen lisääminen kartalle</li>
            <li>Parkkipaikkojen muokkaaminen ja poistaminen</li>
            <li>Parkkipaikkojen suodattaminen tyypin, maksullisuuden ja maksutapojen perusteella</li>
            <li>Navigointi valittuun parkkipaikkaan</li>
            <li>Dark mode -tuki</li>
          </ul>
          <h4>Ohjeet:</h4>
          <ul>
            <li>Klikkaa kartalle lisätäksesi uuden parkkipaikan</li>
            <li>Klikkaa paikkaa nähdäksesi sen tiedot</li>
            <li>Vasemmalla on paneeli, joka tarjoaa vaihtoehtoja parkkipaikkojen suodattamiseen</li>
          </ul>
          <p> <strong>Tekijät:</strong> Anssi Halomo, Taru Kajander, Antti-Jussi Suksi</p>
          <p style={{ fontSize: "12px", color: darkMode ? "#999" : "#666" }}>
            Versio 1.0 | Käyttö omalla vastuulla
          </p>
        </div>
      </div>
    </>
  );
}
