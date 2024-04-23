import BeaconTransactionTable from '../../components/beacons/BeaconTransactionTable';
import '../../css/Beacons.css';

function BeaconTransactions() {
  return (
    <>
        <div className='bg-div' />
        <div className='main_div'>
        <div className='px-4 py-3 mb-1'>
          <h3 className='main-text site-header-text'>BEACON TRANSACTION</h3>
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
