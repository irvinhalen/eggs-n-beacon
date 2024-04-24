import { useState } from 'react';
import SiteMap from '../../components/dashboard/SiteMap';
import SiteTable from '../../components/sites/SiteTable';
import '../../css/Sites.css';

function ManageSites() {
  const [siteId, setSiteId] = useState(0);

  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-3 mb-1'>
          <h3 className='main-text site-header-text'>SITE MANAGEMENT</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-4 mb-2'>
              <SiteMap setSiteId={setSiteId} />
            </div>
            <div className='col-lg-8 mb-2'>
              <SiteTable siteId={siteId} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageSites;