import { Card } from "react-bootstrap";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";

function TruckTransactionTable() {
  const [listOfTruckTransactions, setListOfTruckTransactions] = useState([]);

  useEffect(() => {
    getTruckTransactions();
  }, []);

  const getTruckTransactions = () =>{
    Axios.get('http://localhost:3001/api/truck-transactions').then((response) => {
      setListOfTruckTransactions(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        })          
      });
    });
  };

  return (
    <Card className="mx-5 site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="main-text">Transaction List</Card.Title>
      </Card.Header>
      <Card.Body>
        <ReactTabulator
            data={listOfTruckTransactions}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default TruckTransactionTable;

const testTickleZ = (cellData:any) => {
  alert(cellData);
}

const ViewFormat = (props:any) => {
  let deezNuts = props.cell.getData();
  deezNuts = deezNuts.truck_transaction_id;
  return (
    <Button variant='contained' color='primary' onClick={() => {testTickleZ(deezNuts)}}>
      <Visibility />
    </Button>
  );
}

const EditFormat = (props:any) => {
  let deezNuts = props.cell.getData();
  deezNuts = deezNuts.truck_transaction_id;
  return (
    <Button variant='contained' color='success' onClick={() => {testTickleZ(deezNuts)}}>
      <Edit />
    </Button>
  );
}

const options = {
  layout: 'fitDataStretch',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns = [
  {title: 'Project', field: 'project_name', width: '17%'},
  {title: 'License Plate', field: 'license_plate', width: '15%', headerSort: false},
  {
    title: 'Direction',
    
    columns: [
      {title: 'Inside', field: 'in', width: '7%', hozAlign: 'center', headerSort: false, formatter: 'tickCross'},
      {title: 'Outside', field: 'out', width: '7%', hozAlign: 'center', headerSort: false, formatter: 'tickCross'}
    ]
  },
  {title: 'Amount of Soil', field: 'soil_amount', width: '12%'},
  {
    title: 'Timestamp',
    columns: [
      {title: 'Inside', field: 'in_time', width: '17%'},
      {title: 'Outside', field: 'out_time', width: '17%'}
    ]
  },
  {
    title: 'Options',
    columns: [
      {title: 'View', field: 'truck_transaction_id', width: '4%', hozAlign: 'center', headerSort: false, formatter: reactFormatter(<ViewFormat />)},
      {title: 'Edit', field: 'truck_transaction_id', width: '4%', hozAlign: 'center', headerSort: false, formatter: reactFormatter(<EditFormat />)}
    ]
  }
];
