import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Modal } from "react-bootstrap";
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import Axios from "axios";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface SelectData {
    project_name: string,
    license_plate: string,
    site_id: number
}

function TransactionModalAdd(props:any) {
    const { user } = useAuth() as AuthContextType;
    const [listOfSelectData, setListOfSelectData] = useState<Array<SelectData>>([]);
    const [listOfProjects, setListOfProjects] = useState<Array<SelectData>>([]);
    const [inTime, setInTime] = useState<Dayjs | null>(null);
    const [outTime, setOutTime] = useState<Dayjs | null>(null);

    useEffect(() => {
      getSelectData();
        setListOfProjects(listOfSelectData.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.project_name === value.project_name
            ))
        ));
        const currDate = dayjs();
        setInTime(currDate);
        setOutTime(currDate);
    }, [])
    
    const getSelectData = () =>{
    if(user) {
        const userId = user.id;
        Axios.get('http://localhost:3001/api/transactions-select-data', {
        params: {
            id: userId
        }
        }).then((response) => {
            setListOfSelectData(() => {
                return response.data.map((entry:any) => {
                return {...entry}
                })
            });
        });
    }
    };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='main-text'
    >
      <Modal.Header className='border-0'>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Truck Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <div className='form-wrap'>
            <FormControl fullWidth size='small'>
                <InputLabel id='project-name'>Project Name</InputLabel>
                <Select label='Project Name' labelId='project-name' value=''>
                    { listOfProjects.length ? ('') : (
                        <MenuItem value=''>
                            <em>No projects found</em>
                        </MenuItem>
                    ) }
                    { listOfProjects.map((project) => {
                        return (
                            <MenuItem key={project.site_id} value={project.site_id}>{project.project_name}</MenuItem>
                        );
                    }) }
                </Select>
            </FormControl>
            <FormControl fullWidth size='small'>
                <InputLabel id='license-plate'>License Plate</InputLabel>
                <Select label='License Plate' labelId='license-plate' value=''>
                    { listOfProjects.length ? ('') : (
                        <MenuItem value=''>
                            <em>No trucks found</em>
                        </MenuItem>
                    ) }
                    { listOfSelectData.map((project) => {
                        return (
                            <MenuItem key={project.license_plate} value={project.license_plate}>{project.license_plate}</MenuItem>
                        );
                    }) }
                </Select>
            </FormControl>
            <TextField label='Amount of Soil' variant='outlined' size='small' type='number' />
            <Divider />
                <FormLabel component='legend'>Direction</FormLabel>
            <div className='form-row-wrap'>
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label='Inside' />
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label='Outside' />
            </div>
            <Divider />
            <FormLabel component='legend'>Timestamp</FormLabel>
            <div className='form-row-wrap'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label='Inside' format='YYYY-MM-DD hh:mm' value={inTime} onChange={(newValue) => setInTime(newValue)} slotProps={{ textField: { size: 'small' } }} />
                    <DateTimePicker label='Outside' format='YYYY-MM-DD hh:mm' value={outTime} onChange={(newValue) => setOutTime(newValue)} slotProps={{ textField: { size: 'small' } }} />
                </LocalizationProvider>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button variant='outlined'>Cancel</Button>
            <Button variant='contained' disableElevation>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TransactionModalAdd;