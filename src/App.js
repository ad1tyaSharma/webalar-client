import  { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import jwtDecode from 'jwt-decode';


function App() {
  const { isAuthenticated,logout,login } = useAuth();
  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Check token expiration
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token has expired
        
        localStorage.removeItem('token');
        logout()
      } else {
        // Token is valid and not expired
        login()
      }
    } else {
      // No token in local storage
      logout()
    }
  }, []);
  return (
<>

    <Routes>
      
        <Route path="/" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
     }/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </>
  );
}

export default App;
