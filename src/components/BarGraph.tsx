import { BarChart } from "@mui/x-charts";

function BarGraph() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }]}
      series={[{ data: [50, 10, 30, 70, 20, 40, 60] }]}
      height={500}
    />
  )
}

export default BarGraph;
