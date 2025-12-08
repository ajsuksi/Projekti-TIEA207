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
import { greenMarker, redMarker, blueMarker, orangeMarker } from "./markerColors";
import { RoutingMachine } from "./routing";
import { useUserLocation } from "./UserLocation";
import InfoButton from "./InfoButton";
import ChatButton from "./ChatButton";



export default function ParkingMap({ darkMode, setDarkMode }) {
 const [markers, setMarkers] = useState([]);
 const [notice, setNotice] = useState("");
 const [editingMarker, setEditingMarker] = useState(null);
 const [routeDestination, setRouteDestination] = useState(null);
 const { userLocation } = useUserLocation();

 const {
    filters,
    handleFreeChange,
    handleTypeChange,
    availableTypes,
    filteredPlaces,
    handleCostsChange,
    handlePaymentMethodChange,
    availablePaymentMethods
  } = useFilterMarkers(markers);

// Esilataa ikonit suorituskyvyn parantamiseksi
useEffect(() => {
  const imagesToPreload = [
    "/src/icons/darkmode.png",
    "/src/icons/lightmode.png",
    "/src/icons/logo_dark.svg",
    "/src/icons/logo.svg",
    "/src/icons/burger_dark.svg",
    "/src/icons/burger.svg"
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, []);


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
            osoite:p.osoite,
            tyyppi: p.tyyppi,
            maksu: !!p.maksu,
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
      setMarkers((prev) => prev.filter((m) => m._id !== markerId));
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

  // Päivittää markerin kentän arvon
  const handleChange = (index, field, value) => {
    setMarkers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  //Asettaa markerin muokkaustilaan
  const handleEdit = (marker) => {
    setEditingMarker(marker);
  };

  //Muokattavan markerin kenttien päivitys
  const handleEditingChange = (field, value) => {
    const updated = { ...editingMarker, [field]: value };
    setEditingMarker(updated);
    //Päivitä myös markers-tilaa, jotta muutokset säilyvät
    setMarkers((prev) =>
      prev.map((m) => m._id === updated._id ? updated : m)
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
    onCostsChange={handleCostsChange}
    onPaymentMethodChange={handlePaymentMethodChange}
    availablePayments={availablePaymentMethods}
    filteredCount={filteredPlaces.length}
    darkMode={darkMode}
    setDarkMode={setDarkMode}
    />

      {/* Kartta oikealle puolelle */}
      <div style={{ height: "100vh", width: "100vw" }}>
        <MapContainer
          center={[62.2415, 25.7209]}
          zoom={12}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/*Routing machine navigointia varten*/}
          <RoutingMachine
          userLocation={userLocation}
          routeDestination={routeDestination}
          />

 
          <MapClickHandler onAddMarker={(newMarker) => 
            setMarkers((prev) => [...prev, newMarker])
          } 
          isDisabled={markers.some(m => !m._id)}
          />

          {filteredPlaces.map((marker, idx) => (
            <Marker
              key={marker._id || idx} /* jos ei id:tä, käytä indeksiä */
              position={[marker.lat, marker.lng]} 
              icon= { 
                marker.tyyppi === "Kadunvarsi 🟢"
                ? greenMarker
                : marker.tyyppi === "Pysäköintihalli 🔴"
                ? redMarker
                :marker.tyyppi ==="Parkkipaikka 🔵"
                ? blueMarker
                : orangeMarker
              }            
              >
                <Popup>  {editingMarker && editingMarker._id === marker._id ? (
                    <MarkerPopup // Aukeaa, jos muokataan tallennettua paikkaa
                    marker={editingMarker}
                    idx={markers.findIndex(m => m._id === marker._id)}
                    handleChange={handleEditingChange}
                    handleRemove={handleRemove}
                    setMarkers={setMarkers}
                    setNotice={setNotice}
                    onSave={() => setEditingMarker(null)}
                    darkMode={darkMode}
                    />
                  ) : marker._id ? (
                    <ViewPopup // Aukeaa, kun klikataan tallennettua paikkaa
                    marker={marker}
                    onEdit={handleEdit}
                    handleRemove={handleRemove}
                    setRouteDestination={setRouteDestination}
                    darkMode={darkMode}
                    />
                  ) :  (
                    <MarkerPopup // Aukeaa, kun lisätään uusi paikka
                    marker={marker}
                    idx={idx}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                    setMarkers={setMarkers}
                    setNotice={setNotice}
                    darkMode={darkMode}
                    />
                  )}
                </Popup>
              </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Oikeassa alareunassa chat- ja info-painikkeet */}
      <ChatButton darkMode={darkMode} />
      <InfoButton darkMode={darkMode} />
    </div>
  );
}
