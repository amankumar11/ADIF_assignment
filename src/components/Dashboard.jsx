import React from 'react';

const Dashboard = ({ features }) => (
  <div className="dashboard">
    <h2>Predicted Features</h2>
    <table className="feature-table">
      <thead>
        <tr>
          <th style={{color: "black"}}>Feature</th>
          <th style={{color: "black"}}>Value</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature, idx) => (
          <tr key={idx}>
            <td>{feature.name || feature.feature || 'N/A'}</td>
            <td>{feature.value !== undefined ? feature.value : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Dashboard; 