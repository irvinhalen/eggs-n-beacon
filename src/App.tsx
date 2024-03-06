import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ManageSites from './pages/ManageSites';
import AddSite from './pages/AddSite';

function App() {

  return (
    <>
      <div>
        <Router>
          <Sidebar />
          <Topbar />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/manage-sites' element={<ManageSites />} />
            <Route path='/add-site' element={<AddSite />} />
            <Route path='/manage-trucks' />
            <Route path='/register-truck' />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
