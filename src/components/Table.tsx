import 'react-tabulator/lib/styles.css';
import "react-tabulator/css/tabulator_simple.min.css";
import { ReactTabulator } from 'react-tabulator'
import { Card } from 'react-bootstrap';

function Table({ soil_data }:{ soil_data:Array<{ beacon_id: number, truck_type: string, times_pinged_inside: number, date: string }> }) {

  return (
    <Card className="shadow-sm border-0 h-100 p-1">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="main-text">Soil Tracking Table <span className='badge-date'> 2024 </span></Card.Title>
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

export default Table;

const columns = [
    {title:"ID", field:"beacon_id", width: '15%'},
    {title:"Weight Capacity of Truck", field:"truck_type", width: '35%'},
    {title:"Soil Delivery Occurance", field:"times_pinged_inside", width: '25%'},
    {title:"Date", field:"date", width: '25%'},
  ];
