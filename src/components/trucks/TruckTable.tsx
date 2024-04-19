import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import { Button, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme, greenTheme } from "../MaterialThemes";
import { FilterAltRounded, SearchRounded, SettingsRounded } from "@mui/icons-material";

function TruckTable() {
  const { user } = useAuth() as AuthContextType;
  const [listOfTrucks, setListOfTrucks] = useState([]);
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
        {field: 'license_plate', type: 'like', value: searchString},
        {field: 'project_name', type: 'like', value: searchString},
        {field: 'beacon_name', type: 'like', value: searchString},
        {field: 'weight_capacity', type: 'like', value: searchString}
      ]
    ]);
  };

  const getTrucks = () =>{
    if(user){
      Axios.get('http://localhost:3001/api/trucks', {
        params: {
          id: user.id
        }
      }).then((response) => {
        setListOfTrucks(response.data);
      });
    }
  };

  return (
    <Card className="site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Truck Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField
                        label='Search'
                        placeholder='Plate, Site, Beacon'
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
                      Add Truck
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
            data={listOfTrucks}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default TruckTable;

const options = {
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [
  {title: 'License Plate', field: 'license_plate', headerSort: false, headerHozAlign: 'center'},
  {title: 'Site', field: 'project_name', headerHozAlign: 'center', widthGrow: 1.5},
  {title: 'Beacon', field: 'beacon_name', headerHozAlign: 'center'},
  {title: 'Weight Capacity', field: 'weight_capacity', headerHozAlign: 'center'}
];
