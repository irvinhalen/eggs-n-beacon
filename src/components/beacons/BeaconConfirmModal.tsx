import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

function BeaconModalConfirm(props:any) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [beaconName, setBeaconName] = useState('');
    const [isMatch, setIsMatch] = useState(false);

    useEffect(() => {
        beaconName === props.rowData.beacon_name ? setIsMatch(true) : setIsMatch(false);
    }, [beaconName]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='main-text'
    >
      <Modal.Header className='border-0 modal-header-red'>
        <Modal.Title id="contained-modal-title-vcenter">
          { isMatch ? 'Delete Beacon' : 'Confirm' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-row'>
        { props.confirmDelete ? (
            <div className='d-flex flex-column w-100 confirm-delete'>
                Enter the name of the beacon to confirm.
                <TextField size='small' label='Beacon Name' placeholder={props.rowData.beacon_name} autoComplete='off' value={beaconName} onChange={(event) => setBeaconName(event.target.value)} />
            </div>
        ) : (
            <>
                Are you sure you want to delete&nbsp;<b>{ props.rowData.beacon_name }</b>?
            </>
        ) }
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { props.confirmDelete ? (
                confirmLoading ? (
                    <LoadingButton variant='contained' loading>Delete</LoadingButton>
                ) : (
                    isMatch ? (
                        <Button variant='contained' type='submit' disableElevation>Delete</Button>
                    ) : (
                        <Button variant='contained' type='submit' disableElevation disabled>Delete</Button>
                    )
                )
            ) : (
                <Button onClick={() => props.setConfirmDelete(true)} variant='contained' type='submit' disableElevation>Yes</Button>
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default BeaconModalConfirm;
