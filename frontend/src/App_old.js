import React, { useEffect, useState } from "react";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";
import api from "./api";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    setLoading(true);
    api.get("/photos")  // No auth header needed
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

  // Skip login page - authentication disabled

  return (
    <div className="App">
      <header className="App-header">
        <h1>📸 JSpotlight Photo App</h1>
        <p className="subtitle">AI-Powered Photo Library</p>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        <PhotoUpload onUpload={onUpload} />
        
        {loading ? (
          <div className="loading">Loading photos...</div>
        ) : (
          <PhotoGallery photos={photos} onDelete={onDelete} />
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by AI Image Recognition 🤖</p>
      </footer>
    </div>
  );
}

export default App;
