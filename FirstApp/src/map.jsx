import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function AddMarker({ setMarkers }) {
  useMapEvents({
    click(e) {
      setMarkers((prev) => [
        ...prev,
        { position: e.latlng, title: "Uusi paikka", description: "" },
      ]);
    },
  });
  return null;
}

export default function ParkingMap() {
  const [markers, setMarkers] = useState([]);

  const handleRemove = (index) => {
    setMarkers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    setMarkers((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      )
    );
  };

  return (
    <MapContainer
      center={[62.2415, 25.7209]}
      zoom={12}
      style={{ height: "100vh", width: "200vh" }}
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
                onChange={(e) =>
                  handleChange(idx, "title", e.target.value)
                }
                placeholder="Otsikko"
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <textarea
                value={marker.description}
                onChange={(e) =>
                  handleChange(idx, "description", e.target.value)
                }
                placeholder="Kuvaus"
                rows={3}
                style={{ width: "100%" }}
              />
              <p style={{ fontSize: "12px", marginTop: "5px" }}>
                (Poista oikealla klikkauksella)
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
