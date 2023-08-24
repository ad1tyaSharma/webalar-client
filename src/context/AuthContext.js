import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setuser] = useState(null);
  const login = () => {
    // Logic to handle successful login
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    // Logic to handle logout
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsAuthenticated(false);
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user,setuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
