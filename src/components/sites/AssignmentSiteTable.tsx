import { Card } from "react-bootstrap";
import { ReactTabulator } from "react-tabulator";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import { useEffect, useState } from 'react';
import { InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { blackTheme } from "../MaterialThemes";
import { FilterAltRounded, SearchRounded } from "@mui/icons-material";
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator";
import { DesignatedSite } from "../../pages/users/AssignUsers";

function AssignmentSiteTable({listOfSites, getAssignmentSites}:{listOfSites:Array<DesignatedSite>, getAssignmentSites:() => void}) {
  const [searchString, setSearchString] = useState('');
  const [tableRef, setTableRef] = useState<ReactTabulatorProps | null>(null);

  useEffect(() => {
    getAssignmentSites();
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

  return (
    <Card className="site-table-card shadow-sm">
      <Card.Header>
        <Card.Title>
          <ThemeProvider theme={blackTheme}>
            <div className='title-wrap'>
              Site Table
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
            data={listOfSites}
            columns={columns}
            options={options}
        />
      </Card.Body>
    </Card>
  )
}

export default AssignmentSiteTable;

const options = {
  layout: 'fitColumns',
  pagination: true,
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 50, 100, 1000],
  paginationCounter: 'rows',
  paginationButtonCount: 3
}

const columns:any = [,
    {title: 'Project Name', field: 'project_name', headerHozAlign: 'center', widthGrow: 1.5},
    {
      title: 'Address', headerHozAlign: 'center',
      columns: [
        {title: 'City', field: 'city', headerHozAlign: 'center'},
        {title: 'Town', field: 'town', headerHozAlign: 'center'},
        {title: 'Barangay', field: 'barangay', headerHozAlign: 'center'},
      ]
    },
    {title: 'Users Assigned', field: 'assus', headerHozAlign: 'center'},
  ];
