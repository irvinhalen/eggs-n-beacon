import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, AuthContextType } from './AuthContext';

const PrivateRoutes = () => {
  const {user} = useAuth() as AuthContextType;
  return (
    user ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes;
