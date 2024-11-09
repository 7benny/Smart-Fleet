import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(decoded.user);
          const timeout = decoded.exp * 1000 - Date.now();
          setTimeout(() => {
            logout();
          }, timeout);
        }
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5001/register', formData);
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
      setIsAuthenticated(true);
      const timeout = decoded.exp * 1000 - Date.now();
      setTimeout(() => {
        logout();
      }, timeout);
    } catch (error) {
      throw error.response.data.msg || 'Registration failed';
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5001/login', formData);
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded.user);
      setIsAuthenticated(true);
      const timeout = decoded.exp * 1000 - Date.now();
      setTimeout(() => {
        logout();
      }, timeout);
    } catch (error) {
      throw error.response.data.msg || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
