// components/AuthRoute.jsx
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("accessToken") ? true : false;
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default AuthRoute;
