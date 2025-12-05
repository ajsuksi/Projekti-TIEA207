import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

/**
 * Leafleting routingmachine, etsii reitin käyttäjän tämänhetkisestä sijainnista
 * haluttuun parkkipaikkaan.
 * @param {*} userLocation
 * @returns 
 */
export const RoutingMachine = ({ userLocation, routeDestination }) => {
  const map = useMap();
  useEffect(() => {
    let routingControl = null;
    if (routeDestination && userLocation) {
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),  
          L.latLng(routeDestination[0], routeDestination[1]),
        ],
        routeWhileDragging: true,
        createMarker: () => null,
      }).addTo(map);
    }
    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, routeDestination, userLocation]);
  return null;
};