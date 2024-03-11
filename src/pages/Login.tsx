import { useState ,useEffect } from 'react';
import '../css/Login.css';
import login_photo from '../assets/login_photo.png';
import logo from '../assets/logo.png';
import { TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import { AuthContextType, useAuth } from '../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const {user, loginUser} = useAuth() as AuthContextType;
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
      if(user) {
        navigate('/');
      }
    }, [])

    const login = (event: any) => {
        event.preventDefault();
        let userInfo = {username, password}
        loginUser(userInfo);
    };

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
                                        <TextField label="Username" variant="outlined" size='small' onChange={(event) => {setUsername(event.target.value)}} />
                                        <TextField label="Password" type='password' variant="outlined" size='small' onChange={(event) => {setPassword(event.target.value)}} />
                                    </div>
                                    <p className='login-sub-text'>※ A display resolution of FHD (1920 x 1080) or higher is recommended.</p>
                                    <button onClick={login} type='submit' className='main-btn'>Login</button>
                                    <p className='login-sub-text'>Not registered? <Link to='/register'>Create an Account</Link></p>
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
                        <img src={login_photo} alt='dump truck at a construction site' className='truck'/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Login
  