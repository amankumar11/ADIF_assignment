import React, { useEffect } from "react";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  let borderColor = "var(--accent)";
  if (type === "success") borderColor = "var(--success)";
  if (type === "error") borderColor = "var(--danger)";

  return (
    <div
      className="toast"
      style={{
        borderColor,
        background: "#23272f",
        color: "var(--text-main)",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
