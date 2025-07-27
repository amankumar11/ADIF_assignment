import React from "react";

const Legend = () => (
  <div
    style={{
      display: "flex",
      gap: 24,
      marginTop: 18,
      alignItems: "center",
      background: "rgba(24,28,32,0.85)",
      borderRadius: 8,
      padding: "10px 18px",
      boxShadow: "0 2px 8px rgba(0,188,212,0.08)",
      border: "1.5px solid var(--accent2)",
      width: "fit-content",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 18,
          height: 18,
          background: "#e53935",
          borderRadius: "50%",
          display: "inline-block",
          border: "2px solid #fff",
        }}
      ></span>
      <span style={{ color: "#fff" }}>Cavity</span>
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 18,
          height: 18,
          background: "#43a047",
          borderRadius: "50%",
          display: "inline-block",
          border: "2px solid #fff",
        }}
      ></span>
      <span style={{ color: "#fff" }}>Cavity-free</span>
    </span>
  </div>
);

export default Legend;
