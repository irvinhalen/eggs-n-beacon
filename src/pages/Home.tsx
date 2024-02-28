import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import TableSoil from "../components/TableBeacon";
import LineChart from "../components/LineChart";
import { Card } from "react-bootstrap";

function Home() {
  return (
    <>
      <Navbar />
      <div style={{backgroundColor: '#f4f7f9'}}>
        <div className='px-3 pt-3 pb-2'>
          <h1 className='dashboard-text'>DASHBOARD</h1>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-sm-12 col-md-6 col-lg-6'>
              <Card className="shadow-sm border-0 h-100 p-1">
                <Card.Body>
                  <Card.Title className="dashboard-text">Daily Eggs and Bacon (Beacon)</Card.Title></Card.Body>
              </Card>
            </div>
            <div className='col col-sm-12 col-md-6 col-lg-6'>
              <Card className="shadow-sm border-0 p-1">
                <Card.Body>
                  <Card.Title className="dashboard-text">Weekly Eggs and Bacon (Beacon)</Card.Title>
                  <LineChart />
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row">
            <Card className="shadow-sm m-2 border-0">
              <TableSoil />
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </> 
  )
}

  export default Home
