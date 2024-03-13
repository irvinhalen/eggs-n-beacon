import BeaconTransactionTable from '../../components/beacons/BeaconTransactionTable';
import '../../css/Beacons.css';

function BeaconTransactions() {
  return (
    <>
        <div className='bg-div' />
        <div className='main_div'>
        <div className='px-3 pt-3 mb-3'>
            <h1 className='main-text'>BEACON TRANSACTIONS</h1>
        </div>
        <div className='container-fluid'>
            <div className='row'>
            <div className="col mb-2">
                <BeaconTransactionTable />
            </div>
            </div>
        </div>
        </div>
    </>  
  )
}

export default BeaconTransactions;
