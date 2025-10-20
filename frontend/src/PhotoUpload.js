import React, { useState } from "react";
import api from "./api";
import "./PhotoUpload.css";

export default function PhotoUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      setSuccess(false);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);

    try {
      const data = new FormData();
      data.append("file", file);
      const res = await api.post("/photos/upload", data);
      onUpload(res.data);
      
      // Reset form
      setFile(null);
      setPreview(null);
      setSuccess(true);
      e.target.reset();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <div className="upload-header">
        <div className="import-icon">+</div>
        <h2>Import</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-wrapper">
          <input 
            type="file" 
            onChange={handleFile} 
            accept="image/*"
            id="file-input"
            disabled={uploading}
          />
          <label 
            htmlFor="file-input" 
            className={`file-label ${file ? 'has-file' : ''}`}
          >
            {file ? (
              <>
                <span>📁</span>
                <span>{file.name}</span>
              </>
            ) : (
              <>
                <span>📷</span>
                <span>Choose an image to upload...</span>
              </>
            )}
          </label>
        </div>

        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        {error && <div className="error">❌ {error}</div>}
        {success && <div className="success">✅ Photo uploaded and tagged successfully!</div>}

        {file && (
          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? (
              <>
                <span>⏳</span>
                <span>Uploading & Analyzing...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Upload & Analyze</span>
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
}
