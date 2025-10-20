import React, { useState } from "react";
import api from "./api";
import "./PhotoUpload.css";

export default function PhotoUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
      
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

    try {
      const data = new FormData();
      data.append("file", file);
      const res = await api.post("/photos/upload", data);  // No auth header needed
      onUpload(res.data);
      
      // Reset form
      setFile(null);
      setPreview(null);
      e.target.reset();
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>📤 Upload New Photo</h2>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-wrapper">
          <input 
            type="file" 
            onChange={handleFile} 
            accept="image/*"
            id="file-input"
            disabled={uploading}
          />
          <label htmlFor="file-input" className="file-label">
            {file ? file.name : "Choose an image..."}
          </label>
        </div>

        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        {error && <div className="upload-error">{error}</div>}

        <button type="submit" disabled={!file || uploading}>
          {uploading ? "🔄 Uploading & Analyzing..." : "🚀 Upload & Analyze"}
        </button>
      </form>
    </div>
  );
}
