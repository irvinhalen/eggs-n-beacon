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

function SiteTable() {
  const { user } = useAuth() as AuthContextType;
  const [listOfSites, setListOfSites] = useState([]);
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [searchString, setSearchString] = useState<string>('');

  useEffect(() => {
    getSites();
  }, []);

  useEffect(() => {
    filterTable();
  }, [searchString]);

  const filterTable = () => {
    tableRef?.setFilter([
      [
        {field: 'project_name', type: 'like', value: searchString},
        {field: 'city', type: 'like', value: searchString},
        {field: 'town', type: 'like', value: searchString},
        {field: 'barangay', type: 'like', value: searchString}
      ]
    ]);
  }

  const getSites = () => {
    if(user){
      Axios.get('http://localhost:3001/api/sites', {
        params: {
          id: user.id
        }
      }).then((response) => {
        setListOfSites(response.data);
      });
    }
  };

  return (
    <Card className=" site-table-card shadow-sm">
      <Card.Header style={{background: 'none'}}>
        <Card.Title className="card-text">
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Site Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField
                        label='Search'
                        placeholder='Project Name, Address'
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
                      Add Site
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
            data={listOfSites}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default SiteTable;

const options = {
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [
  {title: 'Project Name', field: 'project_name', headerHozAlign: 'center', widthGrow: 2},
  {
    title: 'Address', headerHozAlign: 'center',
    columns: [
      {title: 'City', field: 'city', headerHozAlign: 'center'},
      {title: 'Town', field: 'town', headerHozAlign: 'center'},
      {title: 'Barangay', field: 'barangay', headerHozAlign: 'center'},
    ]
  },
  {title: 'Number of Trucks', field: 'num_trucks', headerHozAlign: 'center'},
];
