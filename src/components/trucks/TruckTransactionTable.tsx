import { Card } from "react-bootstrap";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_materialize.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { Edit, FilterAltRounded, SearchRounded } from "@mui/icons-material";
import '../../css/TabulatorTables.css';
import { blackTheme, greenTheme } from "../MaterialThemes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import TransactionModalAdd from "./TransactionModalAdd";

function TruckTransactionTable() {
  const { user } = useAuth() as AuthContextType;
  const [listOfTruckTransactions, setListOfTruckTransactions] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getTruckTransactions();
  }, []);

  const getTruckTransactions = () =>{
    if(user) {
      const userId = user.id;
      Axios.get('http://localhost:3001/api/truck-transactions', {
        params: {
          id: userId
        }
      }).then((response) => {
        setListOfTruckTransactions(() => {
          return response.data.map((entry:any) => {
            return {...entry}
          })          
        });
      });
    }
  };

  return (
    <Card className="site-table-card shadow-sm">
      <Card.Header>
        <Card.Title>
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Soil Tracking Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField label='Search' size='small' InputProps={{ endAdornment: (
                      <InputAdornment position='end'>
                        <SearchRounded />
                      </InputAdornment>
                    ) }} autoComplete='off' />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label='Date' format='YYYY-MM-DD' slotProps={{ textField: { size: 'small' } }} />
                    </LocalizationProvider>
                    <FilterAltRounded sx={{ color: '#757575' }} />
                </div>
                <ThemeProvider theme={greenTheme}>
                  <Button onClick={() => setModalShow(true)} variant='contained'>Create Transaction</Button>
                  <TransactionModalAdd show={modalShow} onHide={() => setModalShow(false)} />
                </ThemeProvider>
              </div>
            </div>
          </ThemeProvider>
        </Card.Title>
      </Card.Header>
      <Card.Body className='manager-cards'>
        <ReactTabulator
            data={listOfTruckTransactions}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default TruckTransactionTable;

const testTickleZ = (cellData:any) => {
  alert(cellData);
}

const EditFormat = (props:any) => {
  let deezNuts = props.cell.getData();
  deezNuts = deezNuts.truck_transaction_id;
  return (
    <ThemeProvider theme={greenTheme}>
      <Button variant='outlined' size='small' startIcon={<Edit />} onClick={() => {testTickleZ(deezNuts)}}>
        ACTION
      </Button>
    </ThemeProvider>
  );
}

const options = {
  layout: 'fitDataStretch',
  pagination: true,
  paginationSize: 5,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [
  // {field: 'truck_transaction_id', width: '7%', hozAlign: 'center', headerSort: false, formatter: reactFormatter(<EditFormat />)},
  {title: 'Project', field: 'project_name',  width: '18%', headerHozAlign: 'center', headerSort: true},
  {title: 'License Plate', field: 'license_plate',  width: '15%', headerHozAlign: 'center', headerSort: false},
  {title: 'Amount of Soil', field: 'soil_amount', width: '12%', headerHozAlign: 'center', headerSort: true},
  {
    title: 'Direction',
    headerHozAlign: 'center',
    columns: [
      {title: 'Inside', field: 'in', width: '7%', headerHozAlign: 'center', hozAlign: 'center', headerSort: false, formatter: 'tickCross'},
      {title: 'Outside', field: 'out', width: '7%', headerHozAlign: 'center', hozAlign: 'center', headerSort: false, formatter: 'tickCross'}
    ]
  },
  {
    title: 'Timestamp',
    headerHozAlign: 'center',
    columns: [
      {title: 'Inside', field: 'in_time', headerHozAlign: 'center', width: '17%'},
      {title: 'Outside', field: 'out_time', headerHozAlign: 'center', width: '17%'}
    ]
  }
];
