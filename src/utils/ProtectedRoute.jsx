import React from 'react'
import {useAuth} from '../context/AuthContext'
import {Navigate, useLocation} from "react-router-dom"


const ProtectedRoute = ({children}) => {
    const { isAuthenticated} = useAuth();

    let location = useLocation();
    //console.log(isAuthenticated);
    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children;

};

export default ProtectedRoute;