import React from 'react';
import FeatureCard from './FeatureCard';

const Dashboard = ({ features }) => (
  <div className="dashboard">
    <h2>Predicted Features</h2>
    <div className="feature-list">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} feature={feature} />
      ))}
    </div>
  </div>
);

export default Dashboard; 