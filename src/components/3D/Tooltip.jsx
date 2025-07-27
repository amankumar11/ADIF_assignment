import React from "react";

const Tooltip = ({ visible, x, y, text }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: x + 12,
        top: y + 12,
        background: "rgba(30,30,30,0.95)",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: 6,
        pointerEvents: "none",
        zIndex: 1000,
        fontSize: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {text}
    </div>
  );
};

export default Tooltip;
