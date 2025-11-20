import L from "leaflet";
import greenIconUrl from "./icons/marker-green.png";
import redIconUrl from "./icons/marker-red.png";
import blueIconUrl from "./icons/marker-blue.png";
import orangeIconUrl from "./icons/marker-orange.png";
import shadowUrl from "./icons/marker-shadow.png";

{/* Markereille tietynväriset iconit*/ }

const iconSettings = {
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: shadowUrl,
};

export const greenMarker = L.icon({
  ...iconSettings,
  iconUrl: greenIconUrl,
});

export const redMarker = L.icon({
  ...iconSettings,
  iconUrl: redIconUrl,
});

export const blueMarker = L.icon({
  ...iconSettings,
  iconUrl: blueIconUrl,
});

export const orangeMarker = L.icon({
  ...iconSettings,
  iconUrl: orangeIconUrl,
});

