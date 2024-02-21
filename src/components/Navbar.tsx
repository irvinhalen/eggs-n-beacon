import { Avatar, Box, Stack, Typography } from '@mui/material';
import '../css/Navbar.css';
import goldman from '../assets/goldman.jpg';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav className='navbar'>
          <Stack direction='row' justifyContent='space-between' paddingTop={1} paddingBottom={1}>
            <Box marginLeft={2}>
              <Typography variant='h4'>
                <strong>Eggs and Beacon 📍</strong>
              </Typography>
            </Box>
            <Box marginRight={2}>
              <Link to='Login'>
                <Avatar alt='Goldman (3D illustration of a person wearing a gold tie and holding a gold suitcase)' src={ goldman } />
              </Link>
            </Box>
          </Stack>
        </nav>
    )
}

export default Navbar
