import { saveMarker, updateMarker } from "./mapUtilities";

//Jos muokataan olemassa olevaa markeria, handleChange on handleEditingChange

const isMarkerEmpty = (m) => {
  if (!m) return true;
  const hasText = (v) => typeof v === "string" && v.trim() !== "";
  if (hasText(m.osoite)) return false;
  if (hasText(m.tyyppi)) return false;
  if (hasText(m.hinta)) return false;
  if (hasText(m.aikarajoitus) || hasText(m.aika)) return false;
  if (hasText(m.lisatiedot)) return false;
  if (Array.isArray(m.maksutapa) && m.maksutapa.length > 0) return false;
  // maksu voi olla true/false/undefined — jos se on määritelty, pidetään se merkityksellisenä
  if (typeof m.maksu === "boolean") return false;
  return true;
};

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

      // Estä tallennus jos kaikki kentät ovat tyhjiä / ei-määriteltyjä
      if (!cleanedMarker._id && isMarkerEmpty(cleanedMarker)) {
        setNotice({ message: "Täytä vähintään yksi kenttä ennen tallentamista tai peruuta.", type: "info" });
        setTimeout(() => setNotice(null), 4000);
        return;
      }

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
          setNotice({ message: "Paikka päivitetty!", type: "success" });
          setTimeout(() => setNotice(null), 4000);
        } else {
          setNotice({ message: "Päivitys epäonnistui", type: "error" });
          setTimeout(() => setNotice(null), 5000);
        }

      } else {

        saved = await saveMarker(cleanedMarker);

        // Varmista, että tallennus palautti kelvollisen objektin / id:n
        if (saved && saved._id) {
          setMarkers(prev =>
            prev.map(m =>
              m.lat === cleanedMarker.lat && m.lng === cleanedMarker.lng
                ? { ...m, _id: saved._id }
                : m
            )
          );
          try { map.closePopup(); } catch (e) {}
          if (typeof onSave === "function") onSave();
          setNotice({ message: "Paikka tallennettu!", type: "success" });
          setTimeout(() => setNotice(null), 4000);
        } else {
          setNotice({ message: "Tallennus epäonnistui, lisää tietoja", type: "error" });
          setTimeout(() => setNotice(null), 5000);
        }
      }

    } catch (err) {
      console.error("Save error:", err);
      setNotice({ message: "Tallennus epäonnistui", type: "error" });
      setTimeout(() => setNotice(null), 5000);
    }
  };
};
