import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';
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
    Legend,
    Colors
  );

function LineChart() {
  const [lineChartData, setLineChartData] = useState<Array<SoilData>>([]);
  const [groupedData, setGroupedData] = useState<Array<any>>([]);

  useEffect(() => {
    getLineChartData();
    groupTheData();
  }, []);

  const groupTheData = () => {
    const length: number = lineChartData.length;
    let dataGroup: Array<Array<SoilData>> = [];
    dataGroup = Array.from({ length }, () => []);

    if (length > 0) {
      const groupedData: Record<string, SoilData[]> = {};
      lineChartData.forEach((data) => {
        const projectName = data.project_name;
        if (!groupedData[projectName]) {
          groupedData[projectName] = [];
        }
        groupedData[projectName].push(data);
      });

      Object.values(groupedData).forEach((group) => {
        const index = dataGroup.findIndex((arr) => arr.length === 0);
        if (index !== -1) {
          dataGroup[index] = group;
        }
      });
    }

    dataGroup = dataGroup.filter((arr) => arr.length > 0);
    setGroupedData(dataGroup);

    // var date:Date = new Date(dataGroup[0][0].in_time)
    // console.log(date.toDateString());
  };

  const getLineChartData = () =>{
    Axios.get('http://localhost:3001/api/dashboard').then((response) => {
      setLineChartData(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        });
      });
    });
  };

  return (
    <Card className="shadow-sm border-0 p-1 h-100">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">
          Amount of Soil
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Line
      data={{labels: ['March 17', 'March 18', 'March 19', 'March 20', 'March 21', 'March 22', 'March 23'],
        datasets: groupedData.map((row) => {
          return ({
            label: row[0].project_name,
            data: row.map((cell:SoilData) => cell.soil_amount),
            tension: 0.2,
            borderWidth: 3,
            // borderColor: '#FFCF8B',
            // backgroundColor: '#FFCF8B',
            pointBorderColor: 'black',
            pointBorderWidth: 2
          });
        })        
      }}
      options={{
        maintainAspectRatio: false,
      }}
    />
      </Card.Body>
      <Card.Footer className="border-0">
        <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: 20XX</p></div>
      </Card.Footer>
    </Card>
  )
}

export default LineChart;

const chart_colors = ['#ffcf8b', '#8BFF95', '#8BBBFF', '#FF8BF5'];
