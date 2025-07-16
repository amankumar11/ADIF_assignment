import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ text = 'Processing...' }) => (
  <div className="progress-bar-container">
    <div className="progress-bar">
      <div className="progress-bar-fill" />
    </div>
    <span>{text}</span>
  </div>
);

export default ProgressBar; 