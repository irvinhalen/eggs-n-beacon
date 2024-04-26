import { Button, Divider, FormLabel, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

function SiteModal(props:any) {
    const [loading, setLoading] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [city, setCity] = useState('');
    const [town, setTown] = useState('');
    const [barangay, setBarangay] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if(props.isEdit){
            setProjectName(props.rowData.project_name);
            setCity(props.rowData.city);
            setTown(props.rowData.town);
            setBarangay(props.rowData.barangay);
            setLatitude(props.rowData.latitude);
            setLongitude(props.rowData.longitude);
        }else{
            setProjectName('');
            setCity('');
            setTown('');
            setBarangay('');
            setLatitude('');
            setLongitude('');
        }
    }, [props.isEdit])

    const addSite = () => {
        setLoading(true);
        Axios.post('http://localhost:3001/api/add-site', {
            project_name: projectName,
            city,
            town,
            barangay,
            latitude,
            longitude
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                setProjectName('');
                setCity('');
                setTown('');
                setBarangay('');
                setLatitude('');
                setLongitude('');
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    }

    const updateSite = () => {
        setLoading(true);
        Axios.put('http://localhost:3001/api/update-site', {
            site_id: props.rowData.site_id,
            project_name: projectName,
            city,
            town,
            barangay,
            latitude,
            longitude
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                setProjectName('');
                setCity('');
                setTown('');
                setBarangay('');
                setLatitude('');
                setLongitude('');
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
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
          { props.isEdit ? ('Edit Site') : ('Register Site') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <div className='form-wrap'>
            <TextField label='Project Name' variant='outlined' size='small' autoComplete='off' value={projectName} onChange={(event) => setProjectName(event.target.value)} />
            <Divider />
            <FormLabel component='legend'>Address</FormLabel>
            <div className='input-wrap'>
                <TextField label='City' variant='outlined' size='small' autoComplete='off' value={city} onChange={(event) => setCity(event.target.value)} />
                <TextField label='Town' variant='outlined' size='small' autoComplete='off' value={town} onChange={(event) => setTown(event.target.value)} />
                <TextField label='Barangay' variant='outlined' size='small' autoComplete='off' value={barangay} onChange={(event) => setBarangay(event.target.value)} />
            </div>
            <Divider />
            <FormLabel component='legend'>Coordinates</FormLabel>
            <div className='input-wrap'>
                <TextField className='w-100' label='Latitude' variant='outlined' size='small' type='number' autoComplete='off' value={latitude} onChange={(event) => setLatitude(event.target.value)} />
                <TextField className='w-100' label='Longitude' variant='outlined' size='small' type='number' autoComplete='off' value={longitude} onChange={(event) => setLongitude(event.target.value)} />
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { loading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                props.isEdit ? (
                    <Button onClick={updateSite} variant='contained' type='submit' disableElevation>Update</Button>
                ) : (
                    <Button onClick={addSite} variant='contained' type='submit' disableElevation>Save</Button>
                )
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default SiteModal;
