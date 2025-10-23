import { useState } from "react";
import Paneeli from "./paneeli";
import { MapContainer,TileLayer,Marker,Popup,useMapEvents, } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Lisää markerin
function AddMarker({ setMarkers }) {
  useMapEvents({
    click(e) {
      setMarkers((prev) => [
        ...prev,
        { position: e.latlng, title: "", description: "" },
      ]);
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

          <AddMarker setMarkers={setMarkers} />

          {markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={marker.position}
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


                  <input
                  type="button"
                  value="Tallenna"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
