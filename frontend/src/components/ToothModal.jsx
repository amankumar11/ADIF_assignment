import React from "react";

const ToothModal = ({ open, onClose, toothInfo }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          color: "#222",
          borderRadius: 10,
          padding: 24,
          minWidth: 260,
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>Tooth Info</h3>
        <div>
          <b>FDI Number:</b> {toothInfo.id}
        </div>
        <div>
          <b>Type:</b> {toothInfo.type}
        </div>
        {toothInfo.value !== undefined && (
          <div>
            <b>Value:</b> {toothInfo.value}
          </div>
        )}
        <button style={{ marginTop: 16 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ToothModal;
