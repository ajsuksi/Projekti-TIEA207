/**Nappula navigoinnista poistumista varten */

export default function ExitNavigationButton({onExit}){
    return (
     <button
      onClick={onExit}
      style={{
        position: "absolute",
        top: "15px",
        right: "20px",
        zIndex: 9999,
        padding: "10px 14px",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
      }}
    >
      Poistu navigoinnista
    </button>
);
}

