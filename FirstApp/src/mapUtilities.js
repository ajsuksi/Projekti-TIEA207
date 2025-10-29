 export const saveMarker = async (marker) => {

    /* const m = markers[index];
    if (!m) {
      console.error("Marker ei löytynyt indexillä", index);
      return;
    } */

    const payload = {
      tyyppi: marker.parkkityyppi,
      maksu: marker.maksullinen === "maksullinen",
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