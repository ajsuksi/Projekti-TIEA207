import React from "react";

export default function Ilmoitus({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#00f900ff",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "1px solid #7ac27a",
        color: "#1d1b1bff",
        fontWeight: "bold",
        zIndex: 1000,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {message}
    </div>
  );
}
