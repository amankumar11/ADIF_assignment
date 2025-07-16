import React, { useRef } from 'react';

const FileUpload = ({ onUpload, disabled }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={disabled}
      />
      <button onClick={() => fileInputRef.current.click()} disabled={disabled}>
        Upload File
      </button>
    </div>
  );
};

export default FileUpload; 