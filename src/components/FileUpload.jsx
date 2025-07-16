import { FaUpload } from "react-icons/fa";

const FileUpload = ({ onUpload, disabled }) => (
  <label className="file-upload-label">
    <input
      type="file"
      accept="application/json"
      onChange={(e) => onUpload(e.target.files[0])}
      disabled={disabled}
    />
    <span className="file-upload-btn">
      <FaUpload style={{ marginRight: 8 }} /> Upload JSON
    </span>
  </label>
);

export default FileUpload;
