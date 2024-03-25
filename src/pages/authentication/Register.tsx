import '../../css/Authentication.css';
import { Button, TextField, ThemeProvider } from '@mui/material';
import { Card } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContextType, useAuth } from '../../utils/AuthContext';
import logo from '../../assets/logo.png';
import register_photo from '../../assets/register_photo.png';
import { blackTheme, authTheme } from '../../components/MaterialThemes';
import { LoadingButton } from '@mui/lab';

function Register() {
    const {user, registerUser, loading} = useAuth() as AuthContextType;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isMatch, setIsMatch] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
          navigate('/');
        }
      }, [])

    const register = (event:any) => {
        event.preventDefault();
        if (password === rePassword) {
            setIsMatch(true);
            let userInfo = { username, password, email };
            registerUser(userInfo);
        } else {
            setIsMatch(false);
        }
    };

    return (
        <div className='container-fluid bg-white main-text' style={{ position: 'fixed', top: 0 }}>
            <div className='row register-row'>
                <div className='col-sm-12 col-md-12 col-lg-6'>
                    <div className='card-wrapper'>
                        <Card className='h-100 w-100' style={{ borderWidth: 0 }}>
                            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                                <Card.Title className='register-header'>
                                    <div className='logo-div-register'>
                                        <img src={logo} alt='Site Manager Logo' />
                                    </div>
                                    <h3>Create an Account</h3>
                                    <h5>Enter your email below to create your account</h5>
                                </Card.Title>
                                <form style={{ display: 'inherit', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                                    <div className='input-div'>
                                        <ThemeProvider theme={blackTheme}>
                                            <TextField name='email' label="Email Address" variant='standard' size='small' onChange={(event) => {setEmail(event.target.value)}} autoComplete='off' />
                                            <TextField name='username' label="Username" variant='standard' size='small' onChange={(event) => {setUsername(event.target.value)}} autoComplete='off' />
                                            {isMatch ? (
                                                <Fragment>
                                                    <TextField name='password' label="Password" type='password' variant='standard' size='small' onChange={(event) => {setPassword(event.target.value)}} />
                                                    <TextField name='rePassword' label="Confirm Password" type='password' variant='standard' size='small' onChange={(event) => {setRePassword(event.target.value)}} />
                                                </Fragment>
                                            ):(
                                                <Fragment>
                                                    <TextField name='password' label="Password" type='password' variant='standard' size='small' onChange={(event) => {setPassword(event.target.value)}} error />
                                                    <TextField name='rePassword' label="Confirm Password" type='password' variant='standard' size='small' onChange={(event) => {setRePassword(event.target.value)}} error helperText='Passwords do not match.' />
                                                </Fragment>
                                            )}
                                            
                                        </ThemeProvider>
                                    </div>
                                    {loading ? (
                                        <ThemeProvider theme={authTheme}>
                                            <LoadingButton loading onClick={register} type='submit' variant='contained' sx={{width: '25%', marginTop: '1.5rem'}}>Sign Up</LoadingButton>
                                        </ThemeProvider>
                                    ): (
                                        <ThemeProvider theme={authTheme}>
                                            <Button onClick={register} type='submit' variant='contained' sx={{width: '25%', marginTop: '1.5rem'}}>Sign Up</Button>
                                        </ThemeProvider>
                                    )}
                                    <p className='login-sub-text'>Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Sign in here</Link></p>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='col-sm-0 col-md-0 col-lg-6 auth_photo_col'>
                    <div className='auth_photo_wrapper'>
                        <img src={register_photo} alt='construction worker looking at the city lights' className='auth_photo'/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Register;
