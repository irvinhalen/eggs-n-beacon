import '../../css/Dashboard.css';
// import DashboardTable from "../../components/dashboard/DashboardTable";
import LineChart from "../../components/dashboard/LineChart";
import TruckTransactionTable from '../../components/trucks/TruckTransactionTable';
import SiteMap from '../../components/dashboard/SiteMap';
import { blackTheme } from "../../components/MaterialThemes";
import { Button, ThemeProvider } from "@mui/material";
import { FilterAltRounded } from "@mui/icons-material";

function Dashboard() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
        <div className='px-4 py-4 mb-1'>
          <h3 className='main-text site-header-text'>DASHBOARD</h3>
          <ThemeProvider theme={blackTheme}>
            <Button startIcon={<FilterAltRounded />} variant="contained">Filter</Button>
          </ThemeProvider>
        </div>
        <div className='container-fluid'>
            <div className='row mb-3'>
              <div className='col-sm-12 col-md-4 col-md-4'>
                <SiteMap />
              </div>
              <div className='col-sm-12 col-md-8 col-md-8'>
                <LineChart />
              </div>
            </div>
            <div className='row'>
              <div className="col mb-2">
                <TruckTransactionTable/>
              </div>
            </div>
        </div>
      </div>
    </> 
  )
}

  export default Dashboard;
