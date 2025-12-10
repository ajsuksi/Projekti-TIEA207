 
 
/**---Makerin rakennus--- */
const buildPayload = (marker) =>({
      osoite: marker.osoite,
      tyyppi: marker.tyyppi,
      maksu: !!marker.maksu,
      hinta:marker.hinta,
      maksutapa: marker.maksutapa || [],
      aikarajoitus: marker.aika || marker.aikarajoitus || null,
      sijainti: {
        lat: marker.lat,
        lng: marker.lng,
      },
      lisatiedot: marker.lisatiedot || null,

});


 /**---Markerin tallennus--- */
 export const saveMarker = async (marker) => {
    try {
      const res = await fetch("http://localhost:3001/api/places/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(buildPayload(marker)),
      });
      const saved = await res.json();
      console.log("Marker saved", saved);
      return saved;
    
    } catch (err) {
      console.error("Virhe tallennuksessa", err);
    }
  };


/**---Markerin päivitys---*/
export const updateMarker = async (marker) => {
  if (!marker._id) {
    console.error("Marker _id puuttuu");
    return null;
  }

  try {
    const res = await fetch(`http://localhost:3001/api/places/${marker._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(marker)),
    });
    
    if (!res.ok) {
      throw new Error(`Backend error: ${res.status} ${res.statusText}`);
    }
    
    const text = await res.text();
    if (!text) {
      console.error("Backend palautti tyhjän vastauksen");
      return marker; // Palauta muutettu marker, koska päivitys näyttää onnistuneen
    }
    
    const updated = JSON.parse(text);
    console.log("Marker updated", updated);
    return updated;
  } catch (err) {
    console.error("Virhe päivityksessä", err);
    return null;
  }
};


/**Hakee tietokannasta markerit */
  export const getMarkers = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/places");
    if (!response.ok) throw new Error("Virhe paikkojen haussa");

    const data = await response.json();
    console.log("Haetut paikat:", data);
    return data;
  } catch (err) {
    console.error("Paikkojen hakeminen epäonnistui:", err);
    return [];
  }
};

