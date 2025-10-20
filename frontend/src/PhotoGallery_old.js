import React, { useState } from "react";
import api from "./api";
import "./PhotoGallery.css";

export default function PhotoGallery({ photos, onDelete }) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (photoId) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    setDeleting(photoId);
    try {
      await api.delete(`/photos/${photoId}`);  // No auth header needed
      onDelete(photoId);
    } catch (err) {
      alert("Failed to delete photo");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="gallery-empty">
        <h2>📷 No photos yet</h2>
        <p>Upload your first photo to get started!</p>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <h2>🖼️ Your Photo Gallery ({photos.length})</h2>
      
      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <div className="photo-image-wrapper">
              <img 
                src={`/${photo.filePath}`} 
                alt={photo.fileName} 
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" dy=".3em">No Image</text></svg>';
                }}
              />
            </div>
            
            <div className="photo-info">
              <h3 className="photo-filename">{photo.fileName}</h3>
              
              <div className="photo-date">
                📅 {new Date(photo.creationDate).toLocaleDateString()}
              </div>
              
              <div className="photo-tags">
                <strong>🏷️ AI Tags:</strong>
                <div className="tags-list">
                  {photo.tags && photo.tags.length > 0 ? (
                    photo.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))
                  ) : (
                    <span className="tag no-tags">No tags</span>
                  )}
                </div>
              </div>
              
              <button 
                className="delete-btn"
                onClick={() => handleDelete(photo.id)}
                disabled={deleting === photo.id}
              >
                {deleting === photo.id ? "🗑️ Deleting..." : "🗑️ Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
