import { Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

function TransactionModalConfirm(props:any) {
    const [addLoading, setAddLoading] = useState(false);

    // const updateTransaction = () => {
    //     setAddLoading(true);
    //     const in_num = (+ checkedIn);
    //     const out_num = (+ checkedOut);
    //     const soil_amount = parseFloat(soilAmount);
    //     const in_time = dayjs(inTime).format('YYYY-MM-DD hh:mm:ss');
    //     const out_time = dayjs(outTime).format('YYYY-MM-DD hh:mm:ss');
    //     Axios.put('http://localhost:3001/api/update-transaction', {
    //         truck_transaction_id: truckTransactionId,
    //         truck_id: selectedTruck,
    //         site_id: selectedProject,
    //         soil_amount: soil_amount,
    //         in: in_num,
    //         out: out_num,
    //         in_time: in_time,
    //         out_time: out_time
    //     }).then((response) => {
    //         if(response.data.status === 'success') {
    //             setSelectedProject('');
    //             setSelectedTruck('');
    //             setSoilAmount('');
    //             props.onHide();
    //         }
    //         setAddLoading(false);
    //     });
    // }

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
          Confirm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        Are you sure you want to delete this transaction?
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { addLoading ? (
                <LoadingButton variant='contained' loading>Delete</LoadingButton>
            ) : (
                <Button onClick={props.onHide} variant='contained' type='submit' disableElevation>Delete</Button>
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default TransactionModalConfirm;
