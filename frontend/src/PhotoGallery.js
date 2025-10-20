import React, { useState, useMemo } from "react";
import api from "./api";
import "./PhotoGallery.css";

export default function PhotoGallery({ photos, onDelete }) {
  const [deleting, setDeleting] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('all');

  // Extract all unique tags from photos
  const allTags = useMemo(() => {
    const tags = new Set();
    photos.forEach(photo => {
      photo.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [photos]);

  // Categorize tags into groups
  const petTags = useMemo(() => 
    allTags.filter(tag => 
      tag.toLowerCase().includes('cat') || 
      tag.toLowerCase().includes('dog') ||
      tag.toLowerCase().includes('pet') ||
      tag.toLowerCase().includes('tiger') ||
      tag.toLowerCase().includes('wolf') ||
      tag.toLowerCase().includes('fox')
    ), [allTags]);

  const natureTags = useMemo(() => 
    allTags.filter(tag => 
      tag.toLowerCase().includes('nature') || 
      tag.toLowerCase().includes('mountain') ||
      tag.toLowerCase().includes('tree') ||
      tag.toLowerCase().includes('sky')
    ), [allTags]);

  const handleDelete = async (photoId) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    setDeleting(photoId);
    try {
      await api.delete(`/photos/${photoId}`);
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
        <p>Upload your first photo to get started with AI-powered tagging!</p>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      {/* Smart Groups */}
      <div className="smart-groups">
        <div className="smart-groups-header">
          <h2 className="smart-groups-title">Smart Groups</h2>
        </div>
        
        <div className="group-tags">
          <button 
            className={`group-tag all ${selectedGroup === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('all')}
          >
            <span>📷</span> All
          </button>
          
          {petTags.length > 0 && (
            <button 
              className={`group-tag pets ${selectedGroup === 'pets' ? 'active' : ''}`}
              onClick={() => setSelectedGroup('pets')}
            >
              <span>🐾</span> Pets
            </button>
          )}
          
          {natureTags.length > 0 && (
            <button 
              className={`group-tag nature ${selectedGroup === 'nature' ? 'active' : ''}`}
              onClick={() => setSelectedGroup('nature')}
            >
              <span>🌲</span> Nature
            </button>
          )}
          
          <button className="group-tag people">
            <span>👥</span> People
          </button>
          <button className="group-tag documents">
            <span>📄</span> Documents
          </button>
          <button className="group-tag events">
            <span>🎉</span> Events
          </button>
        </div>
      </div>

      {/* AI Tags Section */}
      {allTags.length > 0 && (
        <div className="ai-tags-section">
          <h3 className="ai-tags-title">AI Tags</h3>
          <div className="ai-tags-grid">
            {allTags.map((tag, idx) => (
              <span key={idx} className="ai-tag">{tag}</span>
            ))}
          </div>
          <div className="section-divider"></div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <div className="photo-image-wrapper">
              <img 
                src={`/${photo.filePath}`} 
                alt={photo.fileName}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23f0f0f0" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" dy=".3em" font-family="Arial">No Image</text></svg>';
                }}
              />
            </div>
            
            <div className="photo-overlay">
              <div className="photo-actions">
                <button 
                  className="photo-action-btn delete"
                  onClick={() => handleDelete(photo.id)}
                  disabled={deleting === photo.id}
                  title="Delete photo"
                >
                  {deleting === photo.id ? '⏳' : '🗑️'}
                </button>
              </div>
              
              <div className="photo-info-overlay">
                <h3 className="photo-filename">{photo.fileName}</h3>
                <div className="photo-tags-overlay">
                  {photo.tags?.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="photo-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
