import React, { useEffect, useState } from "react";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";
import api from "./api";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("all");

  useEffect(() => {
    setLoading(true);
    api.get("/photos")
      .then(r => {
        setPhotos(r.data);
        setError("");
      })
      .catch(err => {
        setError("Failed to load photos. Please try again.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const onUpload = (photo) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const onDelete = (photoId) => {
    setPhotos((prev) => prev.filter(p => p.id !== photoId));
  };

  return (
    <div className="App">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">JSpotlight</h1>
          <div className="user-profile">
            <div className="user-avatar">U</div>
          </div>
        </div>

        <nav className="nav-section">
          <div className="nav-item active">
            <span className="nav-icon">📚</span>
            <span>Library</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">⭐</span>
            <span>Favorites</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🏷️</span>
            <span>All Tags</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🗑️</span>
            <span>Trash</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <div className="top-controls">
            <div className="view-tabs">
              <button 
                className={`view-tab ${activeView === 'all' ? 'active' : ''}`}
                onClick={() => setActiveView('all')}
              >
                All Photos
              </button>
              <button 
                className={`view-tab ${activeView === 'albums' ? 'active' : ''}`}
                onClick={() => setActiveView('albums')}
              >
                Albums
              </button>
              <button 
                className={`view-tab ${activeView === 'shared' ? 'active' : ''}`}
                onClick={() => setActiveView('shared')}
              >
                Shared
              </button>
              <button 
                className={`view-tab ${activeView === 'explore' ? 'active' : ''}`}
                onClick={() => setActiveView('explore')}
              >
                Explore
              </button>
            </div>

            <div className="search-controls">
              <div className="search-bar">
                <span>🔍</span>
                <input type="text" placeholder="Search" />
                <span>🎤</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          {error && <div className="error-message">{error}</div>}

          <PhotoUpload onUpload={onUpload} />

          {loading ? (
            <div className="loading">Loading photos...</div>
          ) : (
            <PhotoGallery photos={photos} onDelete={onDelete} />
          )}
        </div>

        <div className="ai-toggle">
          <span>AI Auto-Tagging:</span>
          <div className="toggle-switch"></div>
          <span>ON</span>
        </div>
      </main>
    </div>
  );
}

export default App;
