import { Card } from "react-bootstrap";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_materialize.min.css';
import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonBase, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { Delete, Edit, FilterAltRounded, SearchRounded, SettingsRounded } from "@mui/icons-material";
import '../../css/TabulatorTables.css';
import { blackTheme, greenTheme } from "../MaterialThemes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import TransactionModal from "./TransactionModal";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";

function TruckTransactionTable() {
  const { user } = useAuth() as AuthContextType;
  const [listOfTruckTransactions, setListOfTruckTransactions] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<Object>({});
  const [toggleVisibility, setToggleVisibility] = useState<boolean>(false);

  useEffect(() => {
    getTruckTransactions();
  }, []);

  let tableRef = useRef<Tabulator | null>(null);

  // useEffect(() => {
  //   console.log(tableRef);
  // }, [toggleVisibility]);

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

  const editRow = (row:any) => {
    setIsEdit(true);
    setRowData(row);
    setModalShow(true);
  }

  const showActions = () => {
    tableRef.current?.showColumn('truck_transaction_id');
    console.log(tableRef);
  }

  const hideActions = () => {
    tableRef.current?.hideColumn('truck_transaction_id');
  }

  const OptionsFormat = (props:ReactTabulatorProps) => {
    const row = props.cell.getData();
    return (
      <div className='h-100 d-flex justify-content-between align-items-center' style={{ gap: '0.2rem' }}>
        <ButtonBase onClick={() => {editRow(row)}} sx={{ borderRadius: 25, padding: 0.5 }}><Edit fontSize='small' sx={{ color: '#019B63' }} /></ButtonBase>
        <ButtonBase sx={{ borderRadius: 25, padding: 0.5 }}><Delete fontSize='small' sx={{ color: '#E72423' }} /></ButtonBase>
      </div>
    );
  }

  const options = {
    layout: 'fitDataStretch',
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 50, 100, 1000],
    paginationCounter: 'rows',
    paginationButtonCount: 3
  }

  const columns:any = [
    {field: 'truck_transaction_id', width:'5%', visible: false, hozAlign: 'center', headerSort: false, formatter: reactFormatter(<OptionsFormat />)},
    {field: 'site_id', visible: false},
    {title: 'Project', field: 'project_name',  width: '18%', headerHozAlign: 'center', headerSort: true},
    {field: 'truck_id', visible: false},
    {title: 'License Plate', field: 'license_plate',  width: '15%', headerHozAlign: 'center', headerSort: false},
    {title: 'Amount of Soil', field: 'soil_amount', width: '12%', headerHozAlign: 'center', headerSort: true, editor: 'number'},
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
        {title: 'Inside', field: 'in_time', headerHozAlign: 'center', width: '18%' },
        {title: 'Outside', field: 'out_time', headerHozAlign: 'center', width: '18%'}
      ]
    }
  ];

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
                      onClick={() => {
                        setModalShow(true);
                        setIsEdit(false);
                      }}
                      variant='contained'
                    >
                      Create Transaction
                    </Button>
                    <TransactionModal
                      show={modalShow}
                      onHide={() => {
                        setModalShow(false);
                        setIsEdit(false);
                      }}
                      isEdit={isEdit}
                      rowData={rowData}
                    />
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
            onRef={(ref) => (tableRef = ref)}
            data={listOfTruckTransactions}
            columns={columns}
            options={options}
        />
      </Card.Body>      
    </Card>
  )
}

export default TruckTransactionTable;
