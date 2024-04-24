import { Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

function TransactionModalConfirm(props:any) {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const deleteTransaction = () => {
        setConfirmLoading(true);
        Axios.delete('http://localhost:3001/api/delete-transaction', {
            params: {
                truck_transaction_id: props.rowData.truck_transaction_id,
            }
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                props.updateChart();
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
          Confirm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        Are you sure you want to delete this transaction?
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { confirmLoading ? (
                <LoadingButton variant='contained' loading>Delete</LoadingButton>
            ) : (
                <Button onClick={deleteTransaction} variant='contained' type='submit' disableElevation>Delete</Button>
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default TransactionModalConfirm;
