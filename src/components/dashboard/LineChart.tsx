import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Axios from "axios";

  interface SoilData {
    soil_amount: number;
    date: string;
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
  let pastSevenDays = getPastSevenDays();

  useEffect(() => {
    getLineChartData();
  }, []);

  useEffect(() => {
    groupTheData();
  }, [lineChartData])

  const getLineChartData = () =>{
    Axios.get('http://localhost:3001/api/dashboard').then((response) => {
      setLineChartData(() => {
        return response.data.map((entry:any) => {
          return {...entry}
        });
      });
    });
  };

  function groupTheData() {
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
        for(let i=0; i<pastSevenDays.length; i++) {
          let groupie = group.find((arr) => arr.date === pastSevenDays[i]);
          if (!groupie) {
            group.push({ project_name: group[i].project_name, soil_amount: 0, date: pastSevenDays[i] });
          }
        }
        group.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        if (index !== -1) {
          dataGroup[index] = group;
        }
      });
    }

    dataGroup = dataGroup.filter((arr) => arr.length > 0);
    setGroupedData(dataGroup);
  };

  function getPastSevenDays() {
    var pastDays = [];
    var today = new Date();
    
    for (var i = 0; i < 7; i++) {
      let pastDay = new Date(today);
      pastDay.setDate(today.getDate() - i);
      let month = (pastDay.getUTCMonth() + 1).toString();
      if (month.length === 1) {
        month = '0' + month;
      }
      const day = pastDay.getUTCDate();
      const year = pastDay.getUTCFullYear();
      const newDate = year + "-" + month + "-" + day;
      pastDays.push(newDate);
    }
    pastDays.reverse();
    return pastDays;
  }
  
  return (
    <Card className="shadow-sm border-0 p-1 h-100">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">
          Amount of Soil
        </Card.Title>
      </Card.Header>
      <Card.Body>
        { groupedData ?
        (
          <Line
            data={{
              labels: pastSevenDays,
              datasets: groupedData.map((row) => {
                return ({
                  label: row[0].project_name,
                  data: row.map((cell:SoilData) => cell.soil_amount),
                  tension: 0.2,
                  borderJoinStyle: 'round',
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
        ) : ('') }
      </Card.Body>
      {/* <Card.Footer className="border-0">
        <div className="main-text"><p className="mb-0" style={{ textAlign: 'right' }}>Total Amount of Soil in Tons: 20XX</p></div>
      </Card.Footer> */}
    </Card>
  )
}

export default LineChart;
