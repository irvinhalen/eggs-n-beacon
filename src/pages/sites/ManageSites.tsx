import { useState } from 'react';
import SiteMap from '../../components/dashboard/SiteMap';
import SiteTable from '../../components/sites/SiteTable';
import '../../css/Sites.css';
import { AuthContextType, useAuth } from '../../utils/AuthContext';

function ManageSites() {
  const { user } = useAuth() as AuthContextType;
  const [siteId, setSiteId] = useState(0);

  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-3 mb-1'>
          <h3 className='main-text site-header-text'>SITE MANAGEMENT</h3>
        </div>
        <div className='container-fluid'>
          { user.role === 1 ? (
          <div className='row'>
            <div className='col mb-2'>
              <SiteMap setSiteId={setSiteId} />
            </div>
          </div>
          ) : (
            ''
          ) }
          <div className='row'>
            <div className="col mb-2">
                <SiteTable siteId={siteId} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageSites;