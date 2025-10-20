import axios from 'axios';

// Create axios instance with base URL
// In development, use proxy defined in package.json
// In production or when REACT_APP_API_URL is set, use that
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? (process.env.REACT_APP_API_URL || '') 
    : ''  // Use relative URLs in development to leverage proxy
});

export default api;
