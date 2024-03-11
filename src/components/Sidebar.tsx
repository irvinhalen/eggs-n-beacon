import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { AuthContextType, useAuth } from '../utils/AuthContext';

function Sidebar() {
    const {user, logoutUser} = useAuth() as AuthContextType;

    const handleLogout = (event:any) => {
        event.preventDefault();
        logoutUser();
    }

  return (
    <>
    {user ? (
        <div id='sidebar' className='sidebar shadow main-text'>
        <div className='sidebar-container'>
            <div className='sidebar-elements'>
                <h2 className='sidebar-title text-white mb-1'>MENU</h2>
                <div className='sidebar-list text-white'>
                    <div id='sidebar-information'>
                        <div className='sidebar-list-header'>
                            📁 Information
                        </div>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <div className='sidebar-list-item'>
                                Dashboard
                            </div>
                        </Link>
                    </div>
                    <div id='sidebar-sites'>
                        <div className='sidebar-list-header'>
                            🏗️ Sites
                        </div>
                        <Link to='/manage-sites' style={{ textDecoration: 'none' }}>
                            <div className='sidebar-list-item'>
                                Site Management
                            </div>
                        </Link>
                        <Link to='/add-site' style={{ textDecoration: 'none' }}>
                            <div className='sidebar-list-item'>
                                Site Registration
                            </div>
                        </Link>
                    </div>
                    <div id='sidebar-trucks'>
                        <div className='sidebar-list text-white'>
                            <div className='sidebar-list-header'>
                                🚛 Trucks
                            </div>
                            <Link to='/manage-trucks' style={{ textDecoration: 'none' }}>
                                <div className='sidebar-list-item'>
                                    Truck Management
                                </div>
                            </Link>
                            <Link to='/register-truck' style={{ textDecoration: 'none' }}>
                                <div className='sidebar-list-item'>
                                    Truck Registration
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <div className='sidebar-logout' onClick={handleLogout}>
                    Log Out
                </div>
            </Link>
        </div>
    </div>
    ):(
        ''
    )}
    </>
  )
}

export default Sidebar;
