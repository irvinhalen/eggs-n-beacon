import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
// import BarGraph from "../components/BarGraph";
import TableSoil from "../components/TableBeacon";
import { Box, Grid, Stack, Typography } from "@mui/material";
import CardsBeacon from "../components/CardsBeacon";
import LineChart from "../components/LineChart";

function Home() {
  return (
    <>
      <Navbar />
      <Stack direction='column' bgcolor={'#f4f7f9'}>
        <Box m={3}>
          <Typography variant='h2'>
            Crispy Beacon 🥓
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <CardsBeacon />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <LineChart />
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"center"} paddingTop={2} paddingBottom={2}>
          <TableSoil />
        </Box>
      </Stack>
      <Footer />
    </> 
  )
}

  export default Home
