// components/RoleRoute.jsx
import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("role");

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    if (!allowedRoles.includes(userRole)) {
        return <div style={{color: 'red', textAlign: 'center', marginTop: '2rem'}}>Not authorized: Your role is <b>{userRole || 'unknown'}</b>. Allowed: {allowedRoles.join(', ')}</div>;
    }
    return children;
};

export default RoleRoute; 