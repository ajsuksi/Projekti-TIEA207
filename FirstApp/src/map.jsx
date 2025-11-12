import { useState, useEffect } from "react";
import Paneeli from "./paneeli";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapClickHandler from "./AddMarker";
import MarkerPopup from "./AddPopup";
import { getMarkers } from "./mapUtilities";
import ViewPopup from "./ViewPopup";


export default function ParkingMap() {
 const [markers, setMarkers] = useState([]);
 //const [filteredTypes, setFilteredTypes] = useState(["Kadunvarsi", "Pysäköintihalli", "Parkkipaikka", "Muu"]);
 const [filters, setFilters] = useState({
    selectedTypes: ["Kadunvarsi", "Pysäköintihalli", "Parkkipaikka", "Muu"],
    showPaid: true,
    showFree: true,
    selectedPayments: ["Kortti", "Käteinen", "Moovy"],
 })

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

/*   const visibleMarkers = markers.filter((marker) =>
    !marker.tyyppi || filteredTypes.includes(marker.tyyppi)
  ); */


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
    <Paneeli onFilterChange={setFilters} />

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

          {markers.map((marker, i) => {
            // suodatus
            if (marker.tyyppi==="parkkityyppi" || filters.selectedTypes.includes(marker.tyyppi) && ((marker.maksu && filters.showPaid) || (!marker.maksu && filters.showFree)) && (!marker.maksu || (marker.maksutapa?.length === 0 || marker.maksutapa.some((t) => filters.selectedPayments.includes(t))))) {
              // varmistetaan, että lat/lng ovat numeroita
              const lat = marker.lat;
              const lng = marker.lng;
              if (typeof lat !== "number" && typeof lng !== "number") return null;

              return (
                <Marker
                  key={marker._id || i} /* jos ei id:tä, käytä indeksiä */
                  position={[lat, lng]}
                  eventHandlers={{ contextmenu: () => handleRemove(i) }}
                >
                  <Popup> 
                    {marker._id ? ( /* Jos on id, ViewPopup, muuten MarkerPopup */
                      <ViewPopup marker={marker} />
              ) : (
                      <MarkerPopup
                        marker={marker}
                        idx={i}
                        handleChange={handleChange}
                      />)
              }
                  </Popup>
                </Marker>
          );
        }
      return null;})}
        </MapContainer>
      </div>
    </div>
  );
}
