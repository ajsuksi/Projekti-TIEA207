export default function ViewPopup({ marker }) {
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
    </div>
  );
}