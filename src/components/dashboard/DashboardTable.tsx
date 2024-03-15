import 'react-tabulator/lib/styles.css';
import "react-tabulator/css/tabulator_simple.min.css";
import { ReactTabulator } from 'react-tabulator'
import { Card } from 'react-bootstrap';

function DashboardTable() {

  return (
    <Card className="shadow-sm border-0 h-100 p-1">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">Soil Tracking Table <span className='badge-date'> 2024 </span></Card.Title>
      </Card.Header>
      <Card.Body style={{ position: 'relative' }}>
        <ReactTabulator
            height={'15rem'}
            data={soil_data}
            columns={columns}
            layout={"fitDataStretch"}
        />
      </Card.Body>
      <Card.Footer style={{ borderWidth: 0 }}>
        <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: 20XX</p></div>
      </Card.Footer>
    </Card>
  )
}

export default DashboardTable;

const columns = [
  {title:"ID", field:"beacon_id", width: '15%'},
  {title:"Weight Capacity of Truck", field:"truck_type", width: '35%'},
  {title:"Soil Delivery Occurance", field:"times_pinged_inside", width: '25%'},
  {title:"Date", field:"date", width: '25%'},
];

const soil_data = [{beacon_id: 1, truck_type: 'what', times_pinged_inside: 5, date: 'the'}];
