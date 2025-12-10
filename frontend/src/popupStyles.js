// Yhteiset tyylit pop-upeille
import {createCallHandleChange, createHandleSave} from "./popupHandlers";

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

export  function viewPopupStyle (){

  const containerStyle = (darkMode)=> ( {
    minWidth: 220,
    padding: "12px",
    borderRadius: 12,
    background: darkMode ? "black" : "linear-gradient(180deg, #ffffff, #fafafa)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif",
    color: darkMode ? "white": "#111827",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  });

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

  const infoStyle = (darkMode)=>( { margin: 0, fontSize: 13, color: darkMode ? "white" : "#374151" });
  const smallInfo = (darkMode)=>( { fontSize: 12, color: darkMode ? "white" : "#6b7280", margin: 0 });

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

  return {
    containerStyle,
    headerStyle,
    titleStyle,
    badgeStyle,
    infoStyle,
    smallInfo,
    buttonRow,
    btnBase,
  };
};

export function AddPopupStyle(){
 
  const containerStyle = (darkMode)=>( {
    minWidth: 240,
    padding: 14,
    borderRadius: 12,
    background: darkMode? "black" : "linear-gradient(180deg, #ffffff, #fbfbfd)",
    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
    fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif",
    color: darkMode? "white":"#0f172a",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  });

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  };

  const titleStyle = { margin: 0, fontSize: 15, fontWeight: 700 };
  const badgeStyle = {
    fontSize: 12,
    padding: "4px 8px",
    //background: marker._id ? "#eef2ff" : "#fff7ed",
    //color: marker._id ? "#3730a3" : "#b45309",
    borderRadius: 999,
    border: "1px solid rgba(99,102,241,0.08)",
  };

  const labelStyle = (darkMode)=> ( { fontSize: 13, color: darkMode? "white": "#344054", margin: "6px 0 4px" });
  const inputStyle = (darkMode)=>({
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: darkMode? "black" : "1px solid #e6e9ef",
    fontSize: 13,
    boxSizing: "border-box",
  });

  const smallInfo = { fontSize: 12, color: "#6b7280", margin: "6px 0" };

  const buttonRow = { display: "flex", gap: 8, marginTop: 6 };
  const btnBase = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
  };

  return{
   containerStyle,
   headerStyle,
   titleStyle,
   badgeStyle,
   labelStyle,
   inputStyle,
   smallInfo,
   buttonRow,
   btnBase,
  };

};