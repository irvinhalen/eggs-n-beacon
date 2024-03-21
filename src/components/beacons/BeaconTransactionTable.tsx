import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function BeaconTransactionTable() {
  const [listOfBeaconTransactions, setListOfBeaconTransactions] = useState([]);

  useEffect(() => {
    getTruckTransactions();
  }, []);

  const getTruckTransactions = () =>{
    Axios.get('http://localhost:3001/api/beacon-transactions').then((response) => {
      setListOfBeaconTransactions(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        })          
      });
    });
  };

  return (
    <Card className=" site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">Transaction List</Card.Title>
      </Card.Header>
      <Card.Body>
        <ReactTabulator
            data={listOfBeaconTransactions}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default BeaconTransactionTable;

const options = {
  layout: 'fitDataStretch',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns = [
  {title: 'Project', field: 'project_name', width: '20%'},
  {title: 'License Plate', field: 'license_plate', width: '20%', headerSort: false},
  {title: 'Beacon', field: 'beacon_name', width: '20%'},
  {title: 'Direction', field: 'direction', width: '20%', headerSort: false},
  {title: 'Timestamp', field: 'transaction_time', width: '20%'}
];
