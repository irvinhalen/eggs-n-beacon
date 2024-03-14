import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function LineChart({ soil_data }:{ soil_data:Array<{ beacon_id: number, truck_type: string, times_pinged_inside: number, date: string }> }) {
  const [weeklySoil, setWeeklySoil] = useState<number[]>([]);
  const [weeklyTotal, setWeeklyTotal] = useState<number>(0);

  useEffect(() => {
    const filtered_weekly = new Array();
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/17/2024'));
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/18/2024'));
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/19/2024'));
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/20/2024'));
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/21/2024'));
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/22/2024'));
    filtered_weekly.push(soil_data.filter(soil_data => soil_data.date == '03/23/2024'));

    const oneTonTotalDay = new Array();
    const threeTonTotalDay = new Array();
    const fiveTonTotalDay = new Array();
    const tenTonTotalDay = new Array();
    const fifteenTonTotalDay = new Array();
    const tonTotalDay = new Array();
    for(let index=0; index<filtered_weekly.length; index++){
      for(let i=0; i<filtered_weekly[index].length; i++){
        switch(filtered_weekly[index][i].truck_type) {
          case "1-Ton":
            oneTonTotalDay[index] = filtered_weekly[index][i].times_pinged_inside * 1;
            break;
          case "3-Ton":
            threeTonTotalDay[index] = filtered_weekly[index][i].times_pinged_inside * 3;
            break;
          case "5-Ton":
            fiveTonTotalDay[index] = filtered_weekly[index][i].times_pinged_inside * 5;
            break;
          case "10-Ton":
            tenTonTotalDay[index] = filtered_weekly[index][i].times_pinged_inside *  10;
            break;
          case "15-Ton":
            fifteenTonTotalDay[index] = filtered_weekly[index][i].times_pinged_inside * 15;
            break;
          default:
            console.log("Truck not found");
        };
      };
      tonTotalDay[index] = ( oneTonTotalDay[index] + threeTonTotalDay[index] + fiveTonTotalDay[index] + tenTonTotalDay[index] + fifteenTonTotalDay[index] );
    };

    const tempy = [tonTotalDay[0], tonTotalDay[1], tonTotalDay[2], tonTotalDay[3], tonTotalDay[4], tonTotalDay[5], tonTotalDay[6]];
    let i=0;
    let lengthy = tempy.length;
    let sum=0;
    for(i=0; i<lengthy; i++){
      sum += tempy[i];
    }
    setWeeklySoil(tempy);
    setWeeklyTotal(sum);
  }, [soil_data]);

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
        <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: {weeklyTotal}</p></div>
      </Card.Footer>
    </Card>
  )
}

export default LineChart;
