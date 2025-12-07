import { useContext } from 'react';
import { AuthContext } from './context/authContext.jsx';
import { Navigate, Outlet } from 'react-router';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }
  return <Outlet />;
}