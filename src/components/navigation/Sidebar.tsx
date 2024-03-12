import { Link, NavLink } from 'react-router-dom';
import '../../css/Navigation.css';
import { AuthContextType, useAuth } from '../../utils/AuthContext';

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
                            <NavLink to='/' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Dashboard</li>
                                    </ul>
                            </NavLink>
                        </div>
                        { user.role === 1 ? (
                        <div id='sidebar-users'>
                            <div className='sidebar-list-header'>
                                👤 Users
                            </div>
                            <NavLink to='/manage-user' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Manage</li>
                                    </ul>
                            </NavLink>
                            <NavLink to='/add-user' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Register</li>
                                    </ul>
                            </NavLink>
                            <NavLink to='/assign-user' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Assign</li>
                                    </ul>
                            </NavLink>
                            <NavLink to='/approve-user' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Pending</li>
                                    </ul>
                            </NavLink>
                        </div>
                        ):(
                            ''
                        )}
                        <div id='sidebar-sites'>
                            <div className='sidebar-list-header'>
                                🏗️ Sites
                            </div>
                            <NavLink to='/sites' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Management</li>
                                    </ul>
                            </NavLink>
                        </div>
                        <div id='sidebar-trucks'>
                            <div className='sidebar-list text-white'>
                                <div className='sidebar-list-header'>
                                    🚛 Trucks
                                </div>
                                <NavLink to='/trucks' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Management</li>
                                    </ul>
                                </NavLink>
                                <NavLink to='/truck-transaction' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Transaction</li>
                                    </ul>
                                </NavLink>
                            </div>
                        </div>
                        <div id='sidebar-beacons'>
                            <div className='sidebar-list-header'>
                                🥓 Beacons
                            </div>
                            <NavLink to='/beacons' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <ul>
                                        <li>Management</li>
                                    </ul>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <Link to='/login' className='sidebar-logout' onClick={handleLogout}>
                        Log Out
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
