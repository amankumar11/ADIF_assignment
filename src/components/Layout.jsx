import React from "react";
import { FaTooth } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <div className="app-bg">
      <header className="app-header">
        <FaTooth size={32} style={{ color: "var(--accent)" }} />
        <span className="app-title">Feature Prediction Dashboard</span>
      </header>
      {children}
    </div>
  );
};

export default Layout;
