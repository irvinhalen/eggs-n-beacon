import { Link, NavLink } from 'react-router-dom';
import '../../css/Navigation.css';
import logo from '../../assets/logo_sidebar.png';
import { AuthContextType, useAuth } from '../../utils/AuthContext';
import { CasesOutlined, MovingRounded, RuleOutlined, SpaceDashboardOutlined, UnfoldMoreRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ButtonBase, Popover } from '@mui/material';

function Sidebar() {
    const {user, logoutUser} = useAuth() as AuthContextType;
    const [userLetter, setUserLetter] = useState<String>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (user) {
            const usernameLetter:string = Array.from(user.username as string)[0];
            const capitalizedLetter:string = usernameLetter.toUpperCase();
            setUserLetter(capitalizedLetter);
        }
    }, [user]);
        
    const handleLogout = (event:any) => {
        event.preventDefault();
        handleClose();
        logoutUser();
    }

  return (
    <>
    {user ? (
        <div id='sidebar' className='sidebar shadow-sm main-text'>
            <div className='sidebar-container'>
                <div className='sidebar-elements'>
                    <div className='logo-div'>
                        <img src={logo} alt='Site Manager Logo' className='logo-photo' />
                    </div>
                    <div className='sidebar-list text-white'>
                        <div id='sidebar-information' className='sidebar-group'>
                            <NavLink to='/' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <SpaceDashboardOutlined className='sidebar-icons' />&nbsp;&nbsp;Dashboard
                            </NavLink>
                        </div>
                        { user.role === 1 ? (
                        <div id='sidebar-users' className='sidebar-group'>
                            <div className='sidebar-list-header'>
                                USERS
                            </div>
                            <NavLink to='/manage-users' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <MovingRounded className='sidebar-icons' />&nbsp;&nbsp;User Management
                            </NavLink>
                            <NavLink to='/approve-users' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <RuleOutlined className='sidebar-icons' />&nbsp;&nbsp;User Approval
                            </NavLink>
                        </div>
                        ):(
                            ''
                        )}
                        <div id='sidebar-sites' className='sidebar-group'>
                            <div className='sidebar-list-header'>
                                SITES
                            </div>
                            <NavLink to='/sites' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <MovingRounded className='sidebar-icons' />&nbsp;&nbsp;Site Management
                            </NavLink>
                        </div>
                        <div id='sidebar-trucks' className='sidebar-group'>
                            <div className='sidebar-list text-white'>
                                <div className='sidebar-list-header'>
                                    TRUCKS
                                </div>
                                <NavLink to='/trucks' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <MovingRounded className='sidebar-icons' />&nbsp;&nbsp;Truck Management
                                </NavLink>
                                <NavLink to='/truck-transaction' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <CasesOutlined className='sidebar-icons' />&nbsp;&nbsp;Truck Transaction
                                </NavLink>
                            </div>
                        </div>
                        <div id='sidebar-beacons' className='sidebar-group'>
                            <div className='sidebar-list-header'>
                                BEACONS
                            </div>
                            <NavLink to='/beacons' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <MovingRounded className='sidebar-icons' />&nbsp;&nbsp;Beacon Management
                            </NavLink>
                            <NavLink to='/beacon-transaction' className={({ isActive }) =>
                                isActive ? "sidebar-list-item-active" : "sidebar-list-item"
                                }>
                                    <CasesOutlined className='sidebar-icons' />&nbsp;&nbsp; Beacon Transaction
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='sidebar-sticky'>
                    <ButtonBase onClick={handleClick} sx={{ height: '100%', width: '100%' }}>
                        <div id='sidebar-profile'>
                            <div className='profile-user-div'>
                                <div className='profile-avatar'>
                                    <div className='profile-letter'>{ userLetter }</div>
                                </div>
                                <div className='profile_username'>{ user.username }</div>
                            </div>
                            <UnfoldMoreRounded sx={{ height: '1.25rem' }}  />
                        </div>
                    </ButtonBase>
                    <Popover
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{ padding:'1rem', width: '100%' }}
                    >
                        <div className='main-text' style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem', fontSize: 'small' }}>
                            Profile
                            <Link to='/login' onClick={handleLogout} style={{ color: '#E72423',textDecoration: 'none' }}>Logout</Link>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    ):(
        ''
    )}
    </>
  )
}

export default Sidebar;
