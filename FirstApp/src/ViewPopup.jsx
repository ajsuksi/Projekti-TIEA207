export default function ViewPopup({ marker, onEdit }) {
  return (
    <div style={{ minWidth: "150px" }}>
      <h4 style={{ marginTop: 0, marginBottom: "8px", fontSize: "16px" }}>{marker.tyyppi}</h4>
        {marker.maksu !== undefined && (<p>{marker.maksu ? "Maksullinen" : "Ilmainen"}</p>)}
        {marker.hinta && (<p>Hinta: {marker.hinta}</p>)}
        {marker.maksutapa?.length > 0 && (<p>Maksutavat: {marker.maksutapa.join(", ")}</p>)}
        {marker.aikarajoitus && (<p>Aikarajoitus: {marker.aikarajoitus}</p>)}
        {marker.lisatiedot && (<p>Lisätiedot: {marker.lisatiedot}</p>)}
      <button
        onClick={() => onEdit(marker)}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "#BDAEA3",
          color: "black",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        >
        Muokkaa
      </button>
    </div>
  );
}