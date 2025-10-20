import React, { useState } from "react";
import api from "./api";
import "./Login.css";

export default function Login({ setToken }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await api.post("/auth/login", { 
        username: user, 
        password: pass 
      });
      localStorage.setItem("jwt", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setError("Invalid username or password. Try user/pass");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>📸 JSpotlight</h1>
        <p className="login-subtitle">AI-Powered Photo Library</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input 
              placeholder="Username" 
              value={user} 
              onChange={e => setUser(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <input 
              placeholder="Password" 
              type="password" 
              value={pass} 
              onChange={e => setPass(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "🔐 Login"}
          </button>
          
          <p className="hint">Hint: username: user, password: pass</p>
        </form>
      </div>
    </div>
  );
}
