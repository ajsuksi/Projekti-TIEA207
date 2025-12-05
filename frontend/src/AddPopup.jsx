import { useMap } from "react-leaflet";
import {createCallHandleChange, createHandleSave} from "./popupHandlers";


//PopUp lomakkeen hallinta
export default function MarkerPopup ({marker, idx, handleChange, handleRemove, setMarkers, setNotice, onSave}){

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
    <div style={{ position: "relative", minWidth: "150px" }}>

      <h4 style={{ marginTop: 0, marginBottom: "8px", fontSize: "16px" }}>
        {marker._id ? "Muokkaa parkkipaikkaa" : "Lisää parkkipaikka"}
      </h4>
                  Osoite:
                  <input
                    type="text"
                    value={marker.osoite || ""}
                    onChange={(e) => callHandleChange("osoite", e.target.value)}
                    placeholder="osoite"
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                  

                  <label>
                  <input
                    type="radio"
                    name={`maksu-${idx}`}
                    checked={marker.maksu === false}
                    onChange={() => callHandleChange("maksu", false)}
                  />
                  {" "} Ilmainen
                  </label>

                  <label>
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
                    style={{ width: "100%" }}
                    />
                    {["Kortti", "Käteinen", "Moovy"].map((maksutapa) => (
                      <label key={maksutapa} style={{ display: "block" }}>
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
                    style={{ width: "100%", marginBottom: "10px"}}
                  />
                  )}


                  <select
                    value={marker.tyyppi || ""}
                    onChange={(e) =>
                      callHandleChange("tyyppi", e.target.value)
                    }
                    style={{ width: "100%", marginBottom: "10px" }}
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
                    style={{ width: "100%", marginBottom: "10px" }}
                  />


                  <button
                  onClick={(e) => { e.stopPropagation(); handleSave(); }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "#24af2eff",
                    color: "#1d1b1bff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  >
                    Tallenna
                  </button>

                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Poistetaan marker:", marker._id);
                    handleRemove(marker._id);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "3px",
                    backgroundColor: "#da4e4eff",
                    color: "#000000ff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  >
                    Poista
                  </button>
                </div> 

)
}