import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";

function BeaconModal(props:any) {
    const [loading, setLoading] = useState(false);
    const [beaconName, setBeaconName] = useState('');

    useEffect(() => {
        if(props.isEdit){
            setBeaconName(props.rowData.beacon_name);
        }else{
            setBeaconName('');
        }
    }, [props.isEdit])

  const addBeacon = () => {
    setLoading(true);
    Axios.post('http://localhost:3001/api/add-beacon', {
      beacon_name: beaconName
    }).then((response) => {
        if(response.data.status === 'success') {
            props.onHide();
            props.updateTable();
            setBeaconName('');
            setLoading(false);
        } else {
            setLoading(false);
        }
    });
  }

  const updateBeacon = () => {
    setLoading(true);
    Axios.put('http://localhost:3001/api/update-beacon', {
      beacon_id: props.rowData.beacon_id,
      beacon_name: beaconName
    }).then((response) => {
        if(response.data.status === 'success') {
            props.onHide();
            props.updateTable();
            setBeaconName('');
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
          { props.isEdit ? ('Edit Beacon') : ('Register Beacon') }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <div className='form-wrap'>
            <TextField label='Beacon Name' variant='outlined' size='small' autoComplete='off' value={beaconName} onChange={(event) => setBeaconName(event.target.value)} />
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { loading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                props.isEdit ? (
                    <Button onClick={updateBeacon} variant='contained' type='submit' disableElevation>Update</Button>
                ) : (
                    <Button onClick={addBeacon} variant='contained' type='submit' disableElevation>Save</Button>
                )
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default BeaconModal;
