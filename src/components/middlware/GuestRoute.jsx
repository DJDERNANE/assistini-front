
// components/GuestRoute.jsx
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("accessToken") ? true : false;
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }
    return children;
};

export default GuestRoute;
