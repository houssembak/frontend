// components/AuthContext.js
import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const[role,setRole]=useState("");


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role'); // Récupérer le rôle du localStorage

    if (storedToken && storedUsername && storedRole) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setToken(storedToken);
      setRole(storedRole); // Initialiser le rôle
    }
  }, []);



  const login = (username, token,role) => {
    setIsAuthenticated(true);
    setUsername(username);
    setToken(token);
    setRole(role);
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role',role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setToken("");
    setRole("");
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, token,role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
