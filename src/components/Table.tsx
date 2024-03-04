import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { Card } from 'react-bootstrap';

function Table({ soil_data }:{ soil_data:Array<{ beacon_id: number, truck_type: string, times_pinged_inside: number, date: string }> }) {

  return (
    <Card className="shadow-sm border-0 h-100 p-1">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="dashboard-text">Soil Tracking Table <span className='badge-date'> 2024 </span></Card.Title>
      </Card.Header>
      <Card.Body style={{ position: 'relative' }}>
        <ReactTabulator
            data={soil_data}
            columns={columns}
            layout={"fitData"}
        />
      </Card.Body>
      <Card.Footer style={{ borderWidth: 0 }}>
        <div className="dashboard-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: 20XX</p></div>
      </Card.Footer>
    </Card>
  )
}

export default Table;

const columns = [
    {title:"ID", field:"beacon_id"},
    {title:"Weight Capacity of Truck", field:"truck_type"},
    {title:"Soil Delivery Occurance", field:"times_pinged_inside"},
    {title:"Date", field:"date"},
  ];
