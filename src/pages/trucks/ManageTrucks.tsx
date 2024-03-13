import TruckTable from '../../components/trucks/TruckTable';
import '../../css/Trucks.css';

function ManageTrucks() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
        <div className='px-3 pt-3 mb-3'>
          <h1 className='main-text'>TRUCK MANAGEMENT</h1>
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