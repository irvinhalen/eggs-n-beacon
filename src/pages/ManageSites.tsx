import SiteTable from '../components/SiteTable';
import '../css/ManageSites.css';

function ManageSites() {
  return (
    <><div className='bg-div'></div>
      <div className='main_div'>
        <div className='px-3 pt-3 mb-3'>
          <h1 className='main-text'>SITE MANAGEMENT</h1>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col mb-2">
                <SiteTable />
            </div>
          </div>
        </div>
      </div></>
        
  )
}

export default ManageSites;