import { saveMarker } from "./mapUtilities";
import { useEffect, useState } from "react";


//PopUp lomakkeen hallinta
export default function MarkerPopup ({marker, idx, handleChange, handleRemove, setMarkers}){

  console.log("AddPopup sai marker-propsin:", marker);

const [newMarker, setNewMarker] = useState({
  tyyppi: "",
  maksu: false,
  hinta: "",
  maksutapa: [],
  aikarajoitus: "",
  lat: "",
  lng: "",
  lisatiedot: ""
});
 
// Täyttää lomakkeen tiedot, jos muokataan olemassa olevaa markkeria
useEffect(() => {
  if (marker) {
    setNewMarker({
      tyyppi: marker.tyyppi ?? "",
      maksu: marker.maksu ?? false,
      hinta: marker.hinta ?? "",
      maksutapa: marker.maksutapa ?? [],
      aikarajoitus: marker.aikarajoitus ?? "",
      lat: marker.lat,
      lng: marker.lng,
      lisatiedot: marker.lisatiedot ?? "",
      _id: marker._id ?? null,     // tallenna id jotta muokkaus/lisäys erottuu
    });
  }
}, [marker]);

return(
    <div style={{ minWidth: "150px" }}>
      <h4 style={{ marginTop: 0, marginBottom: "8px", fontSize: "16px" }}>
        {newMarker._id ? "Muokkaa parkkipaikkaa" : "Lisää parkkipaikka"}
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
                    checked={!newMarker.maksu}/* {marker.maksullinen === "ilmainen"} */
                    onChange={(e) => setNewMarker({...newMarker, maksu: !newMarker.maksu})}
                  />
                  {" "} Ilmainen
                  </label>

                  <label>
                  <input
                    type="radio"
                    name={`maksullinen-${idx}`}
                    value="maksullinen"
                    checked={newMarker.maksu}/* {marker.maksullinen === "maksullinen"} */
                    onChange={(e) => setNewMarker({...newMarker, maksu: !newMarker.maksu})}
                  />
                  {" "} Maksullinen
                  </label>

                  {newMarker.maksu && (
                    <div>
                    <input
                    type="text"
                    value={newMarker.hinta || ""}
                    onChange={(e) => setNewMarker({...newMarker, hinta: e.target.value})}
                    placeholder="Hinta"
                    rows={1}
                    style={{ width: "100%" }}
                    />
                    {["Kortti", "Käteinen", "Moovy"].map((maksutapa) => (
                      <label key={maksutapa} style={{ display: "block" }}>
                        <input
                          type="checkbox"
                          checked={newMarker.maksutapa.includes(maksutapa) || false}
                          onChange={(e) => {
                            const selected = newMarker.maksutapa || [];
                            const updated = e.target.checked
                            ? [...selected, maksutapa]
                            : selected.filter((v) => v != maksutapa)
                            setNewMarker({...newMarker, maksutapa: updated})
                          }}
                        />
                        {" "}{maksutapa}
                      </label>
                    ))}
                  </div>
                  )}



                  {!newMarker.maksu && (
                    <input
                    type="text"
                    value={newMarker.aikarajoitus || ""}
                    onChange={(e) => setNewMarker({...newMarker, aikarajoitus: e.target.value})}
                    placeholder="Aikarajoitus"
                    rows={1}
                    style={{ width: "100%", marginBottom: "10px"}}
                  />
                  )}


                  <select
                    value={newMarker.tyyppi || ""}
                    onChange={(e) =>
                      setNewMarker(prev => ({ ...prev, tyyppi: e.target.value }))
                    }
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    <option value="">Valitse tyyppi...</option>
                    <option value="Kadunvarsi">Kadunvarsi</option>
                    <option value="Pysäköintihalli">Pysäköintihalli</option>
                    <option value="Parkkipaikka">Parkkipaikka</option>
                    <option value="Muu">Muu</option>
                  </select>

                   <input
                    type="text"
                    value={newMarker.lisatiedot || ""}
                    onChange={(e) => setNewMarker({...newMarker, lisatiedot: e.target.value})}
                    placeholder="Lisätietoja"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />


                  <button
                  onClick={() => saveMarker(newMarker, setMarkers)}
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