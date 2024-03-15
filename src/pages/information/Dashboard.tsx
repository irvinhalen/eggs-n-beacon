import '../../css/Dashboard.css';
import DashboardTable from "../../components/dashboard/DashboardTable";
import LineChart from "../../components/dashboard/LineChart";
import PieChart from "../../components/dashboard/PieChart";

function Dashboard() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
        <div className='px-4 py-4 mb-1'>
          <h3 className='main-text site-header-text'>DASHBOARD</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col col-sm-12 col-md-4 col-lg-4 mb-2'>
              <PieChart soil_data={temp_data} />
            </div>
            <div className='col col-sm-12 col-md-8 col-lg-8 mb-2'>
              <LineChart />
            </div>
          </div>
          <div className='row'>
            <div className="col mb-2">
              <DashboardTable />
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}

  export default Dashboard;

  const temp_data = [
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 15, date: '03/17/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 10, date: '03/17/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 7, date: '03/17/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/17/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 3, date: '03/17/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 10, date: '03/18/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 7, date: '03/18/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 5, date: '03/18/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 3, date: '03/18/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/18/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 11, date: '03/19/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 8, date: '03/19/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 7, date: '03/19/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/19/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 3, date: '03/19/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 9, date: '03/20/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 5, date: '03/20/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 5, date: '03/20/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 2, date: '03/20/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/20/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 10, date: '03/21/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 7, date: '03/21/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 7, date: '03/21/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/21/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/21/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 5, date: '03/22/2024'},
    {beacon_id: 1, truck_type: '1-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 2, truck_type: '3-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 3, truck_type: '5-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 4, truck_type: '10-Ton', times_pinged_inside: 1, date: '03/23/2024'},
    {beacon_id: 5, truck_type: '15-Ton', times_pinged_inside: 1, date: '03/23/2024'},
  ];
