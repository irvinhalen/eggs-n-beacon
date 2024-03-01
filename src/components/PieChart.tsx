import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );

function PieChart({ dailyData }:{ dailyData:Array<number> }) {
  return (
      <Pie
        data={{
          datasets: [{
              data: dailyData,
              backgroundColor: ['#9197D0', '#6EB8C8', '#FFCF8B', '#CF7697', '#928985']
          }],
          labels: ['1-Ton Truck', '3-Ton Truck', '5-Ton Truck', '10-Ton Truck', '15-Ton Truck']
        }}
      />
  )
}

export default PieChart;
