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
    <Line
        data={{labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Ping Inside',
            data: [15, 19, 3, 5, 2, 3, 17],
            borderWidth: 3,
            tension: 0,
            borderColor: '#6EB8C8',
            backgroundColor: '#6EB8C8',
            pointBorderColor: 'black',
            pointBorderWidth: 2,
            borderJoinStyle: 'bevel'
        },
        {
            label: 'Ping Outside',
            data: [5, 1, 7, 3, 2, 4, 6],
            borderWidth: 3,
            tension: 0,
            borderColor: '#CF7697',
            backgroundColor: '#CF7697',
            pointBorderColor: 'black',
            pointBorderWidth: 2,
            borderJoinStyle: 'bevel'
        }
        ]}
      }
    />
  )
}

export default LineChart;

const lineData = [
    {id: 1, first_name: 1000, last_name: 50, year: 2016},
    {id: 5, first_name: 5000, last_name: 500, year: 2017},
    {id: 69, first_name: 500, last_name: 350, year: 2018},
    {id: 15, first_name: 350, last_name: 15, year: 2019},
    {id: 8, first_name: 150, last_name: 151, year: 2020}
  ]
