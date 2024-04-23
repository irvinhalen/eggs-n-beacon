import TruckTable from '../../components/trucks/TruckTable';
import '../../css/Trucks.css';

function ManageTrucks() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-3 mb-1'>
          <h3 className='main-text site-header-text'>TRUCK MANAGEMENT</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col mb-2">
                <TruckTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageTrucks;