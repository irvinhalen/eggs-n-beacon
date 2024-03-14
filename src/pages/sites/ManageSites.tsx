import SiteTable from '../../components/sites/SiteTable';
import '../../css/Sites.css';

function ManageSites() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-4 mb-1'>
          <h3 className='main-text site-header-text'>SITE MANAGEMENT</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col mb-2">
                <SiteTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageSites;