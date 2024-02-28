import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

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
  return (
    <>
      <Line
        data={{labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [
            {
                label: 'Amount of Soil in Tons',
                data: [100, 500, 500, 700, 300, 200, 500],
                borderWidth: 3,
                tension: 0,
                borderColor: '#FFCF8B',
                backgroundColor: '#FFCF8B',
                pointBorderColor: 'black',
                pointBorderWidth: 2,
                borderJoinStyle: 'bevel',
            }
          ]
        }}
      />
      <div className="dashboard-text"><p className="mb-0 mt-3" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: 20XX</p></div>
    </>
  )
}

export default LineChart;
