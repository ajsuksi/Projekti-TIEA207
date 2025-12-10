
import { popupStyle, headingStyle, buttonStyle, textStyle, viewPopupStyle } from "./popupStyles";


export default function ViewPopup({ marker, onEdit, handleRemove, setRouteDestination, darkMode }) {
  const {
    containerStyle,
    headerStyle,
    titleStyle,
    badgeStyle,
    infoStyle,
    smallInfo,
    buttonRow,
    btnBase,
  } = viewPopupStyle ();

  const primary = { ...btnBase, background: "#2563eb", color: "white" };
  const neutral = { ...btnBase, background: "#f3f4f6", color: "#111827" };
  const danger = { ...btnBase, background: "#ef4444", color: "white" };

  return (
    <div style={containerStyle(darkMode)}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>{marker.tyyppi || "Paikka"}</h4>
        <div style={badgeStyle}>{marker.maksu ? "Maksullinen" : "Ilmainen"}</div>
      </div>

      <div>
        {marker.osoite && <p style={infoStyle (darkMode)}>📍 {marker.osoite}</p>}
        {marker.hinta && <p style={smallInfo (darkMode)}>💶 Hinta: {marker.hinta}</p>}
        {marker.maksutapa?.length > 0 && (
          <p style={smallInfo (darkMode)}>💳 Maksutavat: {marker.maksutapa.join(", ")}</p>
        )}
        {marker.aikarajoitus && <p style={smallInfo (darkMode)}>⏱️ Aikarajoitus: {marker.aikarajoitus}</p>}
        {marker.lisatiedot && <p style={smallInfo(darkMode)}>📝 {marker.lisatiedot}</p>}
      </div>

      <div style={buttonRow}>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(marker); }}
          style={primary}
        >
          Muokkaa
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); setRouteDestination([marker.lat, marker.lng]); }}
          style={neutral}
        >
          Navigoi
        </button>
      </div>

      <div style={{ marginTop: 6 }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Poistetaan marker:", marker._id);
            handleRemove(marker._id);
          }}
          style={danger}
        >
          Poista
        </button>
      </div>
    </div>
  );
}