import { Card } from "react-bootstrap";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import { Button, ButtonBase, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme, greenTheme, redTheme } from "../MaterialThemes";
import { Delete, Edit, FilterAltRounded, SearchRounded, SettingsRounded } from "@mui/icons-material";
import TruckModal from "./TruckModal";
import TruckModalConfirm from "./TruckModalConfirm";

function TruckTable() {
  const { user } = useAuth() as AuthContextType;
  const [listOfTrucks, setListOfTrucks] = useState([]);
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [searchString, setSearchString] = useState('');
  const [rowData, setRowData] = useState({});
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
          id: user.id,
          role: user.role
        }
      }).then((response) => {
        setListOfTrucks(
          response.data.map((entry:any) => {
            if(!entry.project_name){
              entry.project_name = 'ㅤ';
            }
            if(!entry.beacon_name){
              entry.beacon_name = 'ㅤ';
            }
            return entry;
          })          
        );
        setToggleVisibility(false);
      });
    }
  };

  const showActions = () => {
    tableRef?.showColumn('truck_id');
  }

  const hideActions = () => {
    tableRef?.hideColumn('truck_id');
    tableRef?.redraw();
  }

  const editRow = (row:ReactTabulatorProps, tabRow:ReactTabulatorProps) => {
    tabRow.select();
    setIsEdit(true);
    setRowData(row);
    setModalShow(true);
  }

  const deleteRow = (row:ReactTabulatorProps, tabRow:ReactTabulatorProps) => {
    tabRow.select();
    setRowData(row);
    setConfirmModalShow(true);
  }

  const OptionsFormat = (props:ReactTabulatorProps) => {
    const tabRow = props.cell.getRow();
    const row = props.cell.getData();
    return (
      <div className='actions-div'>
        <ButtonBase onClick={() => editRow(row, tabRow)} centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><Edit fontSize='small' sx={{ color: '#019B63' }} /></ButtonBase>
        { user.role === 1 ? (
          <ButtonBase onClick={() => deleteRow(row, tabRow)} centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><Delete fontSize='small' sx={{ color: '#E72423' }} /></ButtonBase>
        ) : (
          ''
        ) }
      </div>
    );
  }

  const columns:any = [
    {field: 'truck_id', visible: false, headerSort: false, formatter: reactFormatter(<OptionsFormat />) },
    {field: 'site_id', visible: false},
    {field: 'beacon_id', visible: false},
    {title: 'License Plate', field: 'license_plate', headerSort: false, headerHozAlign: 'center'},
    {title: 'Weight Capacity', field: 'weight_capacity', headerHozAlign: 'center'},
    {title: 'Designated Site', field: 'project_name', headerHozAlign: 'center', widthGrow: 1.5},
    {title: 'Assigned Beacon', field: 'beacon_name', headerHozAlign: 'center'}
  ];

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
                      { toggleVisibility ? (
                        <Button
                            onClick={() => {
                              setToggleVisibility(false)
                              hideActions()
                            }}
                            variant='outlined'
                          >
                            Hide Actions
                        </Button>
                      ) : (
                        <Button
                            onClick={() => {
                              setToggleVisibility(true)
                              showActions()
                            }}
                            variant='outlined'
                          >
                            Show Actions
                        </Button>
                      ) }
                    </ThemeProvider>
                    <Button
                      onClick={() => setModalShow(true)}
                      variant='contained'
                    >
                      Add Truck
                    </Button>
                    <TruckModal
                        show={modalShow}
                        onHide={() => {
                          tableRef?.deselectRow();
                          setIsEdit(false);
                          setModalShow(false);
                        }}
                        isEdit={isEdit}
                        rowData={rowData}
                        updateTable={getTrucks}
                    />
                    <ThemeProvider theme={redTheme}>
                      <TruckModalConfirm
                        show={confirmModalShow}
                        onHide={() => {
                          tableRef?.deselectRow();
                          setConfirmDelete(false);
                          setConfirmModalShow(false);
                        }}
                        rowData={rowData}
                        confirmDelete={confirmDelete}
                        setConfirmDelete={setConfirmDelete}
                        updateTable={getTrucks}
                      />
                    </ThemeProvider>
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
