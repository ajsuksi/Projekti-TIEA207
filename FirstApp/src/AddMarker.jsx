import {useMapEvents} from "react-leaflet";

//Lisää markerin
export default function MapClickHandler({onAddMarker }) {
  useMapEvents({
    click(e) {
      const newMarker = {
        tyyppi: "parkkityyppi",
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