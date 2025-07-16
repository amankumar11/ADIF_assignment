import React from "react";
import { FaTooth } from "react-icons/fa";

const Dashboard = ({ features }) => (
  <div className="dashboard">
    <h2>Predicted features</h2>
    <table className="feature-table">
      <thead>
        <tr>
          <th>Feature (FDI number)</th>
          <th>Value (Result)</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature, idx) => (
          <tr key={idx}>
            <td>{feature.name || feature.feature || "N/A"}</td>
            <td>
              {feature.value === 1 ? (
                <span
                  style={{
                    color: "#e53935",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FaTooth /> Cavity
                </span>
              ) : feature.value === 0 ? (
                <span
                  style={{
                    color: "#43a047",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FaTooth /> Healthy
                </span>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Dashboard;
