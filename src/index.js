import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <Router>

    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </Router>,
  document.getElementById('root')
);
