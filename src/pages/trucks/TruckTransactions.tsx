import TruckTransactionTable from '../../components/trucks/TruckTransactionTable';
import '../../css/Trucks.css';

function TruckTransactions() {
  return (
    <>
        <div className='bg-div' />
        <div className='main_div'>
        <div className='px-3 pt-3 mb-3'>
            <h1 className='main-text'>TRUCK TRANSACTIONS</h1>
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
