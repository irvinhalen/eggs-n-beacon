import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Axios from "axios";

  interface SoilData {
    soil_amount: number;
    in_time: Date;
    project_name: string;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function LineChart() {
  const [lineChartData, setLineChartData] = useState<Array<SoilData>>([]);

  useEffect(() => {
    getLineChartData();
  }, []);

  useEffect(() => {
    // lineChartData.map();
  }, [lineChartData])

  const getLineChartData = () =>{
    Axios.get('http://localhost:3001/api/dashboard').then((response) => {
      setLineChartData(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        })          
      });
    });
  };

  return (
    <Card className="shadow-sm border-0 p-1" style={{ height: '27rem' }}>
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">Weekly Amount of Soil <span className='badge-date'>2024, 03/17 - 03/23</span>  </Card.Title>
      </Card.Header>
      <Card.Body>
        <Line
      data={{labels: ['March 17', 'March 18', 'March 19', 'March 20', 'March 21', 'March 22', 'March 23'],
        datasets: [
          {
              label: 'Amount of Soil in Tons',
              data: weeklySoil,
              borderWidth: 3,
              tension: 0,
              borderColor: '#FFCF8B',
              backgroundColor: '#FFCF8B',
              pointBorderColor: 'black',
              pointBorderWidth: 2
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
      }}
    />
      </Card.Body>
      <Card.Footer style={{ borderWidth: 0 }}>
        <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: 20XX</p></div>
      </Card.Footer>
    </Card>
  )
}

export default LineChart;

const weeklySoil = [1, 2, 50, 5, 3, 15, 3];