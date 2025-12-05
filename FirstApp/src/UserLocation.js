import { useState, useEffect } from "react";

/**
 * Hakee käyttäjän tämänhetkisen sijainnin kartalle
 * @returns palauttaa käyttäjän sijainnin
 */
export function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation ei ole tuettu selaimessa.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationError("Sijaintia ei voitu hakea. Tarkista käyttöoikeudet.");
      }
    );
  }, []);

  return { userLocation, locationError };
}