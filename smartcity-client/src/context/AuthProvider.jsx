import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { login as loginAPI } from "../service/api/authService";

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const setAuthData = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);

    try {
      const decoded = jwtDecode(access);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Invalid token:", err);
      clearAuthData();
    }
  };
  
  const clearAuthData = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const initializeAuth = () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedAccessToken) {
        try {
          setAuthData(storedAccessToken, storedRefreshToken || null);
        } catch (err) {
          console.error("Invalid token:", err);
          clearAuthData();
        }
      }
      setIsInitializing(false);
    };
    initializeAuth();
  }, []);

  const login = async (form) => {
   
      const {data} = await loginAPI(form);
      
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

      setAuthData(newAccessToken, newRefreshToken);

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      return data;
  };


  const logout = () => clearAuthData();

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
