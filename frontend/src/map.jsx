import { useState, useEffect} from "react";
import Paneeli from "./paneeli";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapClickHandler from "./AddMarker";
import MarkerPopup from "./AddPopup";
import ViewPopup from "./ViewPopup";
import {useFilterMarkers } from "./Hooks/useFilterMarkers"
import Ilmoitus from "./ilmoitus";
import { greenMarker, redMarker, blueMarker, orangeMarker } from "./markerColors";
import InfoButton from "./InfoButton";
import ChatButton from "./ChatButton";
import { RoutingMachine } from "./Navigation/routing";
import { useUserLocation } from "./Hooks/useUserLocation";
import ExitNavigationButton  from "./Navigation/ExitNavigation";
import { useMarkers } from "./Hooks/useMarkers";
import { useMarkerActions } from "./Hooks/useMarkerActions";



export default function ParkingMap({ darkMode, setDarkMode }) {
 const [notice, setNotice] = useState("");
 const [routeDestination, setRouteDestination] = useState(null);
 const { userLocation } = useUserLocation();
 const {markers, setMarkers} = useMarkers();
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
  const {
    editingMarker,
    setEditingMarker,
    handleRemove,
    handleChange,
    handleEdit,
    handleEditingChange,
  } = useMarkerActions(setMarkers, setNotice);

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


  return (
     <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      
      <Ilmoitus message={notice}/>

    {/* Poistuminen navigoinnista*/}
    {routeDestination && (
   <ExitNavigationButton onExit={() => setRouteDestination(null)} />)}

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
