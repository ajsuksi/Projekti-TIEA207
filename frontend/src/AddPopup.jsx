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
    map
  });

return(
    <div style={popupStyle(darkMode)}>

      <h4 style={headingStyle(darkMode)}>
        {marker._id ? "Muokkaa parkkipaikkaa" : "Lisää parkkipaikka"}
      </h4>
                  <label style={labelStyle(darkMode)}>Osoite:</label>
                  <input
                    type="text"
                    value={marker.osoite || ""}
                    onChange={(e) => callHandleChange("osoite", e.target.value)}
                    placeholder="osoite"
                    style={{ ...inputStyle(darkMode), marginBottom: "5px" }}
                  />
                  

                  <label style={labelStyle(darkMode)}>
                  <input
                    type="radio"
                    name={`maksu-${idx}`}
                    checked={marker.maksu === false}
                    onChange={() => callHandleChange("maksu", false)}
                  />
                  {" "} Ilmainen
                  </label>

                  <label style={labelStyle(darkMode)}>
                  <input
                    type="radio"
                    name={`maksu-${idx}`}
                    checked={marker.maksu === true}
                    onChange={() => callHandleChange("maksu", true)}
                  />
                  {" "} Maksullinen
                  </label>

                  {marker.maksu === true && (
                    <div>
                    <input
                    type="text"
                    value={marker.hinta || ""}
                    onChange={(e) => callHandleChange("hinta", e.target.value)}
                    placeholder="Hinta"
                    rows={1}
                    style={{ ...inputStyle(darkMode), marginBottom: "8px" }}
                    />
                    {["Kortti", "Käteinen", "Moovy"].map((maksutapa) => (
                      <label key={maksutapa} style={labelStyle(darkMode)}>
                        <input
                          type="checkbox"
                          checked={marker.maksutapa?.includes(maksutapa) || false}
                          onChange={(e) => {
                            const selected = marker.maksutapa || [];
                            const updated = e.target.checked
                            ? [...selected, maksutapa]
                            : selected.filter((v) => v != maksutapa)
                            callHandleChange("maksutapa", updated)
                          }}
                        />
                        {" "}{maksutapa}
                      </label>
                    ))}
                  </div>
                  )}



                  {marker.maksu === false && (
                    <input
                    type="text"
                    value={marker.aikarajoitus || marker.aika || ""}
                    onChange={(e) => callHandleChange("aikarajoitus", e.target.value)}
                    placeholder="Aikarajoitus"
                    rows={1}
                    style={{ ...inputStyle(darkMode), marginBottom: "10px"}}
                  />
                  )}


                  <select
                    value={marker.tyyppi || ""}
                    onChange={(e) =>
                      callHandleChange("tyyppi", e.target.value)
                    }
                    style={{ ...inputStyle(darkMode), marginBottom: "10px" }}
                  >
                    <option value="">Valitse tyyppi...</option>
                    <option value="Kadunvarsi 🟢">Kadunvarsi</option>
                    <option value="Pysäköintihalli 🔴">Pysäköintihalli</option>
                    <option value="Parkkipaikka 🔵">Parkkipaikka</option>
                    <option value="Mopoparkki 🟡">Mopoparkki</option>
                  </select>

                   <input
                    type="text"
                    value={marker.lisatiedot || ""}
                    onChange={(e) => callHandleChange("lisatiedot", e.target.value)}
                    placeholder="Lisätietoja"
                    style={{ ...inputStyle(darkMode), marginBottom: "10px" }}
                  />


                  <button
                  onClick={(e) => { e.stopPropagation(); handleSave(); }}
                  style={buttonStyle.save}
                  >
                    Tallenna
                  </button>

                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Poistetaan marker:", marker._id);
                    handleRemove(marker._id);
                  }}
                  style={buttonStyle.delete}
                  >
                    Poista
                  </button>
                </div> 

)
}