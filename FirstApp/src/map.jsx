import { useState, useEffect} from "react";
import Paneeli from "./paneeli";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapClickHandler from "./AddMarker";
import MarkerPopup from "./AddPopup";
import { getMarkers } from "./mapUtilities";
import ViewPopup from "./ViewPopup";
import {useFilterMarkers } from "./filterMarkers"
import Ilmoitus from "./ilmoitus";


export default function ParkingMap() {
 const [markers, setMarkers] = useState([]);
 const [notice, setNotice] = useState("");

   const {
    filters,
    handleFreeChange,
    handleTypeChange,
    availableTypes,
    filteredPlaces,
  } = useFilterMarkers(markers);

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
            isFree: !p.maksu,  
          };
        })
        .filter(Boolean); // poistaa kaikki null-arvot
      setMarkers(normalized);
    };

    fetchData();
  }, []);

  //Poistaa markerin
  const handleRemove = async (markerId) => {
    if (!markerId) {
      console.error("Marker id puuttuu");
      return;
    }
    if (window.confirm("Haluatko varmasti poistaa parkkipaikan?")){      
      try {
        const response = await fetch(`http://localhost:3001/api/places/${markerId}`, {
          method: "DELETE",
        });
        if(!response.ok) throw new Error("Tietokannasta poisto epäonnistui");
        setMarkers((prev) => prev.filter((m) => m._id !== markerId));        
        console.log("Paikka poistettu onnistuneesti");
      } catch (error) {
        console.error("Virhe poistossa:", error);
        alert("Paikan poistaminen epäonnistui");
      }
    }
  };

  //valitse maksutavan
  const handleChange = (index, field, value) => {
    setMarkers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };


  return (
     <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      
      <Ilmoitus message={notice}/>

      {/* Vasen paneeli */}
    <Paneeli 
    filters={filters}
    availableTypes={availableTypes}
    onFreeChange={handleFreeChange}
    onTypeChange={handleTypeChange}
    filteredCount={filteredPlaces.length}
    />

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

          {filteredPlaces.map((marker, idx) => (
            <Marker
              key={marker._id || idx} /* jos ei id:tä, käytä indeksiä */
              position={[marker.lat, marker.lng]}              
              >
                <Popup>  {marker._id ? ( /* Jos on id, ViewPopup, muuten MarkerPopup */
                    <ViewPopup 
                    marker={marker}
                    handleRemove={handleRemove} />
                  ) :  (
                    <MarkerPopup
                    marker={marker}
                    idx={idx}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                    setMarkers={setMarkers}
                    setNotice={setNotice}
                    />
                  )}
                </Popup>
              </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
