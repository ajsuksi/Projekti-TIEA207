import { popupStyle, headingStyle, buttonStyle, textStyle } from "./popupStyles";

export default function ViewPopup({ marker, onEdit, handleRemove, setRouteDestination, darkMode }) {
  return (
    <div style={popupStyle(darkMode)}>
      <h4 style={headingStyle(darkMode)}>{marker.tyyppi}</h4>
        {marker.osoite && (<p style={textStyle(darkMode)}>Osoite: {marker.osoite}</p>)}
        {marker.maksu !== undefined && (<p style={textStyle(darkMode)}>{marker.maksu ? "Maksullinen" : "Ilmainen"}</p>)}
        {marker.hinta && (<p style={textStyle(darkMode)}>Hinta: {marker.hinta}</p>)}
        {marker.maksutapa?.length > 0 && (<p style={textStyle(darkMode)}>Maksutavat: {marker.maksutapa.join(", ")}</p>)}
        {marker.aikarajoitus && (<p style={textStyle(darkMode)}>Aikarajoitus: {marker.aikarajoitus}</p>)}
        {marker.lisatiedot && (<p style={textStyle(darkMode)}>Lisätiedot: {marker.lisatiedot}</p>)}
      <button
        onClick={(e) => {onEdit(marker); e.stopPropagation();}}
        style={buttonStyle.edit(darkMode)}
        >
        Muokkaa
      </button>

      <button
        onClick={() => setRouteDestination([marker.lat, marker.lng])}
        style={buttonStyle.navigate}
      >
        Navigoi
      </button>
      
      <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Poistetaan marker:", marker._id);
                    handleRemove(marker._id);
                  }}
                  style={buttonStyle.delete}
                  >
                    Poista
                  </button>
    </div>
    
  );
}