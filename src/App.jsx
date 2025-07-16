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
  const [jsonExample, setJsonExample] = useState(`{
  "features": [
    { "name": "11", "value": 1 },
    { "name": "13", "value": 1 },
    { "name": "21", "value": 1 },
    { "name": "36", "value": 1 }
  ]
}`);
  const [copyStatus, setCopyStatus] = useState('');

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

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonExample).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 1500);
    });
  };

  return (
    <div className="app-container">
      <h1>Feature Prediction Dashboard</h1>
      <FileUpload onUpload={handleFileUpload} disabled={loading} />
      {loading && <ProgressBar text="Processing file..." />}
      {!features && (
        <div className="input-info-box">
          <h3>Input Format Instructions</h3>
          <p>
            Please upload a JSON file with the following structure:<br/>
            <ul>
              <li><b>features</b>: An array of objects, each representing a tooth.</li>
              <li><b>name</b>: The FDI Number of the tooth.</li>
              <li><b>value</b>: <b>1</b> if the tooth has a cavity, <b>0</b> if the tooth is cavity-free.</li>
            </ul>
          </p>
          <p>Example:</p>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <textarea
              style={{
                background: 'black',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'left',
                width: '97%',
                minHeight: '140px',
                fontFamily: 'monospace',
                fontSize: '1em',
                resize: 'vertical',
              }}
              value={jsonExample}
              onChange={e => setJsonExample(e.target.value)}
            />
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                background: '#007bff',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleCopy}
              type="button"
            >
              Copy
            </button>
            {copyStatus && (
              <span style={{ position: 'absolute', top: '10px', right: '70px', color: 'lime', fontWeight: 'bold' }}>{copyStatus}</span>
            )}
          </div>
          <small>You can edit the JSON in the above editor and copy it into a .json file.</small>
        </div>
      )}
      {features && <Dashboard features={features.features} />}
      {features && <Mock3DView features={features.features} />}
    </div>
  );
}

export default App
