import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import TableSoil from "../components/TableBeacon";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function Home() {
  const [dailySoil, setDailySoil] = useState([]);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [weeklySoil, setWeeklySoil] = useState([]);
  const [weeklyTotal, setWeeklyTotal] = useState(0);

  useEffect(() => {
    const tempx = [5, 1, 3, 15, 7];
    let i=0;
    let lengthx = tempx.length;
    let sum=0;
    for(i=0; i<lengthx; i++){
      sum += tempx[i];
    }
    setDailySoil(tempx);
    setDailyTotal(sum);
  }, [])

  useEffect(() => {
    const tempy = [100, 500, 500, 700, 300, 200, 500];
    let i=0;
    let lengthy = tempy.length;
    let sum=0;
    for(i=0; i<lengthy; i++){
      sum += tempy[i];
    }
    setWeeklySoil(tempy);
    setWeeklyTotal(sum);
  }, [])
  
  return (
    <>
      <Navbar />
      <div style={{backgroundColor: '#f4f7f9'}}>
        <div className='px-3 pt-3 pb-2'>
          <h1 className='dashboard-text'>DASHBOARD</h1>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-sm-12 col-md-4 col-lg-4'>
              <Card className="shadow-sm border-0 h-100 p-1">
                <Card.Header style={{background: 'none'}}>
                  <Card.Title className="dashboard-text">Daily Amount of Soil</Card.Title>
                </Card.Header>
                <Card.Body style={{ position: 'relative' }}>
                  <PieChart dailyData={dailySoil} />
                </Card.Body>
                <Card.Footer style={{ borderWidth: 0 }}>
                  <div className="dashboard-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: {dailyTotal}</p></div>
                </Card.Footer>
              </Card>
            </div>
            <div className='col col-sm-12 col-md-8 col-lg-8'>
              <Card className="shadow-sm border-0 h-100 p-1">
                <Card.Header style={{background: 'none'}}>
                  <Card.Title className="dashboard-text">Weekly Amount of Soil (March 2024)</Card.Title>
                </Card.Header>
                <Card.Body>
                  <LineChart weeklyData={weeklySoil} />
                </Card.Body>
                <Card.Footer style={{ borderWidth: 0 }}>
                  <div className="dashboard-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: {weeklyTotal}</p></div>
                </Card.Footer>
              </Card>
            </div>
          </div>
          <div className="row">
            <Card className="shadow-sm m-2 border-0" style={{ width: '98vw' }}>
              <TableSoil tableData={temp_data}/>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </> 
  )
}

  export default Home

const temp_data = [
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/17/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/17/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/17/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/17/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/17/2023'},
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/18/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/18/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/18/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/18/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/18/2023'},
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/19/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/19/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/19/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/19/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/19/2023'},
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/20/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/20/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/20/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/20/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/20/2023'},
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/21/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/21/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/21/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/21/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/21/2023'},
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/22/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/22/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/22/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/22/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/22/2023'},
  {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: '10', timestamp: '03/23/2023'},
  {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: '7', timestamp: '03/23/2023'},
  {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: '5', timestamp: '03/23/2023'},
  {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: '3', timestamp: '03/23/2023'},
  {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: '1', timestamp: '03/23/2023'},
]