import '../../css/Authentication.css';
import Axios from 'axios';
import { Divider, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContextType, useAuth } from '../../utils/AuthContext';

function Register() {
    const {user} = useAuth() as AuthContextType;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
          navigate('/');
        }
      }, [])

    const register = (event:any) => {
        event.preventDefault();
        Axios.post('http://localhost:3001/api/register', {
            username: username,
            password: password,
            email: email
        }).then((response:any) => {
            if(response.status === 200){
                navigate('/login');
            }else{
                console.log(response.error);
            }
        });
    };

    return (
        <div className='container-fluid bg-white main-text' style={{ position: 'fixed', zIndex: 3, top: 0 }}>
            <div className='card-wrapper'>
                <Card className='shadow w-100' style={{ borderWidth: 0, height: '95%', maxWidth: '35rem', position: 'absolute', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem', textAlign: 'center' }}>
                        <Card.Title style={{ fontWeight: '700' }}><h1>Create Account</h1></Card.Title>
                        <form style={{ display: 'inherit', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                            <div className='input-div'>
                                <TextField name='email' label="Email Address" variant="outlined" size='small' onChange={(event) => {setEmail(event.target.value)}} />
                                <TextField name='username' label="Username" variant="outlined" size='small' onChange={(event) => {setUsername(event.target.value)}} />
                                <Divider sx={{ opacity: 100 }} />
                                <TextField name='password' label="Password" type='password' variant="outlined" size='small' onChange={(event) => {setPassword(event.target.value)}} />
                                <TextField name='re_password' label="Confirm Password" type='password' variant="outlined" size='small' />
                            </div>
                            <button onClick={register} className='main-btn'>Register</button>
                            <p className='login-sub-text'>Already have an account? <Link to='/login'>Sign in</Link></p>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
  }
  
  export default Register;
