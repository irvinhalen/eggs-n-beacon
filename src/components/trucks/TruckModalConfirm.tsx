import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import Axios from "axios";

function TruckModalConfirm(props:any) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [isMatch, setIsMatch] = useState(false);

    useEffect(() => {
        licensePlate === props.rowData.license_plate ? setIsMatch(true) : setIsMatch(false);
    }, [licensePlate]);

    const deleteTruck = () => {
      setConfirmLoading(true);
      Axios.delete('http://localhost:3001/api/delete-truck', {
          params: {
              truck_id: props.rowData.truck_id,
          }
      }).then((response) => {
          if(response.data.status === 'success') {
              props.onHide();
              props.updateTable();
              setLicensePlate('');
              setConfirmLoading(false);
          } else {
            setConfirmLoading(false);
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
      <Modal.Header className='border-0 modal-header-red'>
        <Modal.Title id="contained-modal-title-vcenter">
          { isMatch ? 'Delete Truck' : 'Confirm' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-row'>
        { props.confirmDelete ? (
            <div className='d-flex flex-column w-100 confirm-delete'>
                Enter the license plate of the truck to confirm.
                <TextField size='small' label='License Plate' placeholder={props.rowData.license_plate} autoComplete='off' value={licensePlate} onChange={(event) => setLicensePlate(event.target.value)} />
            </div>
        ) : (
            <>
                Are you sure you want to delete&nbsp;<b>{ props.rowData.license_plate }</b>?
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
                        <Button onClick={deleteTruck} variant='contained' type='submit' disableElevation>Delete</Button>
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

export default TruckModalConfirm;
