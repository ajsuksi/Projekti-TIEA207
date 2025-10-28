import { useState } from "react";
import Paneeli from "./paneeli";
import { MapContainer,TileLayer,Marker,Popup,useMapEvents, } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Lisää markerin
function MapClickHandler({onAddMarker }) {
  useMapEvents({
    click(e) {
      const newMarker = {
        tyyppi: "parkkityyppi",
        maksu: false,
        maksutapa: [],
        aikarajoitus: null,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        lisatiedot: ""
      };
      onAddMarker(newMarker);
    },
  });
  return null;
}

export default function ParkingMap() {
  const [markers, setMarkers] = useState([]);

  //Poistaa markerin
  const handleRemove = (index) => {
    setMarkers((prev) => prev.filter((_, i) => i !== index));
  };

  //valitse maksutavan
  const handleChange = (index, field, value) => {
    setMarkers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const saveMarker = async (marker) => {
    
    try {
      const res = await fetch("http://localhost:3001/api/places/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(marker),
      });
      const saved = await res.json();
      console.log("Marker saved", saved);
    } catch (err) {
      console.error("Virhe tallennuksessa", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Vasen paneeli */}
    <Paneeli />


      {/* Kartta oikealle puolelle */}
      <div style={{ flexGrow: 1, height: "100vh" }}>
        <MapContainer
          center={[62.2415, 25.7209]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler onAddMarker={(newMarker) => 
            setMarkers((prev) => [...prev, newMarker])
          } />

          {markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={[marker.lat, marker.lng]}
              eventHandlers={{
                contextmenu: () => handleRemove(idx), // oikea klikkaus poistaa
              }}
            >
              <Popup>
                <div style={{ minWidth: "150px" }}>
                  <input
                    type="text"
                    value={marker.title}
                    onChange={(e) => handleChange(idx, "title", e.target.value)}
                    placeholder="Nimi"
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
                    value={marker.hinta}
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
                    value={marker.aika}
                    onChange={(e) => handleChange(idx, "aika", e.target.value)}
                    placeholder="Aika"
                    rows={1}
                    style={{ width: "100%" }}
                  />
                  )}


                  <select
                    value={marker.parkkityyppi || ""}
                    onChange={(e) =>
                      handleChange(idx, "parkkityyppi", e.target.value)
                    }
                    style={{ width: "100%", marginBottom: "5px" }}
                  >
                    <option value="">Valitse tyyppi...</option>
                    <option value="Kadunvarsi">Kadunvarsi</option>
                    <option value="Pysäköintihalli">Pysäköintihalli</option>
                    <option value="Parkkitalo">Parkkipaikka</option>
                    <option value="Muu">Muu</option>
                  </select>
                  <p style={{ fontSize: "12px", marginTop: "5px" }}>
                    (Poista oikealla klikkauksella)
                  </p>


                  <button
                  onClick={() => saveMarker(marker)}
                  >
                    Tallenna
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
