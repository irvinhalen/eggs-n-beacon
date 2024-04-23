import BeaconTable from '../../components/beacons/BeaconTable';
import '../../css/Beacons.css';

function ManageTrucks() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-3 mb-1'>
          <h3 className='main-text site-header-text'>BEACON MANAGEMENT</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col mb-2">
                <BeaconTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageTrucks;