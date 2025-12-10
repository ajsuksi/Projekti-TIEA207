export default function ViewPopup({ marker, onEdit, handleRemove, setRouteDestination }) {
  const containerStyle = {
    minWidth: 220,
    padding: "12px",
    borderRadius: 12,
    background: "linear-gradient(180deg, #ffffff, #fafafa)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif",
    color: "#111827",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  };

  const titleStyle = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.1,
  };

  const badgeStyle = {
    fontSize: 12,
    padding: "4px 8px",
    background: "#eef2ff",
    color: "#3730a3",
    borderRadius: 999,
    border: "1px solid rgba(99,102,241,0.12)",
  };

  const infoStyle = { margin: 0, fontSize: 13, color: "#374151" };
  const smallInfo = { fontSize: 12, color: "#6b7280", margin: 0 };

  const buttonRow = {
    display: "flex",
    gap: 8,
    marginTop: 6,
  };

  const btnBase = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  };

  const primary = { ...btnBase, background: "#2563eb", color: "white" };
  const neutral = { ...btnBase, background: "#f3f4f6", color: "#111827" };
  const danger = { ...btnBase, background: "#ef4444", color: "white" };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>{marker.tyyppi || "Paikka"}</h4>
        <div style={badgeStyle}>{marker.maksu ? "Maksullinen" : "Ilmainen"}</div>
      </div>

      <div>
        {marker.osoite && <p style={infoStyle}>📍 {marker.osoite}</p>}
        {marker.hinta && <p style={smallInfo}>💶 Hinta: {marker.hinta}</p>}
        {marker.maksutapa?.length > 0 && (
          <p style={smallInfo}>💳 Maksutavat: {marker.maksutapa.join(", ")}</p>
        )}
        {marker.aikarajoitus && <p style={smallInfo}>⏱️ Aikarajoitus: {marker.aikarajoitus}</p>}
        {marker.lisatiedot && <p style={smallInfo}>📝 {marker.lisatiedot}</p>}
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