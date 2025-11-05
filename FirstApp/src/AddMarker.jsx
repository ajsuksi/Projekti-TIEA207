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
        sijainti: {
         lat: { type: Number, required: false },
         lng:  { type: Number, required: false },
        },
        lisatiedot: ""
      };
      onAddMarker(newMarker);
    },
  });
  return null;
}