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

var eyeIcon = function(){
  return '<svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path fill="#1976d2" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"></path></svg>';
};

var pencilIcon = function(){
  return '<svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path fill="#388e3c" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path></svg>';
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
  {title: 'Project Name', field: 'project_name', width: '20%'},
  {
    title: 'Address',
    columns: [
      {title: 'City', field: 'city', width: '20%'},
      {title: 'Town', field: 'town', width: '20%'},
      {title: 'Barangay', field: 'barangay', width: '20%'},
    ]
  },
  {title: 'Number of Trucks', field: 'num_trucks', width: '10%'},
  {
    title: 'Options',
    columns: [
      {title: 'View', field: 'site_id', width: '5%', hozAlign: 'center', headerSort: false, formatter: eyeIcon,
      cellClick: function(e:any, cell:any) {
        alert("Printing row data for: " + cell.getRow().getData().site_id)
      }
    },
    {title: 'Edit', field: 'site_id', width: '5%', hozAlign: 'center', headerSort: false, formatter: pencilIcon,
      cellClick: function(e:any, cell:any){
        alert("Printing row data for: " + cell.getRow().getData().site_id)
      }
    }
    ]
  }
];
