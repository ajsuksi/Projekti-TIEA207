
export default function Paneeli ({ filters, availableTypes, onFreeChange, onTypeChange, filteredCount,onCostsChange, onPaymentMethodChange, availablePayments })  {
  return (
     <div
      style={{
        position: "absolute",
        zIndex: 1000,
        width: "15vw",
        left: 0,
        top: 0,
        height: "100vh",
        borderRight: "1px solid #ccc",
        padding: "1rem",
        transform: "translateX(-9vw)", 
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "#141313ff",
        color: "White",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(0)"; // Näytetään paneeli
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(-12vw)"; // Piilotetaan paneeli
      }}
    >
      <h3>Parkkipaikat</h3>
      <h4>Rajaa paikkoja:</h4>
      
      {/* Maksullisuus*/}
      <label>
        <input
          type="checkbox"
          checked={filters.freeOnly}
          onChange={onFreeChange}
        />
        Vain ilmaiset
      </label>
      <br/>
      <label>
        <input
        type= "checkbox"
        checked={filters.vainMaksulliset}
        onChange={onCostsChange}
        />
        Vain maksulliset
      </label>
      
      {/* Tyyppi */}
      <h4>Tyyppi</h4>
      {availableTypes.map(type => (
        <label key={type} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={filters.valitutTyypit.includes(type)}
            onChange={onTypeChange(type)}
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}

      {/* Maksutapa */}
      <h4>Maksutapa</h4>
      {availablePayments.map(method => (
        <label key={method} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={filters.valitutMaksutavat.includes(method)}
            onChange={onPaymentMethodChange(method)}
          />
          {method.charAt(0).toUpperCase() + method.slice(1)}
        </label>
      ))}
      
      <p>Näytetään {filteredCount} paikkaa</p>
    </div>
  );
};
