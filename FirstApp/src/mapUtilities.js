 export const saveMarker = async (marker, setMarkers) => {

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

      //päivittää paikalle id:n
      const normalizedMarker = {
        ...marker,
        _id: saved._id,
        sijainti: saved.sijainti || {
          lat: marker.lat,
          lng: marker.lng,
        },
      };
      setMarkers((prevMarkers) =>
        prevMarkers.map((m) =>
          m.lat === marker.lat && m.lng === marker.lng ? normalizedMarker : m
      )
    );
    } catch (err) {
      console.error("Virhe tallennuksessa", err);
    }
  };

/**
 * @param respose on vastays
 * @returns mfeiow
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