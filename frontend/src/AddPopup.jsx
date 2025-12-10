import { useMap } from "react-leaflet";
import {createCallHandleChange, createHandleSave} from "./popupHandlers";
import { popupStyle, inputStyle, labelStyle, headingStyle, buttonStyle } from "./popupStyles";


//PopUp lomakkeen hallinta
export default function MarkerPopup ({marker, idx, handleChange, handleRemove, setMarkers, setNotice, onSave, darkMode}){

 const map = useMap();
 const getMarker = () => marker;
 const callHandleChange = createCallHandleChange(getMarker, idx, handleChange);
 const handleSave = createHandleSave({
    getMarker,
    setMarkers,
    setNotice,
    onSave,
    map,
  });

  const containerStyle = {
    minWidth: 240,
    padding: 14,
    borderRadius: 12,
    background: "linear-gradient(180deg, #ffffff, #fbfbfd)",
    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
    fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif",
    color: "#0f172a",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  };

  const titleStyle = { margin: 0, fontSize: 15, fontWeight: 700 };
  const badgeStyle = {
    fontSize: 12,
    padding: "4px 8px",
    background: marker._id ? "#eef2ff" : "#fff7ed",
    color: marker._id ? "#3730a3" : "#b45309",
    borderRadius: 999,
    border: "1px solid rgba(99,102,241,0.08)",
  };

  const labelStyle = { fontSize: 13, color: "#344054", margin: "6px 0 4px" };
  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e6e9ef",
    fontSize: 13,
    boxSizing: "border-box",
  };

  const smallInfo = { fontSize: 12, color: "#6b7280", margin: "6px 0" };

  const buttonRow = { display: "flex", gap: 8, marginTop: 6 };
  const btnBase = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
  };
  const primary = { ...btnBase, background: "#2563eb", color: "#fff" };
  const danger = { ...btnBase, background: "#ef4444", color: "#fff" };
  const neutral = { ...btnBase, background: "#f3f4f6", color: "#0f172a" };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>{marker._id ? "Muokkaa parkkipaikkaa" : "Uusi parkkipaikka"}</h4>
        <div style={badgeStyle}>{marker._id ? "Tallennettu" : "Luonnos"}</div>
      </div>

      <div>
        <div style={labelStyle}>Osoite</div>
        <input
          type="text"
          value={marker.osoite || ""}
          onChange={(e) => callHandleChange("osoite", e.target.value)}
          placeholder="Osoite"
          style={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <input
              type="radio"
              name={`maksu-${idx}`}
              checked={marker.maksu === false}
              onChange={() => callHandleChange("maksu", false)}
              onClick={(e) => e.stopPropagation()}
            />
            Ilmainen
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <input
              type="radio"
              name={`maksu-${idx}`}
              checked={marker.maksu === true}
              onChange={() => callHandleChange("maksu", true)}
              onClick={(e) => e.stopPropagation()}
            />
            Maksullinen
          </label>
        </div>

        {marker.maksu === true && (
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              value={marker.hinta || ""}
              onChange={(e) => callHandleChange("hinta", e.target.value)}
              placeholder="Hinta"
              style={{ ...inputStyle, marginBottom: 8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <div style={smallInfo}>Maksutavat</div>
            {["Kortti", "Käteinen", "Moovy", "EasyPark", "ParkMan"].map((maksutapa) => {
              const selected = marker.maksutapa || [];
              const checked = selected.includes(maksutapa);
              return (
                <label key={maksutapa} style={{ display: "block", fontSize: 13, marginTop: 6 }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const selectedNow = marker.maksutapa || [];
                      const updated = e.target.checked
                        ? [...selectedNow, maksutapa]
                        : selectedNow.filter((v) => v !== maksutapa);
                      callHandleChange("maksutapa", updated);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {" "}{maksutapa}
                </label>
              );
            })}
          </div>
        )}

        {marker.maksu === false && (
          <div>
            <div style={labelStyle}>Aikarajoitus</div>
            <input
              type="text"
              value={marker.aikarajoitus || marker.aika || ""}
              onChange={(e) => callHandleChange("aikarajoitus", e.target.value)}
              placeholder="Aikarajoitus"
              style={inputStyle}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <div style={labelStyle}>Tyyppi</div>
          <select
            value={marker.tyyppi || ""}
            onChange={(e) => callHandleChange("tyyppi", e.target.value)}
            style={inputStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">Valitse tyyppi...</option>
            <option value="Kadunvarsi 🟢">Kadunvarsi</option>
            <option value="Pysäköintihalli 🔴">Pysäköintihalli</option>
            <option value="Parkkipaikka 🔵">Parkkipaikka</option>
            <option value="Mopoparkki 🟡">Mopoparkki</option>
          </select>
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={labelStyle}>Lisätiedot</div>
          <input
            type="text"
            value={marker.lisatiedot || ""}
            onChange={(e) => callHandleChange("lisatiedot", e.target.value)}
            placeholder="Lisätietoja"
            style={inputStyle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div style={buttonRow}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
          style={primary}
        >
          Tallenna
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            // peruuta: poista väliaikainen merkki jos ei id
            if (!marker._id) handleRemove(marker._id);
            else {
              // jos halutaan sulkea popup tallennetulle markerille, voidaan vain sulkea popup-konteksti
              // ei erillistä logiikkaa tässä, stoppaa tapahtuma
            }
          }}
          style={neutral}
        >
          Peruuta
        </button>
      </div>
    </div>
  );
}