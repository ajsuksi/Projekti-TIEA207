export default function ViewPopup({ marker, handleRemove }) {
  return (
    <div style={{ minWidth: "150px" }}>
      <h4 style={{ marginTop: 0 }}>{marker.tyyppi}</h4>
      <p>
        {marker.maksu ? "Maksullinen" : "Ilmainen"}<br />
        {marker.hinta && `Hinta: ${marker.hinta} €`}<br />
        {marker.maksutapa?.length > 0 && `Maksutavat: ${marker.maksutapa.join(", ")}`}<br />
        {marker.aikarajoitus && `Aikarajoitus: ${marker.aikarajoitus}`}<br />
        {marker.lisatiedot && `Lisätiedot: ${marker.lisatiedot}`}
      </p>
      <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Poistetaan marker:", marker._id);
                    handleRemove(marker._id);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "3px",
                    backgroundColor: "#da4e4eff",
                    color: "#000000ff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  >
                    Poista
                  </button>
    </div>
    
  );
}