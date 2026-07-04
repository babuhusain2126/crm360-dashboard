import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PublicRoute() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
