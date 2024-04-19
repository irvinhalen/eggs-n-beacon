import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Modal } from "react-bootstrap";
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LoadingButton } from "@mui/lab";

interface SelectData {
    project_name: string,
    license_plate: string,
    site_id: number,
    truck_id: number,
    weight_capacity: number
}

function TransactionModal(props:any) {
    const { user } = useAuth() as AuthContextType;
    const [truckTransactionId, setTruckTransactionId] = useState(0);
    const [listOfSelectData, setListOfSelectData] = useState<Array<SelectData>>([]);
    const [listOfProjects, setListOfProjects] = useState<Array<SelectData>>([]);
    const [listOfTrucks, setListOfTrucks] = useState<Array<SelectData>>([]);
    const [selectedSite, setSelectedSite] = useState<string>('');
    const [selectedPlate, setSelectedPlate] = useState<string>('');
    const [soilAmount, setSoilAmount] = useState('');
    const [checkedIn, setCheckedIn] = useState(true);
    const [checkedOut, setCheckedOut] = useState(true);
    const [inTime, setInTime] = useState<Dayjs | null>(null);
    const [outTime, setOutTime] = useState<Dayjs | null>(null);
    const [addLoading, setAddLoading] = useState(false);

    useEffect(() => {
      getSelectData();
    }, [])

    useEffect(() => {
        if(!props.show) {
            setSelectedSite('');
            setSelectedPlate('');
            setSoilAmount('');
        }
    }, [props.show]);
    
    useEffect(() => {
        setListOfProjects(listOfSelectData.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.project_name === value.project_name
            ))
        ));
        setCurrentDate();
    }, [listOfSelectData]);

    useEffect(() => {
        const license_plate_list = listOfSelectData.filter((project) => project.site_id === parseFloat(selectedSite));
        setListOfTrucks(license_plate_list);
    }, [selectedSite]);

    useEffect(() => {
        if(selectedPlate && !props.isEdit) {
            const weightCapObj = listOfSelectData.filter((project) => project.truck_id === parseFloat(selectedPlate));
            const weightCapOfTruck = weightCapObj[0].weight_capacity.toString();
            setSoilAmount(weightCapOfTruck);
        }
    }, [selectedPlate]);

    useEffect(() => {
        if(props.isEdit) {
            if(props.rowData) {
                setTruckTransactionId(props.rowData.truck_transaction_id);
                if(listOfProjects) {
                    setSelectedSite(props.rowData.site_id);
                    if(listOfTrucks) {
                        setSelectedPlate(props.rowData.truck_id);
                    }
                }
                setSoilAmount(props.rowData.soil_amount);
                if (props.rowData.in === 1) {
                    setCheckedIn(true);
                } else {
                    setCheckedIn(false);
                }
                if (props.rowData.out === 1) {
                    setCheckedOut(true);
                } else {
                    setCheckedOut(false);
                }
                const in_date = dayjs(props.rowData.in_time);
                const out_date = dayjs(props.rowData.out_time);
                setInTime(in_date);
                setOutTime(out_date);
            }
        } else {
            setSelectedSite('');
            setSelectedPlate('');
            setSoilAmount('');
            setCheckedIn(true);
            setCheckedOut(true);
            setCurrentDate();
        }
    }, [props.isEdit])


    const setCurrentDate = () => {
        const currDate = dayjs();
        setInTime(currDate);
        setOutTime(currDate);
    }

    const getSelectData = () => {
        if(user) {
            Axios.get('http://localhost:3001/api/transactions-select-data', {
            params: {
                id: user.id
            }
            }).then((response) => {
                setListOfSelectData(response.data);
            });
        }
    };

    const addTransaction = () => {
        setAddLoading(true);
        const in_num = (+ checkedIn);
        const out_num = (+ checkedOut);
        const soil_amount = parseFloat(soilAmount);
        const in_time = inTime?.format('YYYY-MM-DD HH:mm:ss');
        const out_time = outTime?.format('YYYY-MM-DD HH:mm:ss');
        Axios.post('http://localhost:3001/api/add-transaction', {
            truck_id: selectedPlate,
            site_id: selectedSite,
            soil_amount,
            in: in_num,
            out: out_num,
            in_time,
            out_time
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                props.updateChart();
                setSelectedSite('');
                setSelectedPlate('');
                setSoilAmount('');
                setCheckedIn(true);
                setCheckedOut(true);
                setAddLoading(false);
            } else {
                setAddLoading(false);
            }
        });
    }

    const updateTransaction = () => {
        setAddLoading(true);
        const in_num = (+ checkedIn);
        const out_num = (+ checkedOut);
        const soil_amount = parseFloat(soilAmount);
        const in_time = inTime?.format('YYYY-MM-DD HH:mm:ss');
        const out_time = outTime?.format('YYYY-MM-DD HH:mm:ss');
        Axios.put('http://localhost:3001/api/update-transaction', {
            truck_transaction_id: truckTransactionId,
            truck_id: selectedPlate,
            site_id: selectedSite,
            soil_amount: soil_amount,
            in: in_num,
            out: out_num,
            in_time: in_time,
            out_time: out_time
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                props.updateChart();
                setSelectedSite('');
                setSelectedPlate('');
                setSoilAmount('');
                setCheckedIn(true);
                setCheckedOut(true);
                setAddLoading(false);
            } else {
                setAddLoading(false);
            }
        });
    }

    const handleChangeProj = (event: SelectChangeEvent) => {
        if(selectedPlate) {
            setSelectedPlate('');
        }
        if(soilAmount) {
            setSoilAmount('');
        }
        setSelectedSite(event.target.value as string);
    }

    const handleChangeTruck = (event: SelectChangeEvent) => {
        setSelectedPlate(event.target.value as string);
    }

    const handleInCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedIn(event.target.checked);
    }

    const handleOutCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedOut(event.target.checked);
    }

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
          { props.isEdit ? ('Edit Transaction') : ('Create New Transaction') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <div className='form-wrap'>
            <FormControl fullWidth size='small'>
                <InputLabel id='project-name'>Project Name</InputLabel>
                <Select label='Project Name' labelId='project-name' value={selectedSite} onChange={handleChangeProj}>
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
                <Select label='License Plate' labelId='license-plate' value={selectedPlate} onChange={handleChangeTruck}>
                    { listOfTrucks.length ? ('') : (
                        <MenuItem value=''>
                            <em>No trucks found</em>
                        </MenuItem>
                    ) }
                    { listOfTrucks.map((project) => {
                        return (
                            <MenuItem key={project.truck_id} value={project.truck_id}>{project.license_plate}</MenuItem>
                        );
                    }) }
                </Select>
                {selectedSite ? ('') : (
                    <FormHelperText>Select a project name to view license plates</FormHelperText>
                )}
            </FormControl>
            <TextField label='Amount of Soil' variant='outlined' size='small' type='number' value={soilAmount} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSoilAmount(event.target.value)} autoComplete='off' />
            <Divider />
                <FormLabel component='legend'>Direction</FormLabel>
            { props.isEdit ? (
                <div className='form-row-wrap'>
                    <FormControlLabel control={<Checkbox checked={checkedIn} onChange={handleInCheckChange} size='small' />} label='Inside' />
                    <FormControlLabel control={<Checkbox checked={checkedOut} onChange={handleOutCheckChange} size='small' />} label='Outside' />
                </div>
            ) : (  
                <div className='form-row-wrap'>
                    <FormControlLabel control={<Checkbox checked={checkedIn} onChange={handleInCheckChange} size='small' />} label='Inside' />
                    <FormControlLabel control={<Checkbox checked={checkedOut} onChange={handleOutCheckChange} size='small' />} label='Outside' />
                </div>
            ) }
            <Divider />
            <FormLabel component='legend'>Timestamp</FormLabel>
            <div className='form-row-wrap'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label='Inside' format='YYYY-MM-DD hh:mm A' value={inTime} onChange={(newValue) => setInTime(newValue)} disableFuture={true} slotProps={{ textField: { size: 'small' } }} />
                    <DateTimePicker label='Outside' format='YYYY-MM-DD hh:mm A' value={outTime} onChange={(newValue) => setOutTime(newValue)} disableFuture={true} slotProps={{ textField: { size: 'small' } }} />
                </LocalizationProvider>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { addLoading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                props.isEdit ? (
                    <Button onClick={updateTransaction} variant='contained' type='submit' disableElevation>Update</Button>
                ) : (
                    <Button onClick={addTransaction} variant='contained' type='submit' disableElevation>Save</Button>
                )
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default TransactionModal;
