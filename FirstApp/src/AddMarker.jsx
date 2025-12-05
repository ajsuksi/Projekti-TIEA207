import {useMapEvents} from "react-leaflet";
import { isWater } from "./isItWater";

//Lisää markerin
const MapClickHandler = ({ onAddMarker, isDisabled }) => {
  useMapEvents({
   async click(e) {
      if (isDisabled) return // Poista käytöstä kun väliaikainen merkki olemassa
      // Tarkista ennen markerin lisäämistä
      const onWater = await isWater(e.latlng.lat, e.latlng.lng);
      if (onWater) {
        alert("Et voi lisätä paikkaa veteen.");
        return;
      }
      

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