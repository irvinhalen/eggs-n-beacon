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
import SiteModal from "./SiteModal";
import SiteModalConfirm from "./SiteModalConfirm";

function SiteTable() {
  const { user } = useAuth() as AuthContextType;
  const [listOfSites, setListOfSites] = useState([]);
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [toggleVisibility, setToggleVisibility] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [rowData, setRowData] = useState<Object>({});

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
        setToggleVisibility(false);
      });
    }
  };

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

  const showActions = () => {
    tableRef?.showColumn('site_id');
  }

  const hideActions = () => {
    tableRef?.hideColumn('site_id');
    tableRef?.redraw();
  }

  const columns:any = [
    {field: 'site_id', visible: false, headerSort: false, formatter: reactFormatter(<OptionsFormat />)},
    {title: 'Project Name', field: 'project_name', headerHozAlign: 'center', widthGrow: 1.5},
    {
      title: 'Address', headerHozAlign: 'center',
      columns: [
        {title: 'City', field: 'city', headerHozAlign: 'center'},
        {title: 'Town', field: 'town', headerHozAlign: 'center'},
        {title: 'Barangay', field: 'barangay', headerHozAlign: 'center'},
      ]
    },
    {
      title: 'Coordinates', headerHozAlign: 'center',
      columns: [
        {title: 'Latitude', field: 'latitude', headerHozAlign: 'center'},
        {title: 'Longitude', field: 'longitude', headerHozAlign: 'center'}
      ]
    },
    {title: 'Number of Trucks', field: 'num_trucks', headerHozAlign: 'center'},
  ];

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
                      Add Site
                    </Button>
                    <SiteModal
                        show={modalShow}
                        onHide={() => {
                          tableRef?.deselectRow();
                          setIsEdit(false);
                          setModalShow(false);
                        }}
                        isEdit={isEdit}
                        rowData={rowData}
                        updateTable={getSites}
                    />
                    <ThemeProvider theme={redTheme}>
                      <SiteModalConfirm
                        show={confirmModalShow}
                        rowData={rowData}
                        onHide={() => {
                          tableRef?.deselectRow();
                          setConfirmDelete(false);
                          setConfirmModalShow(false);
                        }}
                        updateTable={getSites}
                        confirmDelete={confirmDelete}
                        setConfirmDelete={setConfirmDelete}
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
