import { useState } from 'react';
import {Navigate, Outlet} from 'react-router-dom'

export const ProtectedRoute = ({ children, redirectTo="/signIn" }) => {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = sessionStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    if (!accessToken) {
        alert('You need to Log In to access this site')
        return <Navigate to={redirectTo}/>
    }
    
    return children? children : <Outlet/>
}