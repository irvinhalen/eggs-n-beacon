import '../css/ManageSites.css';
import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import { Button, ButtonBase } from '@mui/material';
import ReactDOMServer from 'react-dom/server';

function getSite() {
  console.log("test");
}

const viewFormat = (cell: any) => {
  // let  val = cell.getValue();

  return(
    "<button onclick=getSite() class='btn btn-primary py-0 px-1'>\
      View\
    </button>"
  );
};

function SiteTable() {
  return (
    <Card className="mx-5 site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="main-text">Site List</Card.Title>
      </Card.Header>
      <Card.Body>
        <ReactTabulator
            data={temp_data}
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
  {title: 'Options', field: 'id', width: '20%', formatter:viewFormat}
];

const temp_data = [
  { id: 1, project_name: 'Vertex', city: 'Townsville', town: 'Intown', barangay: 'Kamagong' },
  { id: 2, project_name: 'Apex', city: 'Cityscape', town: 'Uptown', barangay: 'Tisa' },
  { id: 3, project_name: 'Summit', city: 'Rune', town: 'Downtown', barangay: 'Lahug' },
  { id: 4, project_name: 'Alps', city: 'Ruin', town: 'Leftown', barangay: 'Luz' },
  { id: 5, project_name: 'Hi', city: 'Ruins', town: 'Rightown', barangay: 'Cogon' },
  { id: 6, project_name: 'Hey', city: '123', town: 'Own', barangay: 'Kalawisan' },
  { id: 7, project_name: 'Hiya', city: '098', town: 'ABC', barangay: 'Babag - 1' },
  { id: 8, project_name: 'Hello', city: 'ABC', town: '123', barangay: 'Carmen' },
  { id: 9, project_name: 'Howdy', city: '555', town: 'XYZ', barangay: 'Loboc' },
  { id: 10, project_name: 'Ho ho ho', city: 'Test', town: 'ZYX', barangay: 'Ubujan' },
  { id: 11, project_name: 'Teehee', city: 'Tickles', town: 'CBA', barangay: 'Manga' },
];