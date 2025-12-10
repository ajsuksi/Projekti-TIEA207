// Yhteiset tyylit pop-upeille

export const popupStyle = (darkMode) => ({
  position: "relative",
  minWidth: "150px",
  backgroundColor: darkMode ? "#2d2d2d" : "#ffffff",
  color: darkMode ? "#ffffff" : "#000000",
  padding: "10px",
  borderRadius: "4px"
});

export const inputStyle = (darkMode) => ({
  backgroundColor: darkMode ? "#333333" : "#ffffff",
  color: darkMode ? "#ffffff" : "#000000",
  border: darkMode ? "1px solid #555555" : "1px solid #cccccc",
  borderRadius: "4px",
  padding: "5px",
  width: "100%"
});

export const labelStyle = (darkMode) => ({
  color: darkMode ? "#ffffff" : "#000000",
  display: "block",
  marginBottom: "8px"
});

export const headingStyle = (darkMode) => ({
  marginTop: 0,
  marginBottom: "8px",
  fontSize: "16px",
  color: darkMode ? "#ffffff" : "#000000"
});

export const buttonStyle = {
  edit: (darkMode) => ({
    width: "100%",
    padding: "8px",
    backgroundColor: "#BDAEA3",
    color: "#000000",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginBottom: "8px"
  }),
  navigate: {
    width: "100%",
    padding: "8px",
    marginTop: "3px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "8px"
  },
  save: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#24af2eff",
    color: "#1d1b1bff",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginBottom: "8px"
  },
  delete: {
    width: "100%",
    padding: "8px",
    marginTop: "3px",
    backgroundColor: "#da4e4eff",
    color: "#000000ff",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none"
  }
};

export const textStyle = (darkMode) => ({
  color: darkMode ? "#cccccc" : "#333333"
});
