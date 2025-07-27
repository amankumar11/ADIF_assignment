import React from "react";
import { FaUpload } from "react-icons/fa";

const FileUpload = ({ onUpload, disabled, accept = "application/json" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }

    e.target.value = "";
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-label">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
        />
        <span className={`file-upload-btn ${disabled ? "disabled" : ""}`}>
          <FaUpload style={{ marginRight: 8 }} />
          {disabled ? "Processing..." : "Upload JSON File"}
        </span>
      </label>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          marginTop: "0.5rem",
          textAlign: "center",
        }}
      >
        Supported format: JSON files only
      </p>
    </div>
  );
};

export default FileUpload;
