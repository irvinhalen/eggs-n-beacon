import '../../css/Navigation.css';
import temp_logo from '../../assets/logo.png'
import { AuthContextType, useAuth } from '../../utils/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

function Topbar() {
  const {user, logoutUser} = useAuth() as AuthContextType;
  
  const handleLogout = (event:any) => {
    event.preventDefault();
    logoutUser();
  }
  return (
    <>
    {user ? (
      <nav id='topbar' className='navbar main-text'>
        <div style={{ paddingLeft: '0.75rem' }}>
          <img src={temp_logo} alt='Eggs & Beacon' width='35rem' />&nbsp;Site Manager
        </div>
        <div id='profile-header-div'>
          <h4>{user.username}</h4>
          <div id='logout-div' onClick={handleLogout}>
            <LogoutIcon className='logout-icon' sx={{ transition: 'none' }} />
            <Link to='/login' className='logout-link'>
              Log Out
            </Link>
          </div>
        </div>
      </nav>
    ):(
      ''
    )}
    </>
  )
}

export default Topbar;
