import { Button, Divider, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

function BeaconModal(props:any) {
    const [addLoading, setAddLoading] = useState(false);
    const [beaconName, setBeaconName] = useState('');

    useEffect(() => {
        if(props.isEdit){
            setBeaconName(props.rowData.beacon_name);
        }else{
            setBeaconName('');
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

export default BeaconModal;
