import TruckTransactionTable from '../../components/trucks/TruckTransactionTable';
import '../../css/Trucks.css';

function TruckTransactions() {
  return (
    <>
        <div className='bg-div' />
        <div className='main_div'>
        <div className='px-4 py-4 mb-1'>
          <h3 className='main-text site-header-text'>TRUCK TRANSACTION</h3>
        </div>
        <div className='container-fluid'>
            <div className='row'>
              <div className="col mb-2">
                  <TruckTransactionTable />
              </div>
            </div>
        </div>
        </div>
    </>  
  )
}

export default TruckTransactions;
