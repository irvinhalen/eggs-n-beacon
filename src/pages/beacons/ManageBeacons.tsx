import BeaconTable from '../../components/beacons/BeaconTable';
import '../../css/Beacons.css';

function ManageTrucks() {
  return (
    <><div className='bg-div'></div>
      <div className='main_div'>
        <div className='px-3 pt-3 mb-3'>
          <h1 className='main-text'>BEACON MANAGEMENT</h1>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col mb-2">
                <BeaconTable />
            </div>
          </div>
        </div>
      </div></>
        
  )
}

export default ManageTrucks;