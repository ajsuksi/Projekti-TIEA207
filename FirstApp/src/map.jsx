import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ParkingMap() {
  return (
    <MapContainer center={[62.2415, 25.7209]} zoom={12} style={{ height: "100vh", width:"200vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}