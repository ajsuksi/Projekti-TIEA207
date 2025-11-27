 export const saveMarker = async (marker) => {

    const payload = {
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
 * Päivittää olemassa olevan markerin tietokantaan
 */
export const updateMarker = async (marker) => {
  if (!marker._id) {
    console.error("Marker _id puuttuu");
    return null;
  }

  const payload = {
    osoite: marker.osoite,
    tyyppi: marker.tyyppi,
    maksu: !!marker.maksu,
    hinta: marker.hinta,
    maksutapa: marker.maksutapa || [],
    aikarajoitus: marker.aika || marker.aikarajoitus || null,
    sijainti: {
      lat: marker.lat,
      lng: marker.lng,
    },
    lisatiedot: marker.lisatiedot || null,
  };

  try {
    const res = await fetch(`http://localhost:3001/api/places/${marker._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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