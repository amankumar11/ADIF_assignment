import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
