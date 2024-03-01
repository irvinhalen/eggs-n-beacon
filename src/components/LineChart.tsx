import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function LineChart({ weeklyData }:{ weeklyData:Array<number> }) {
  return (
    <Line
      data={{labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
              label: 'Amount of Soil in Tons',
              data: weeklyData,
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
  )
}

export default LineChart;
