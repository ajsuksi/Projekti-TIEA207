import {useMapEvents} from "react-leaflet";
import { isWater } from "./isItWater";

/**
 * MapClickHandler seuraa klikkauksia kartalla ja lisää uuden markerin. 
 * Ennen lisäämistä tarkistetaan ettei käyttäjällä ole jo kartalla tallentamatonta merkkiä
 * tarkistetaan myös ettei käyttäjä koita lisätä merkkiä veteen.
 * @param {function} onAddMarker uudenmarkerin lisäämisen funktio
 */
const MapClickHandler = ({ onAddMarker, isDisabled }) => {
  useMapEvents({
   async click(e) {
      if (isDisabled) return; 
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