import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, AuthContextType } from './AuthContext';

const AdminRoutes = () => {
  const {user} = useAuth() as AuthContextType;
  return (
    user.role === 1 ? <Outlet /> : <Navigate to='/' />
  )
}

export default AdminRoutes;
