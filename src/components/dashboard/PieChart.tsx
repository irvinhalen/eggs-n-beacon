import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );

function PieChart({ soil_data }:{ soil_data:Array<{ beacon_id: number, truck_type: string, times_pinged_inside: number, date: string }> }) {
  const [dailySoil, setDailySoil] = useState<number[]>([]);
  const [dailyTotal, setDailyTotal] = useState<number>(0);

  useEffect(() => {
    const filtered_daily = soil_data.filter((soil_data) => soil_data.date == '03/18/2024');
  let [oneTonTotal, threeTonTotal, fiveTonTotal, tenTonTotal, fifteenTonTotal] = [0, 0, 0, 0, 0];

  for (let index=0; index<filtered_daily.length; index++){
    switch(filtered_daily[index].truck_type) {
      case "1-Ton":
        oneTonTotal = filtered_daily[index].times_pinged_inside * 1;
        break;
      case "3-Ton":
        threeTonTotal = filtered_daily[index].times_pinged_inside * 3;
        break;
      case "5-Ton":
        fiveTonTotal = filtered_daily[index].times_pinged_inside * 5;
        break;
      case "10-Ton":
        tenTonTotal = filtered_daily[index].times_pinged_inside * 10;
        break;
      case "15-Ton":
        fifteenTonTotal = filtered_daily[index].times_pinged_inside * 15;
        break;
      default:
        console.log("Truck not found");
    }
  }

  const dailyTotalArray = [oneTonTotal, threeTonTotal, fiveTonTotal, tenTonTotal, fifteenTonTotal];
  const dailyTotal = ( oneTonTotal + threeTonTotal + fiveTonTotal + tenTonTotal + fifteenTonTotal );
  setDailySoil(dailyTotalArray);
  setDailyTotal(dailyTotal);
  
  }, [soil_data])
  

  return (
    <Card className="shadow-sm border-0 p-1" style={{ height: '27rem' }}>
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="main-text">Daily Amount of Soil <span className="badge-date">2024/03/18</span></Card.Title>
      </Card.Header>
      <Card.Body style={{ position: 'relative' }}>
        <Pie
          data={{
            datasets: [{
                label: 'Soil in Tons',
                data: dailySoil,
                backgroundColor: ['#9197D0', '#6EB8C8', '#FFCF8B', '#CF7697', '#928985']
            }],
            labels: ['1-Ton Truck', '3-Ton Truck', '5-Ton Truck', '10-Ton Truck', '15-Ton Truck'],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend:{
                labels:{
                  usePointStyle: true,
                  pointStyle: 'circle'
                },
                position: 'left'
              }
            }
          }}
        />
      </Card.Body>
      <Card.Footer style={{ borderWidth: 0 }}>
        <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: {dailyTotal}</p></div>
      </Card.Footer>
    </Card>
  )
}

export default PieChart;
