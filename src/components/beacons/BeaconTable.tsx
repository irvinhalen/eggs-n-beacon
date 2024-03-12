import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function BeaconTable() {
  const [listOfBeacons, setListOfBeacons] = useState([]);

  useEffect(() => {
    getTrucks();
  }, []);

  const getTrucks = () =>{
    Axios.get('http://localhost:3001/api/beacons').then((response) => {
      setListOfBeacons(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        })          
      });
    });
  };

  return (
    <Card className="mx-5 site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="main-text">Beacon List</Card.Title>
      </Card.Header>
      <Card.Body>
        <ReactTabulator
            data={listOfBeacons}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default BeaconTable;

const options = {
  layout: 'fitDataStretch',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns = [
  {title: 'Beacon', field: 'beacon_name', width: '30%'},
  {title: 'License Plate', field: 'license_plate', width: '30%'},
  {title: 'Site', field: 'project_name', width: '40%'}
];
