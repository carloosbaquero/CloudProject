import {Navigate, Outlet} from 'react-router-dom'

export const ProtectedRoute = ({ user, children, redirectTo="/signIn" }) => {
    if (!user) {
        alert('You need to Log In to access this site')
        return <Navigate to={redirectTo}/>
    }
    
    return children? children : <Outlet/>
}