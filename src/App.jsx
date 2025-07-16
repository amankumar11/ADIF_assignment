import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload';
import ProgressBar from './components/ProgressBar';
import Dashboard from './components/Dashboard';
import Mock3DView from './components/Mock3DView';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(null);

  // Handler for file upload
  const handleFileUpload = async (selectedFile) => {
    console.log(selectedFile);
    setFile(selectedFile);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      alert('Upload failed');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Feature Prediction Dashboard</h1>
      <FileUpload onUpload={handleFileUpload} disabled={loading} />
      {loading && <ProgressBar text="Processing file..." />}
      {features && <Dashboard features={features.features} />}
      {features && <Mock3DView features={features.features} />}
    </div>
  );
}

export default App
