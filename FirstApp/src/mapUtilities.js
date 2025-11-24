 export const saveMarker = async (marker) => {

    const payload = {
      osoite: marker.osoite,
      tyyppi: marker.tyyppi,
      maksu: marker.maksu === "maksu",
      hinta:marker.hinta,
      maksutapa: marker.maksutapa || [],
      aikarajoitus: marker.aika || null,
      sijainti: {
        lat: marker.lat,
        lng: marker.lng,
      },
      lisatiedot: marker.lisatiedot || null,
    };
    
    try {
      const res = await fetch("http://localhost:3001/api/places/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      console.log("Marker saved", saved);
      return saved;
    
    } catch (err) {
      console.error("Virhe tallennuksessa", err);
    }
  };

/**
 *palauttaa tietokannasta haetut paikat
 */
  export const getMarkers = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/places");
    if (!response.ok) {
      throw new Error("Virhe paikkojen haussa");
    }
    const data = await response.json();
    console.log("Haetut paikat:", data);
    return data;
  } catch (err) {
    console.error("Paikkojen hakeminen epäonnistui:", err);
    return [];
  }
};