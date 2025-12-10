import { useMap } from "react-leaflet";
import {createCallHandleChange, createHandleSave} from "./popupHandlers";
import { popupStyle, inputStyle, labelStyle, headingStyle, buttonStyle, AddPopupStyle } from "./popupStyles";
import ViewPopup from "./ViewPopup";


//PopUp lomakkeen hallinta
export default function MarkerPopup ({marker, idx, handleChange, handleRemove, setMarkers, setNotice, onSave, darkMode, onCancel}){

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


const{
   containerStyle,
   headerStyle,
   titleStyle,
   badgeStyle,
   labelStyle,
   inputStyle,
   smallInfo,
   buttonRow,
   btnBase,
}= AddPopupStyle();

  const primary = { ...btnBase, background: "#2563eb", color: "#fff" };
  const danger = { ...btnBase, background: "#ef4444", color: "#fff" };
  const neutral = { ...btnBase, background: "#f3f4f6", color: "#0f172a" };

  return (
    <div style={containerStyle (darkMode)}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>{marker._id ? "Muokkaa parkkipaikkaa" : "Uusi parkkipaikka"}</h4>
        <div style={badgeStyle}>{marker._id ? "Tallennettu" : "Luonnos"}</div>
      </div>

      <div>
        <div style={labelStyle (darkMode)}>Osoite</div>
        <input
          type="text"
          value={marker.osoite || ""}
          onChange={(e) => callHandleChange("osoite", e.target.value)}
          placeholder="Osoite"
          style={inputStyle (darkMode)}
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
              style={{ ...inputStyle (darkMode), marginBottom: 8 }}
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
            <div style={labelStyle (darkMode)}>Aikarajoitus</div>
            <input
              type="text"
              value={marker.aikarajoitus || marker.aika || ""}
              onChange={(e) => callHandleChange("aikarajoitus", e.target.value)}
              placeholder="Aikarajoitus"
              style={inputStyle (darkMode)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <div style={labelStyle (darkMode)}>Tyyppi</div>
          <select
            value={marker.tyyppi || ""}
            onChange={(e) => callHandleChange("tyyppi", e.target.value)}
            style={inputStyle (darkMode)}
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
          <div style={labelStyle (darkMode)}>Lisätiedot</div>
          <input
            type="text"
            value={marker.lisatiedot || ""}
            onChange={(e) => callHandleChange("lisatiedot", e.target.value)}
            placeholder="Lisätietoja"
            style={inputStyle (darkMode)}
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

    // Jos marker on uusi (ei id), se pitää poistaa kokonaan
    if (!marker._id) {
      handleRemove(marker._id);
    }

    // Kaikissa tapauksissa palataan ViewPopupiin
    if (onCancel) onCancel();
  }}
  style={neutral}
>
  Peruuta
</button>
      </div>
    </div>
  );
}