import '../css/Navbar.css';
import goldman from '../assets/goldman.jpg';
import temp_logo from '../assets/logo.png'

function Topbar() {

    return (
        <nav id='topbar' className='navbar main-text'>
          <div style={{ paddingLeft: '0.75rem' }}>
            <img src={temp_logo} alt='Eggs & Beacon' width='35rem' />&nbsp;Eggs & Beacon
          </div>
          <div style={{ paddingRight: '0.75rem' }}>
            <div id='avatar-crop' className='shadow-sm'>
              <img width='50rem' alt='Goldman (3D illustration of a person wearing a gold tie and holding a gold suitcase)' src={ goldman } />
            </div>
          </div>
        </nav>
    )
}

export default Topbar;
