
export default function Paneeli ({ filters, availableTypes, onFreeChange, onTypeChange, filteredCount,onCostsChange, onPaymentMethodChange, availablePayments })  {
  return (
     <div
      style={{
        position: "absolute",
        zIndex: 1000,
        width: "15rem",
        left: 0,
        top: 0,
        height: "100vh",
        paddingLeft: "1rem",
        transform: "translateX(-11rem)", 
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "#ffffffff",
        color: "Black",
        display: "flex",
        flexDirection: "row",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(0)"; // Näytetään paneeli
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(-11rem)"; // Piilotetaan paneeli
      }}
    >
      <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3>Parkkipaikat</h3>
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
      <p style={{marginTop: "auto", fontSize: "0.8rem", color: "#555", paddingBottom: "1rem"}}>Disclaimer:<br/>
        Käyttö omalla vastuulla</p>
    </div>
    <div style={{ width: "4rem", display: "flex", flexDirection: "column", marginLeft: "auto"}}>
      <img src="/src/icons/logo.png" alt="logo" style={{ height: "5rem", width: "auto", alignSelf: "center", paddingRight: "1rem"}} />
      <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "1rem", marginBottom: "5rem"}}>
        <img src="/src/icons/burger.png" alt="burger" style={{ height: "3rem", width: "3rem" }} />
      </div>
    </div>
    </div>
  );
};
