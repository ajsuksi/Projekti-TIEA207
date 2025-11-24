import { saveMarker } from "./mapUtilities";
import React, { useState } from "react";


//PopUp lomakkeen hallinta
export default function MarkerPopup ({marker, idx, handleChange, handleRemove, setMarkers, setNotice}){
const handleSave = async () => {
    try {
      const saved = await saveMarker(marker); // kutsutaan puhdasta utilia

      // Päivitetään markerille backendin antama _id
      setMarkers(prev =>
        prev.map(m =>
          m.lat === marker.lat && m.lng === marker.lng
            ? { ...m, _id: saved._id }
            : m
        )
      );
      setNotice("Paikka tallennettu!");
      setTimeout(() => setNotice(""), 4000);
    } catch (err) {
      setNotice("Tallennus epäonnistui");
      setTimeout(() => setNotice(""), 5000);
    }
  };
return(
    <div style={{ position: "relative", minWidth: "150px" }}>

      <h4 style={{ marginTop: 0, marginBottom: "8px", fontSize: "16px" }}>
        Lisää parkkipaikka
      </h4>
                  Osoite:
                  <input
                    type="text"
                    value={marker.osoite || ""}
                    onChange={(e) => handleChange(idx, "osoite", e.target.value)}
                    placeholder="osoite"
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                  

                  <label>
                  <input
                    type="radio"
                    name={`maksu-${idx}`}
                    value="ilmainen"
                    checked={marker.maksu === "ilmainen"}
                    onChange={(e) => handleChange(idx, "maksu", e.target.value)}
                  />
                  {" "} Ilmainen
                  </label>

                  <label>
                  <input
                    type="radio"
                    name={`maksu-${idx}`}
                    value="maksu"
                    checked={marker.maksu === "maksu"}
                    onChange={(e) => handleChange(idx, "maksu", e.target.value)}
                  />
                  {" "} maksu
                  </label>

                  {marker.maksu === "maksu" && (
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
                          checked={marker.maksutapa?.includes(maksutapa) || false}
                          onChange={(e) => {
                            const selected = marker.maksutapa || [];
                            const updated = e.target.checked
                            ? [...selected, maksutapa]
                            : selected.filter((v) => v != maksutapa)
                            handleChange(idx, "maksutapa", updated)
                          }}
                        />
                        {" "}{maksutapa}
                      </label>
                    ))}
                  </div>
                  )}



                  {marker.maksu === "ilmainen" && (
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
                    value={marker.tyyppi || ""}
                    onChange={(e) =>
                      handleChange(idx, "tyyppi", e.target.value)
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
                  onClick={() => handleSave()}
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