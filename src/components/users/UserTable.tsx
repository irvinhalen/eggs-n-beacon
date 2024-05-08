import { Card } from "react-bootstrap";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { ButtonBase, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme, greenTheme } from "../MaterialThemes";
import { Edit, FilterAltRounded, SearchRounded } from "@mui/icons-material";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import UserModal from "./UserModal";

function UserTable() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [rowData, setRowData] = useState<object>({});

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    filterTable();
  }, [searchString]);

  const filterTable = () => {
    tableRef?.setFilter([
      [
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

  const editRow = (row:ReactTabulatorProps, tabRow:ReactTabulatorProps) => {
    tabRow.select();
    setRowData(row);
    setModalShow(true);
  }

  const OptionsFormat = (props:ReactTabulatorProps) => {
    const tabRow = props.cell.getRow();
    const row = props.cell.getData();
    return (
      <div className='actions-div'>
        <ButtonBase onClick={() => editRow(row, tabRow)} centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><Edit fontSize='small' sx={{ color: '#019B63' }} /></ButtonBase>
      </div>
    );
  }

  const columns:any = [
    {field: 'id', headerSort: false, formatter: reactFormatter(<OptionsFormat />)},
    {title: 'Username', field: 'username', headerHozAlign: 'center', widthGrow: 2},
    {title: 'Email Address', field: 'email', headerHozAlign: 'center', widthGrow: 2}
  ];

  return (
    <Card className="site-table-card shadow-sm">
      <Card.Header>
        <Card.Title>
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              User Table
              <div className='actions-wrap'>
                <div className='filters-wrap'>
                    <TextField
                        label='Search'
                        placeholder='Username, Email'
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
              </div>
            </div>
          </ThemeProvider>
          <ThemeProvider theme={greenTheme}>
            <UserModal
                show={modalShow}
                onHide={() => {
                  tableRef?.deselectRow();
                  setModalShow(false);
                }}
                rowData={rowData}
                updateTable={getUsers}
            />
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
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

