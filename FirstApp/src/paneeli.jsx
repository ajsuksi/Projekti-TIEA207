
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
        borderRight: "1px solid #ffffffff",
        padding: "1rem",
        transform: "translateX(-9vw)", 
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "#ffffffff",
        color: "Black",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(0)"; // Näytetään paneeli
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(-12vw)"; // Piilotetaan paneeli
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3>Parkkipaikat</h3>
        <img src="/src/icons/logo.png" alt="logo" style={{ height: "2rem", width: "auto" }} />
      </div>
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
      <br/>
      <br/>
      <br/>
      <br/>
      <p>Disclaimer:
        Käyttö omalla vastuulla</p>


    </div>
  );
};
