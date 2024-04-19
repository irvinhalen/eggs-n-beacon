import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme, greenTheme } from "../MaterialThemes";
import { FilterAltRounded, SearchRounded, SettingsRounded } from "@mui/icons-material";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";

function UserTable() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    filterTable();
  }, [searchString]);

  const filterTable = () => {
    tableRef?.setFilter([
      [
        {field: 'id', type: 'like', value: searchString},
        {field: 'username', type: 'like', value: searchString},
        {field: 'email', type: 'like', value: searchString}
      ]
    ]);
  }

  const getUsers = () =>{
    Axios.get('http://localhost:3001/api/users').then((response) => {
      setListOfUsers(response.data);
    });
  };

  return (
    <Card className="site-table-card shadow-sm">
      <Card.Header>
        <Card.Title>
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Users Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField
                        label='Search'
                        placeholder='ID, Username, Email'
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
                      Add User
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
            data={listOfUsers}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default UserTable;

const options = {
  layout: 'fitDataStretch',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [
  {title: 'ID', field: 'id', width: '25%', headerHozAlign: 'center'},
  {title: 'Username', field: 'username', width: '25%', headerHozAlign: 'center'},
  {title: 'Email Address', field: 'email', width: '25%', headerHozAlign: 'center'},
  {title: 'Assigned Sites', field: 'assite', width: '25%', headerHozAlign: 'center'}
];
