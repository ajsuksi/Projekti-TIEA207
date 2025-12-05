import {useMapEvents} from "react-leaflet";
import { isWater } from "./isItWater";

//Lisää markerin
export default function MapClickHandler({onAddMarker }) {
  
  useMapEvents({
    async click(e) {
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
}