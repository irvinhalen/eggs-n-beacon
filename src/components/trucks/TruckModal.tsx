import { Button, Divider, FormControl, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";

interface SelectProject {
    site_id: number,
    project_name: string
}

interface SelectBeacon {
    beacon_id: number,
    beacon_name: string
}

function TruckModal(props:any) {
    const [loading, setloading] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [weightCapacity, setWeightCapacity] = useState('');
    const [project, setProject] = useState('');
    const [beacon, setBeacon] = useState('');
    const [listOfProjects, setListOfProjects] = useState<Array<SelectProject>>([]);
    const [listOfBeacons, setListOfBeacons] = useState<Array<SelectBeacon>>([]);

    useEffect(() => {
        getSelectData();
    }, []);

    useEffect(() => {
        if(props.isEdit){
            setLicensePlate(props.rowData.license_plate);
            setWeightCapacity(props.rowData.weight_capacity);
            props.rowData.site_id ? setProject(props.rowData.site_id) : setProject('');
            if (props.rowData.beacon_id){
                listOfBeacons.push({beacon_id :props.rowData.beacon_id, beacon_name: props.rowData.beacon_name});
                setBeacon(props.rowData.beacon_id);
            }else{
                setBeacon('');
            }
        }else{
            setLicensePlate('');
            setWeightCapacity('');
            setProject('');
            setBeacon('');
            setListOfBeacons(listOfBeacons.filter((beacon) => beacon.beacon_id != props.rowData.beacon_id));
        }
    }, [props.isEdit]);

    const addTruck = () => {
        setloading(true);
        Axios.post('http://localhost:3001/api/add-truck', {
            license_plate: licensePlate,
            weight_capacity: weightCapacity,
            site_id: project,
            beacon_id: beacon
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                getSelectData();
                setLicensePlate('');
                setWeightCapacity('');
                setProject('');
                setBeacon('');
                setloading(false);
            } else {
                setloading(false);
            }
        });
    }

    const updateTruck = () => {
        setloading(true);
        Axios.put('http://localhost:3001/api/update-truck', {
            truck_id: props.rowData.truck_id,
            license_plate: licensePlate,
            weight_capacity: weightCapacity,
            site_id: project,
            beacon_id: beacon
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                getSelectData();
                setLicensePlate('');
                setWeightCapacity('');
                setProject('');
                setBeacon('');
                setloading(false);
            } else {
                setloading(false);
            }
        });
    }

    const getSelectData = () => {
        Axios.get('http://localhost:3001/api/trucks-select-data').then((response) => {
            setListOfProjects(response.data[0]);
            setListOfBeacons(response.data[1]);
        });
    };

    const handleChangeProj = (event: SelectChangeEvent) => {
        setProject(event.target.value as string);
    }

    const handleChangeBeacon = (event: SelectChangeEvent) => {
        setBeacon(event.target.value as string);
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
          { props.isEdit ? ('Edit Truck') : ('Register Truck') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <div className='form-wrap'>
            <TextField label='License Plate' variant='outlined' size='small' autoComplete='off' value={licensePlate} onChange={(event) => setLicensePlate(event.target.value)} />
            <TextField label='Weight Capacity' variant='outlined' type='number' size='small' autoComplete='off' value={weightCapacity} onChange={(event) => setWeightCapacity(event.target.value)} />
            <Divider />
            <FormLabel component='legend'>Assignment</FormLabel>
            <div className='input-wrap'>
                <FormControl fullWidth size='small'>
                    <InputLabel id='project-name'>Project</InputLabel>
                    <Select label='Project' labelId='project-name' value={project} onChange={handleChangeProj}>
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
                    <InputLabel id='project-name'>Beacon</InputLabel>
                    <Select label='Beacon' labelId='project-name' value={beacon} onChange={handleChangeBeacon}>
                    { listOfBeacons.length ? (
                        props.isEdit ? (
                            listOfBeacons.map((beacon) => {
                                return (
                                    <MenuItem key={beacon.beacon_id} value={beacon.beacon_id}>{beacon.beacon_name}</MenuItem>
                                );
                            })
                        ) : (
                            listOfBeacons.length ? (
                                listOfBeacons.map((beacon) => {
                                    return (
                                        <MenuItem key={beacon.beacon_id} value={beacon.beacon_id}>{beacon.beacon_name}</MenuItem>
                                    );
                                })
                            ) : (
                                <MenuItem value=''>
                                    <em>No beacons found</em>
                                </MenuItem>
                            )
                        )
                    ) : (
                        <MenuItem value=''>
                            <em>No beacons found</em>
                        </MenuItem>
                    ) }
                    </Select>
                </FormControl>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { loading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                props.isEdit ? (
                    <Button onClick={updateTruck} variant='contained' type='submit' disableElevation>Update</Button>
                ) : (
                    <Button onClick={addTruck} variant='contained' type='submit' disableElevation>Save</Button>
                )
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default TruckModal;
