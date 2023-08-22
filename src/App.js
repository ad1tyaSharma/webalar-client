import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuth();

  return (
   
    <Routes>
        <Route path="/" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
     }/>
        <Route path="/login" element={<Login/>} />
    </Routes>
   
  );
}

export default App;
