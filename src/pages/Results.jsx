import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Mock3DView from "../components/Mock3DView";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const features = location.state?.features;

  if (!features) {
    navigate("/");
    return null;
  }

  const handleDownloadResults = () => {
    const dataStr = JSON.stringify({ features }, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dental-predictions.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              background: "var(--border)",
              color: "var(--text-main)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.9rem",
            }}
          >
            <FaArrowLeft /> Back to Upload
          </button>
          <button
            onClick={handleDownloadResults}
            style={{
              background: "var(--accent2)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.9rem",
            }}
          >
            <FaDownload /> Download Results
          </button>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Dental Cavity Analysis Results
        </h2>
      </div>

      <div className="card">
        <Dashboard features={features} />
      </div>

      <div className="card">
        <Mock3DView features={features} />
      </div>
    </div>
  );
};

export default Results;
