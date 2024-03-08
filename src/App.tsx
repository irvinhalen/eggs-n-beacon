import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ManageSites from './pages/ManageSites';
import AddSite from './pages/AddSite';
import { AuthProvider, useAuth } from './utils/AuthContext';

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
                <Route path='/manage-sites' element={<ManageSites />} />
                <Route path='/add-site' element={<AddSite />} />
                <Route path='/manage-trucks' />
                <Route path='/register-truck' />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  )
}

export default App
