import { Settings } from '@mui/icons-material';
import '../../css/Navigation.css';

function Missing() {
  return (
    <>
        <div className='bg-div' />
        <div className='main-div main-text'>
          <h1 className='header-text'>
            <div className='error-text-container'>
                4
              <span id='cog-container'><Settings id='animated-cog' sx={{ fontSize: '15rem' }} /></span>
                4
            </div>
          </h1>
          <h3>The page you're looking for can't be found.</h3>
        </div>
    </>
  )
}

export default Missing;