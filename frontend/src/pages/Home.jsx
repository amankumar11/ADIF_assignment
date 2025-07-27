import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import ProgressBar from "../components/ProgressBar";
import Toast from "../components/Toast";
import { FaTooth } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jsonExample, setJsonExample] = useState(`{
  "features": [
    { "name": "11", "value": 1 },
    { "name": "13", "value": 1 },
    { "name": "21", "value": 1 },
    { "name": "36", "value": 1 }
  ]
}`);
  const [copyStatus, setCopyStatus] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const handleFileUpload = async (selectedFile) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setToast({
        show: true,
        message: "File uploaded and features predicted!",
        type: "success",
      });
      // Navigate to results page with data
      navigate("/results", { state: { features: data.features } });
    } catch (error) {
      console.log(error);
      setToast({
        show: true,
        message: "Upload failed. Please try again.",
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonExample).then(() => {
      setCopyStatus("Copied!");
      setToast({
        show: true,
        message: "Example JSON copied to clipboard!",
        type: "success",
      });
      setTimeout(() => setCopyStatus(""), 1500);
    });
  };

  return (
    <div className="app-container">
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <FaTooth
            size={48}
            style={{ color: "var(--accent)", marginBottom: "1rem" }}
          />
          <h1>Welcome to Dental Cavity Prediction</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
            Upload your dental data to visualize cavity predictions
          </p>
        </div>

        <FileUpload onUpload={handleFileUpload} disabled={loading} />
        {loading && <ProgressBar text="Processing file..." />}

        <div className="input-info-box">
          <h3>Input Format Instructions</h3>
          <p>
            Please upload a JSON file with the following structure:
            <br />
            <ul>
              <li>
                <b>features</b>: An array of objects, each representing a tooth.
              </li>
              <li>
                <b>name</b>: The FDI Number of the tooth.
              </li>
              <li>
                <b>value</b>: <b>1</b> if the tooth has a cavity, <b>0</b> if
                the tooth is cavity-free.
              </li>
            </ul>
          </p>
          <p>Example:</p>
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <textarea
              style={{
                background: "#11151a",
                color: "var(--text-main)",
                padding: "10px",
                borderRadius: "5px",
                textAlign: "left",
                width: "97%",
                minHeight: "140px",
                fontFamily: "monospace",
                fontSize: "1em",
                resize: "vertical",
              }}
              value={jsonExample}
              onChange={(e) => setJsonExample(e.target.value)}
            />
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                background: "var(--accent2)",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleCopy}
              type="button"
            >
              Copy
            </button>
            {copyStatus && (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "70px",
                  color: "lime",
                  fontWeight: "bold",
                }}
              >
                {copyStatus}
              </span>
            )}
          </div>
          <small>
            You can edit the JSON in the above editor and copy it into a .json
            file.
          </small>
        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default Home;
