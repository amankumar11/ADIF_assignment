import React from 'react';

const FeatureCard = ({ feature }) => (
  <div className="feature-card">
    <h3>{feature.name}</h3>
    <p>Value: {feature.value}</p>
  </div>
);

export default FeatureCard; 