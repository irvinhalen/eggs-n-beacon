import '../css/Login.css';
import brekkie from '../assets/brekkie.jpg';
import logo from '../assets/logo.png';
import { TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className='container-fluid bg-white main-text' style={{ position: 'fixed', zIndex: 3, top: 0 }}>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-6' style={{ padding: 0 }}>
                    <div className='card-wrapper'>
                        <Card className='shadow' style={{ borderWidth: 0, height: '95%', width: '95%', position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0 }}>
                            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem', textAlign: 'center' }}>
                                <Card.Title style={{ fontWeight: '700' }}><h1><img src={logo} alt='Eggs & Beacon' height='70rem' />&nbsp;Eggs & Beacon</h1></Card.Title>
                                <form style={{ display: 'inherit', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                                    <div className='input-div'>
                                        <TextField label="Username" variant="outlined" size='medium' />
                                        <TextField label="Password" type='password' variant="outlined" size='medium' />
                                    </div>
                                    <p className='login-sub-text'>※ A display resolution of FHD (1920 x 1080) or higher is recommended.</p>
                                    <Link to='/dashboard'><button className='main-btn'>Login</button></Link>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6' style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div style={{
                        backgroundColor: 'black',
                        maxHeight: '100vh',
                        overflow: 'hidden',
                    }}>
                        <img src={brekkie} alt='eggs and bacon' className='brekkie'/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Login
  