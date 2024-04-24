import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import { Dayjs } from "dayjs";
import { InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme } from "../MaterialThemes";
import { FilterAltRounded, SearchRounded } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function BeaconTransactionTable() {
  const [listOfBeaconTransactions, setListOfBeaconTransactions] = useState([]);
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [projectNameFilter, setProjectNameFilter] = useState('');
  const [truckFilter, setTruckFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);

  useEffect(() => {
    getBeaconTransactions();
  }, []);

  useEffect(() => {
    filterTable();
  }, [projectNameFilter, truckFilter, dateFilter]);
  
  const filterTable = () => {
    let filterDate = '';
    if(dateFilter) {
      filterDate = dateFilter.format('YYYY-MM-DD');
    }
    tableRef?.setFilter([
      {field: 'project_name', type: 'like', value: projectNameFilter},
      [
        {field: 'license_plate', type: 'like', value: truckFilter},
        {field: 'beacon_name', type: 'like', value: truckFilter}
      ],
      {field: 'transaction_time', type: 'like', value: filterDate}
    ]);
  }

  const getBeaconTransactions = () =>{
    Axios.get('http://localhost:3001/api/beacon-transactions').then((response) => {
      setListOfBeaconTransactions(response.data);
    });
  };

  return (
    <Card className=" site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Transaction Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField label='Project Name'
                      onChange={(event) => {
                        setProjectNameFilter(event.target.value);
                      }}
                      size='small'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <SearchRounded />
                          </InputAdornment>
                        ) }}
                      autoComplete='off'
                    />
                    <TextField label='Plate, Beacon'
                      onChange={(event) => {
                        setTruckFilter(event.target.value);
                      }}
                      size='small'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <SearchRounded />
                          </InputAdornment>
                        ) }}
                      autoComplete='off'
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label='Date' format='YYYY-MM-DD' disableFuture={true} onChange={(date) => setDateFilter(date)} slotProps={{ textField: { size: 'small' } }} />
                    </LocalizationProvider>
                    <FilterAltRounded sx={{ color: '#757575' }} />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </Card.Title>
      </Card.Header>
      <Card.Body className='manager-cards'>
        <ReactTabulator
            onRef={(ref) => setTableRef(ref.current)}
            data={listOfBeaconTransactions}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default BeaconTransactionTable;

const options = {
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [
  {title: 'Designated Site', field: 'project_name', headerHozAlign: 'center', widthGrow: 1.5},
  {title: 'Assigned Truck', field: 'license_plate', headerHozAlign: 'center', headerSort: false},
  {title: 'Beacon', field: 'beacon_name', headerHozAlign: 'center'},
  {title: 'Direction', field: 'direction', headerHozAlign: 'center', headerSort: false},
  {title: 'Timestamp', field: 'transaction_time', headerHozAlign: 'center', widthGrow: 1.5}
];
