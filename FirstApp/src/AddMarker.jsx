import {useMapEvents} from "react-leaflet";

//Lisää markerin
const MapClickHandler = ({ onAddMarker, isDisabled }) => {
  useMapEvents({
    click(e) {
      if (isDisabled) return; // Poista käytöstä kun väliaikainen merkki olemassa

      const newMarker = {
        osoite: "",
        tyyppi: "",
        maksu: false,
        hinta: "",
        maksutapa: [],
        aikarajoitus: null,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        lisatiedot: ""
      };
      onAddMarker(newMarker);
    },
  });

  return null;
};

export default MapClickHandler;