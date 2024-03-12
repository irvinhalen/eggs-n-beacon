import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function getSite() {
  console.log("test");
}

const viewFormat = (cell: any) => {
  let  val = cell.getValue();

  return(
    "<button onClick=getSite() class='btn btn-primary py-0 px-1'>"+ val + "</button>"
  );
};

function SiteTable() {
  const [listOfSites, setListOfSites] = useState([]);

  useEffect(() => {
    getSites();
  }, []);

  const getSites = () =>{
    Axios.get('http://localhost:3001/api/sites').then((response) => {
      setListOfSites(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        })          
      });
    });
  };
  return (
    <Card className="mx-5 site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="main-text">Site List</Card.Title>
      </Card.Header>
      <Card.Body>
        <ReactTabulator
            data={listOfSites}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default SiteTable;

const options = {
  layout: 'fitDataStretch',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns = [
  {title: 'Project Name', field: 'project_name', width: '20%'},
  {title: 'City', field: 'city', width: '20%'},
  {title: 'Town', field: 'town', width: '20%'},
  {title: 'Barangay', field: 'barangay', width: '20%'},
  {title: 'Number of Trucks', field: 'num_trucks', width: '10%'},
  {title: 'View', field: 'site_id', width: '10%', formatter:viewFormat}
];
