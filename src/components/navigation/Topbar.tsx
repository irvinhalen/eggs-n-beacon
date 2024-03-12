import '../../css/Navigation.css';
// import goldman from '../assets/goldman.jpg';
import temp_logo from '../../assets/logo.png'
import { AuthContextType, useAuth } from '../../utils/AuthContext';

function Topbar() {
  const {user} = useAuth() as AuthContextType;
  
    return (
      <>
      {user ? (
        <nav id='topbar' className='navbar main-text'>
          <div style={{ paddingLeft: '0.75rem' }}>
            <img src={temp_logo} alt='Eggs & Beacon' width='35rem' />&nbsp;Eggs & Beacon
          </div>
          <div style={{ paddingRight: '0.75rem' }}>
            <h5>{user.username}</h5>
            {/* <div id='avatar-crop' className='shadow-sm'>
              <img width='50rem' alt='Goldman (3D illustration of a person wearing a gold tie and holding a gold suitcase)' src={ goldman } />
            </div> */}
          </div>
        </nav>
      ):(
        ''
      )}
      </>
    )
}

export default Topbar;
