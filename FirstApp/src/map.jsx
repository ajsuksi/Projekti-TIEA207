import { useState, useEffect } from "react";
import Paneeli from "./paneeli";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapClickHandler from "./AddMarker";
import MarkerPopup from "./AddPopup";
import { getMarkers } from "./mapUtilities";


export default function ParkingMap() {
 const [markers, setMarkers] = useState([]);

 //Hakee paikat ja muuttaa ne sopivaan muotoon
  useEffect(() => {
    const fetchData = async () => {
      const places = await getMarkers(); 
      const normalized = places.map((p) => {
          const lat = p.sijainti?.lat ?? p.lat ?? null;
          const lng = p.sijainti?.lng ?? p.lng ?? null;

          // jos lat/lng ei ole numero, palauta null 
          if (typeof lat !== "number" || typeof lng !== "number") return null;

          return {

            _id: p._id,
            tyyppi: p.tyyppi,
            maksu: p.maksu,
            hinta: p.hinta,
            maksutapa: p.maksutapa,
            aikarajoitus: p.aikarajoitus,
            lisatiedot: p.lisatiedot,
            lat,
            lng,
          };
        })
        .filter(Boolean); // poistaa kaikki null-arvot
      setMarkers(normalized);
    };

    fetchData();
  }, []);


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
     <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* Vasen paneeli */}
    <Paneeli />


      {/* Kartta oikealle puolelle */}
      <div style={{ height: "100vh", width: "100vw" }}>
        <MapContainer
          center={[62.2415, 25.7209]}
          zoom={12}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler onAddMarker={(newMarker) => 
            setMarkers((prev) => [...prev, newMarker])
          } />

          {markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={[marker.lat, marker.lng]}
              eventHandlers={{ contextmenu: () => handleRemove(idx),  }}
              >
              <Popup>
              <MarkerPopup
              marker={marker}
              idx={idx}
              handleChange={handleChange}
              />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
