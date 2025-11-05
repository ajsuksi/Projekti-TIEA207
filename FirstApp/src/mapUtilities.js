 export const saveMarker = async (marker) => {

    const payload = {
      tyyppi: marker.parkkityyppi,
      maksu: marker.maksullinen === "maksullinen",
      hinta:marker.hinta,
      maksutapa: marker.maksutavat || [],
      aikarajoitus: marker.aika || null,
      sijainti: {
        lat: marker.lat,
        lng: marker.lng,
      },
      lisatiedot: null,
    };
    
    try {
      const res = await fetch("http://localhost:3001/api/places/", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      console.log("Marker saved", saved);
    } catch (err) {
      console.error("Virhe tallennuksessa", err);
    }
  };

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