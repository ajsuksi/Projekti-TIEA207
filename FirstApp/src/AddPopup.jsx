import { saveMarker } from "./mapUtilities";


//PopUp lomakkeen hallinta
export default function MarkerPopup ({marker, idx, handleChange, handleRemove, setMarkers}){

return(
    <div style={{ minWidth: "150px" }}>
      <h4 style={{ marginTop: 0, marginBottom: "8px", fontSize: "16px" }}>
        Lisää parkkipaikka
      </h4>
                  Osoite:
                  <input
                    type="text"
                    value={marker.title}
                    onChange={(e) => handleChange(idx, "title", e.target.value)}
                    placeholder="Osoite"
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                  

                  <label>
                  <input
                    type="radio"
                    name={`maksullinen-${idx}`}
                    value="ilmainen"
                    checked={marker.maksullinen === "ilmainen"}
                    onChange={(e) => handleChange(idx, "maksullinen", e.target.value)}
                  />
                  {" "} Ilmainen
                  </label>

                  <label>
                  <input
                    type="radio"
                    name={`maksullinen-${idx}`}
                    value="maksullinen"
                    checked={marker.maksullinen === "maksullinen"}
                    onChange={(e) => handleChange(idx, "maksullinen", e.target.value)}
                  />
                  {" "} Maksullinen
                  </label>

                  {marker.maksullinen === "maksullinen" && (
                    <div>
                    <input
                    type="text"
                    value={marker.hinta || ""}
                    onChange={(e) => handleChange(idx, "hinta", e.target.value)}
                    placeholder="Hinta"
                    rows={1}
                    style={{ width: "100%" }}
                    />
                    {["Kortti", "Käteinen", "Moovy"].map((maksutapa) => (
                      <label key={maksutapa} style={{ display: "block" }}>
                        <input
                          type="checkbox"
                          checked={marker.maksutavat?.includes(maksutapa) || false}
                          onChange={(e) => {
                            const selected = marker.maksutavat || [];
                            const updated = e.target.checked
                            ? [...selected, maksutapa]
                            : selected.filter((v) => v != maksutapa)
                            handleChange(idx, "maksutavat", updated)
                          }}
                        />
                        {" "}{maksutapa}
                      </label>
                    ))}
                  </div>
                  )}



                  {marker.maksullinen === "ilmainen" && (
                    <input
                    type="text"
                    value={marker.aika || ""}
                    onChange={(e) => handleChange(idx, "aika", e.target.value)}
                    placeholder="Aikarajoitus"
                    rows={1}
                    style={{ width: "100%", marginBottom: "10px"}}
                  />
                  )}


                  <select
                    value={marker.parkkityyppi || ""}
                    onChange={(e) =>
                      handleChange(idx, "parkkityyppi", e.target.value)
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
                    onChange={(e) => handleChange(idx, "lisatiedot", e.target.value)}
                    placeholder="Lisätietoja"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />


                  <button
                  onClick={() => saveMarker(marker, setMarkers)}
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