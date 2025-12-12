import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if error is due to expired/invalid token
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      const currentPath = window.location.pathname;
      
      // Only redirect if not already on login/signup pages
      if (currentPath !== '/login' && currentPath !== '/signup' && currentPath !== '/') {
        // Clear tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
