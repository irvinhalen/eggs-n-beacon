import { Card } from "react-bootstrap";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { ButtonBase, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme } from "../MaterialThemes";
import { EditLocationAlt, FilterAltRounded, SearchRounded } from "@mui/icons-material";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import AssignmentModal from "./AssignmentModal";

function AssignmentUserTable() {

  const [listOfUsers, setListOfUsers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    getAssignmentUsers();
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

  const getAssignmentUsers = () =>{
    Axios.get('http://localhost:3001/api/assignments-user').then((response) => {
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
        <ButtonBase onClick={() => editRow(row, tabRow)} centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><EditLocationAlt fontSize='small' sx={{ color: '#019B63' }} /></ButtonBase>
      </div>
    );
  }

  const columns:any = [
    {field: 'id', headerSort: false, formatter: reactFormatter(<OptionsFormat />)},
    {
      title: 'Identification', headerHozAlign: 'center',
      columns: [
        {title: 'Email Address', field: 'email', headerHozAlign: 'center', widthGrow: 2},
        {title: 'Username', field: 'username', headerHozAlign: 'center', widthGrow: 2}
      ]
    },
    {title: 'Sites Assigned', field: 'assite', headerHozAlign: 'center'}
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
        <AssignmentModal
          show={modalShow}
          onHide={() => {
            tableRef?.deselectRow();
            setModalShow(false);
          }}
          rowData={rowData}
          updateUserTable={getAssignmentUsers}
        />
      </Card.Body>      
    </Card>
  )
}

export default AssignmentUserTable;

const options = {
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}
