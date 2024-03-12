import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './utils/AuthContext';
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register';
import Sidebar from './components/navigation/Sidebar';
import Topbar from './components/navigation/Topbar';
import Dashboard from './pages/information/Dashboard'
import ManageSites from './pages/sites/ManageSites';
import AddSite from './pages/sites/AddSite';
import ManageTrucks from './pages/trucks/ManageTrucks';
import ManageBeacons from './pages/beacons/ManageBeacons';

function App() {
  return (
    <>
      <div>
        <Router>
          <AuthProvider>
            <Sidebar />
            <Topbar />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/sites' element={<ManageSites />} />
                <Route path='/register-site' element={<AddSite />} />
                <Route path='/trucks' element={<ManageTrucks />} />
                <Route path='/register-truck' />
                <Route path='/beacons' element={<ManageBeacons/>}/>
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  )
}

export default App
