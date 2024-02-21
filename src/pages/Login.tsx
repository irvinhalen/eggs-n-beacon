import '../css/Login.css';
import brekkie from '../assets/brekkie.jpg';
import { Grid, Box, Stack, Card, CardHeader, CardContent, TextField  } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    component="form"
                    flexDirection='column'
                    minHeight='100vh'
                    sx={{
                        '& > :not(style)': { m: 1, width: '25rem'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Card elevation={3} sx={{
                        padding: '1rem',
                        height: '90vh',
                        minWidth: '85%'
                    }}>
                        <CardHeader sx={{
                            marginTop: '2rem',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                        }}
                            title='Eggs & Beacon 📍'
                        />
                        <CardContent>
                                <Stack gap='0.5rem'>
                                    <TextField label="Username" variant="outlined" size='small' />
                                    <TextField label="Password" type='password' variant="outlined" size='small' />
                                    <Box display='flex' justifyContent='center' marginTop='1rem'>
                                        <Link to='/'><button className='main-btn'>LOGIN</button></Link>
                                    </Box>
                                </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box sx={{
                    backgroundColor: 'black',
                    maxHeight: '100vh',
                    overflow: 'hidden'
                }}>
                    <img src={brekkie} alt='eggs and bacon' className='brekkie'/>
                </Box>
            </Grid>
        </Grid>
    )
  }
  
  export default Login
  