import { useState ,useEffect } from 'react';
import '../../css/Authentication.css';
import login_photo from '../../assets/login_photo.jpg';
import logo from '../../assets/logo.png';
import { Button, TextField, ThemeProvider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card } from 'react-bootstrap';
import { AuthContextType, useAuth } from '../../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { blackTheme, authTheme } from '../../components/MaterialThemes';

function Login() {
    const {user, loginUser, loading} = useAuth() as AuthContextType;
    
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
        let userInfo = { username, password }
        loginUser(userInfo);
    };

    return (
        <>
        { user ? (
            ''
        )
        :
        (
            <div className='container-fluid bg-white main-text' style={{ position: 'fixed', zIndex: 3, top: 0 }}>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-6' style={{ padding: 0 }}>
                        <div className='card-wrapper'>
                            <Card style={{ borderWidth: 0, height: '95%', width: '95%', position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0 }}>
                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem', textAlign: 'center' }}>
                                    <Card.Title style={{ fontWeight: '700' }}><h1><img src={logo} alt='Site Manager Logo' height='70rem' />&nbsp;Site Manager</h1></Card.Title>
                                    <form style={{ display: 'inherit', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                                        <div className='input-div'>
                                            <ThemeProvider theme={blackTheme}>
                                                <TextField label="Username" variant="standard" onChange={(event) => {setUsername(event.target.value)}} />
                                                <TextField label="Password" type='password' variant="standard" onChange={(event) => {setPassword(event.target.value)}} />
                                            </ThemeProvider>
                                        </div>
                                        <p className='login-sub-text'>※ A display resolution of FHD (1920 x 1080) or higher is recommended.</p>
                                        {loading ? (
                                            <ThemeProvider theme={authTheme}>
                                                <LoadingButton loading variant='contained' sx={{width: '25%'}}>
                                                    LOGIN
                                                </LoadingButton>
                                            </ThemeProvider>
                                            
                                        ): (
                                            <ThemeProvider theme={authTheme}>
                                                <Button onClick={login} type='submit' variant='contained' sx={{width: '25%'}}>Login</Button>
                                            </ThemeProvider>
                                        )}
                                        <p className='login-sub-text'>Not registered? <Link to='/register' style={{ textDecoration: 'none' }}>Create an Account</Link></p>
                                    </form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-6' style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div className='auth_photo_wrapper'>
                            <img src={login_photo} alt='construction worker looking at the city lights' className='auth_photo'/>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
  }
  
  export default Login
  