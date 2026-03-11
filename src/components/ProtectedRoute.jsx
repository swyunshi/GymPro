import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, profile } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
        if (profile.role === 'member') return <Navigate to="/member/dashboard" replace />;
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
