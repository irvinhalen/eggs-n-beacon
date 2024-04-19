import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminRoutes from './utils/AdminRoutes';
import { AuthProvider } from './utils/AuthContext';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Sidebar from './components/navigation/Sidebar';
import Dashboard from './pages/information/Dashboard';
import ManageUsers from './pages/users/ManageUsers';
import ManageSites from './pages/sites/ManageSites';
import AddSite from './pages/sites/AddSite';
import ManageTrucks from './pages/trucks/ManageTrucks';
import ManageBeacons from './pages/beacons/ManageBeacons';
import TruckTransactions from './pages/trucks/TruckTransactions';
import BeaconTransactions from './pages/beacons/BeaconTransactions';

function App() {
  return (
    <>
      <div>
        <Router>
          <AuthProvider>
            <Sidebar />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/sites' element={<ManageSites />} />
                <Route path='/register-site' element={<AddSite />} />
                <Route path='/trucks' element={<ManageTrucks />} />
                <Route path='/register-truck' />
                <Route path='/truck-transaction' element={<TruckTransactions />} />
                <Route path='/beacons' element={<ManageBeacons/>} />
                <Route path='/beacon-transaction' element={<BeaconTransactions />} />
                <Route element={<AdminRoutes />}>
                  <Route path='/manage-users' element={<ManageUsers />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  )
}

export default App
