import '../css/Navbar.css';
import goldman from '../assets/goldman.jpg';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className='navbar'>
          <div style={{ paddingLeft: '0.75rem' }}>
            <strong>Eggs & Beacon 📍</strong>
          </div>
          <Link to='Login'>
            <div style={{ paddingRight: '0.75rem' }}>
              <div id='avatar-crop' className='shadow-sm'>
                <img width='50rem' alt='Goldman (3D illustration of a person wearing a gold tie and holding a gold suitcase)' src={ goldman } />
              </div>
            </div>
          </Link>
        </nav>
    )
}

export default Navbar
