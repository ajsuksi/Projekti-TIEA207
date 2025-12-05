
import { saveMarker, updateMarker } from "./mapUtilities";

//Jos muokataan olemassa olevaa markeria, handleChange on handleEditingChange

export const createCallHandleChange = (getMarker, idx, handleChange) => {
  return (field, value) => {
    const marker = getMarker(); 
    if (marker._id) {
      handleChange(field, value);
    } else {
      handleChange(idx, field, value);
    }
  };
};

export const createHandleSave = ({ getMarker, setMarkers, setNotice, onSave, map }) => {
  return async () => {
    try {
      let marker = getMarker();       
      let cleanedMarker = { ...marker };

      if (cleanedMarker.maksu === false) {
        cleanedMarker.hinta = null;
        cleanedMarker.maksutapa = [];
      } else if (cleanedMarker.maksu === true) {
        cleanedMarker.aikarajoitus = null;
      }

      let saved;

      if (cleanedMarker._id) {
        // Olemassa oleva marker
        saved = await updateMarker(cleanedMarker);

        if (saved) {
          setMarkers(prev =>
            prev.map(m =>
              m._id === cleanedMarker._id ? { ...cleanedMarker } : m
            )
          );

          try { map.closePopup(); } catch (e) {}

          if (typeof onSave === "function") onSave();
          setNotice("Paikka päivitetty!");
        }

      } else {

        saved = await saveMarker(cleanedMarker);

        setMarkers(prev =>
          prev.map(m =>
            m.lat === cleanedMarker.lat && m.lng === cleanedMarker.lng
              ? { ...m, _id: saved._id }
              : m
          )
        );
      // Sulje popup kartalta ennen että ViewPopup ei ilmesty
        try { map.closePopup(); } catch (e) {}

        if (typeof onSave === "function") onSave();
        setNotice("Paikka tallennettu!");
      }

      setTimeout(() => setNotice(""), 4000);

    } catch (err) {
      setNotice("Tallennus epäonnistui");
      setTimeout(() => setNotice(""), 5000);
    }
  };
};
