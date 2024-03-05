import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useEffect, useState } from 'react';

function Sidebar() {
    const [onDashboard, setOnDashboard] = useState<boolean>(false);
    const [onManageSites, setOnManageSites] = useState<boolean>(false);
    const [onAddSite, setOnAddSite] = useState<boolean>(false);
    const [onManageTrucks, setOnManageTrucks] = useState<boolean>(false);
    const [onRegisterTruck, setOnRegisterTruck] = useState<boolean>(false);

    useEffect(() => {
        let path:string = window.location.pathname;
        path = path.toLowerCase();
        if(path) {
            switch(path) {
                case '/login':
                    setOnDashboard(false);
                    setOnManageSites(false);
                    setOnAddSite(false);
                    setOnManageTrucks(false);
                    setOnRegisterTruck(false);
                    break;
                case '/':
                    setOnDashboard(true);
                    setOnManageSites(false);
                    setOnAddSite(false);
                    setOnManageTrucks(false);
                    setOnRegisterTruck(false);
                    break;
                case '/manage-sites':
                    setOnDashboard(false);
                    setOnManageSites(true);
                    setOnAddSite(false);
                    setOnManageTrucks(false);
                    setOnRegisterTruck(false);
                    break;
                case '/add-site':
                    setOnDashboard(false);
                    setOnManageSites(false);
                    setOnAddSite(true);
                    setOnManageTrucks(false);
                    setOnRegisterTruck(false);
                    break;
                case '/manage-trucks':
                    setOnDashboard(false);
                    setOnManageSites(false);
                    setOnAddSite(false);
                    setOnManageTrucks(true);
                    setOnRegisterTruck(false);
                    break;
                case '/register-truck':
                    setOnDashboard(false);
                    setOnManageSites(false);
                    setOnAddSite(false);
                    setOnManageTrucks(false);
                    setOnRegisterTruck(true);
                    break;
                default:
                    console.log('sidebar buttons not active');
            }
        }
    }, [])

    function activateDashboard() {
        setOnDashboard(true);
        setOnManageSites(false);
        setOnAddSite(false);
        setOnManageTrucks(false);
        setOnRegisterTruck(false);
    }

    function activateManageSites() {
        setOnDashboard(false);
        setOnManageSites(true);
        setOnAddSite(false);
        setOnManageTrucks(false);
        setOnRegisterTruck(false);
    }

    function activateAddSite() {
        setOnDashboard(false);
        setOnManageSites(false);
        setOnAddSite(true);
        setOnManageTrucks(false);
        setOnRegisterTruck(false);
    }
    
    function activateManageTrucks() {
        setOnDashboard(false);
        setOnManageSites(false);
        setOnAddSite(false);
        setOnManageTrucks(true);
        setOnRegisterTruck(false);
    }

    function activateRegisterTruck() {
        setOnDashboard(false);
        setOnManageSites(false);
        setOnAddSite(false);
        setOnManageTrucks(false);
        setOnRegisterTruck(true);
    }

  return (
    <div id='sidebar' className='sidebar shadow main-text'>
        <div className='sidebar-container'>
            <h2 className='sidebar-title mb-5 text-white'>MENU</h2>
            <div className='sidebar-list text-white'>
                <div id='sidebar-information'>
                    <div className='sidebar-list-header'>
                        📁 Information
                    </div>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className={ onDashboard ? `sidebar-list-item-active` : `sidebar-list-item`} onClick={activateDashboard}>
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div id='sidebar-sites'>
                    <div className='sidebar-list-header'>
                        🏗️ Sites
                    </div>
                    <Link to='/manage-sites' style={{ textDecoration: 'none' }}>
                        <div className={ onManageSites ? `sidebar-list-item-active` : `sidebar-list-item`} onClick={activateManageSites}>
                            Manage Sites
                        </div>
                    </Link>
                    <Link to='/add-site' style={{ textDecoration: 'none' }}>
                        <div className={ onAddSite ? `sidebar-list-item-active` : `sidebar-list-item`} onClick={activateAddSite}>
                            Add Sites
                        </div>
                    </Link>
                </div>
            </div>
            <div id='sidebar-trucks'>
                <div className='sidebar-list text-white'>
                    <div className='sidebar-list-header'>
                        🚛 Trucks
                    </div>
                    <Link to='/manage-trucks' style={{ textDecoration: 'none' }}>
                        <div className={ onManageTrucks ? `sidebar-list-item-active` : `sidebar-list-item`} onClick={activateManageTrucks}>
                            Manage Trucks
                        </div>
                    </Link>
                    <Link to='/register-truck' style={{ textDecoration: 'none' }}>
                        <div className={ onRegisterTruck ? `sidebar-list-item-active` : `sidebar-list-item`} onClick={activateRegisterTruck}>
                            Register Truck
                        </div>
                    </Link>
                </div>
            </div>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <div className='sidebar-logout' onClick={activateDashboard}>
                    Log Out
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar;
