import React, { useEffect, useState } from "react";

export default function Ilmoitus({ message }) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
    if (!message) return;
    const t = setTimeout(() => {
      setVisible(false);
    }, message?.duration || 4000);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  const type = message?.type || "success";
  const colors = {
    success: { bg: "linear-gradient(90deg,#ecfdf5,#f0f9ff)", border: "#86efac", text: "#065f46", icon: "✅" },
    error: { bg: "linear-gradient(90deg,#fff1f2,#fff7ed)", border: "#fda4af", text: "#7f1d1d", icon: "❌" },
  }[type] || {};

  const containerStyle = {
    position: "absolute",
    top: 16,
    left: "50%",
    transform: `translateX(-50%) ${visible ? "translateY(0)" : "translateY(-6px)"}`,
    opacity: visible ? 1 : 0,
    transition: "transform 220ms ease, opacity 220ms ease",
    background: colors.bg,
    padding: "10px 14px",
    borderRadius: 12,
    border: `1px solid ${colors.border}`,
    color: colors.text,
    fontWeight: 600,
    zIndex: 1000,
    boxShadow: "0 8px 24px rgba(2,6,23,0.08)",
    display: "flex",
    alignItems: "center",
    gap: 10,
    minWidth: 220,
    maxWidth: "80vw",
    backdropFilter: "blur(6px)",
  };

  const iconStyle = {
    fontSize: 18,
    lineHeight: 1,
  };

  const textStyle = {
    flex: 1,
    fontSize: 14,
    margin: 0,
    wordBreak: "break-word",
  };

  const closeBtn = {
    background: "transparent",
    border: "none",
    color: colors.text,
    cursor: "pointer",
    fontSize: 16,
    padding: 6,
    borderRadius: 8,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={containerStyle}
      onClick={(e) => {
        e.stopPropagation();
        setVisible(false);
      }}
    >
      <div style={iconStyle} aria-hidden>
        {colors.icon}
      </div>
      <div style={textStyle}>{message?.message || message}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
        aria-label="Sulje ilmoitus"
        style={closeBtn}
      >
        ✕
      </button>
    </div>
  );
}
