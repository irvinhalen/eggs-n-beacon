import { Box, Stack } from '@mui/material';
import '../css/Navbar.css';

function Navbar() {

    return (
        <nav className='navbar sticky'>
          <Stack direction='row' justifyContent='space-between' paddingTop={1} paddingBottom={1}>
            <Box marginLeft={2}>
            <strong>Eggs and Beacon 📍</strong>
            </Box>
            <Box marginRight={2}>
              <span>Admin 👑</span>
            </Box>
          </Stack>
        </nav>
    )
}

export default Navbar
