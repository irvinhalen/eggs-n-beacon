import { Button, Divider, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

function TruckModal(props:any) {
    const [addLoading, setAddLoading] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [weightCapacity, setWeightCapacity] = useState('');
    const [project, setProject] = useState('');
    const [beacon, setBeacon] = useState('');

    useEffect(() => {
        if(props.isEdit){
            setLicensePlate(props.rowData.license_plate);
            setWeightCapacity(props.rowData.weight_capacity);
            setProject(props.rowData.project);
            setBeacon(props.rowData.beacon);
        }else{
            setLicensePlate('');
            setWeightCapacity('');
            setProject('');
            setBeacon('');
        }
    }, [props.isEdit])

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
                    <Select label='Project' labelId='project-name'>
                        <MenuItem value=''>
                            <em>No projects found</em>
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth size='small'>
                    <InputLabel id='project-name'>Beacon</InputLabel>
                    <Select label='Beacon' labelId='project-name'>
                        <MenuItem value=''>
                            <em>No beacons found</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { addLoading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                props.isEdit ? (
                    <Button variant='contained' type='submit' disableElevation>Update</Button>
                ) : (
                    <Button variant='contained' type='submit' disableElevation>Save</Button>
                )
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default TruckModal;
