  import { useEffect,useState } from "react";
  import { getMarkers } from "../mapUtilities";

/**hakee datan tietokannasta */

export const useMarkers =()=>{
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const places = await getMarkers(); 
      const normalized = places.map((p) => {
          const lat = p.sijainti?.lat ?? p.lat ?? null;
          const lng = p.sijainti?.lng ?? p.lng ?? null;

          return {

            _id: p._id,
            osoite:p.osoite,
            tyyppi: p.tyyppi,
            maksu: !!p.maksu,
            hinta: p.hinta,
            maksutapa: p.maksutapa,
            aikarajoitus: p.aikarajoitus,
            lisatiedot: p.lisatiedot,
            lat,
            lng,
            isFree: !p.maksu,  
          };
        })
        .filter(Boolean); 
      setMarkers(normalized);
    };

    fetchData();
  }, []);
  return {markers,setMarkers};
}