import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import { Button, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme, greenTheme } from "../MaterialThemes";
import { FilterAltRounded, SearchRounded, SettingsRounded } from "@mui/icons-material";

function BeaconTable() {
  const [listOfBeacons, setListOfBeacons] = useState([]);
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    getTrucks();
  }, []);

  useEffect(() => {
    filterTable();
  }, [searchString]);

  const filterTable = () => {
    tableRef?.setFilter([
      [
        {field: 'beacon_name', type: 'like', value: searchString},
        {field: 'license_plate', type: 'like', value: searchString},
        {field: 'project_name', type: 'like', value: searchString}
      ]
    ]);
  };

  const getTrucks = () =>{
    Axios.get('http://localhost:3001/api/beacons').then((response) => {
      setListOfBeacons(response.data);
    });
  };

  return (
    <Card className=" site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Beacon Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField
                        label='Search'
                        placeholder='Beacon, Plate, Site'
                        onChange={(event) => setSearchString(event.target.value)}
                        size='small'
                        InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <SearchRounded />
                          </InputAdornment>
                        ) }}
                      autoComplete='off'
                    />
                    <FilterAltRounded sx={{ color: '#757575' }} />
                </div>
                <div className='d-flex justify-content-between align-items-center settings-wrap'>
                  <ThemeProvider theme={greenTheme}>
                    <ThemeProvider theme={blackTheme}>
                        <Button
                            variant='outlined'
                          >
                            Show Actions
                        </Button>
                    </ThemeProvider>
                    <Button
                      variant='contained'
                    >
                      Add Beacon
                    </Button>
                    <SettingsRounded sx={{ color: '#757575' }} />
                  </ThemeProvider>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </Card.Title>
      </Card.Header>
      <Card.Body className='manager-cards'>
        <ReactTabulator
            onRef={(ref) => setTableRef(ref.current)}
            data={listOfBeacons}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default BeaconTable;

const options = {
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [
  {title: 'Beacon', field: 'beacon_name', headerHozAlign: 'center'},
  {title: 'License Plate', field: 'license_plate', headerSort: false, headerHozAlign: 'center'},
  {title: 'Site', field: 'project_name', headerHozAlign: 'center', widthGrow: 2}
];
