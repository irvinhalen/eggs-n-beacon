import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

function SiteModalConfirm(props:any) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isMatch, setIsMatch] = useState(false);

    useEffect(() => {
        projectName === props.rowData.project_name ? setIsMatch(true) : setIsMatch(false);
    }, [projectName]);

    const deleteSite = () => {
        setConfirmLoading(true);
        Axios.delete('http://localhost:3001/api/delete-site', {
            params: {
                site_id: props.rowData.site_id,
            }
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                props.updateChart();
                setProjectName('');
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
          { isMatch ? 'Delete Site' : 'Confirm' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-row'>
        { props.confirmDelete ? (
            <div className='d-flex flex-column w-100 confirm-delete'>
                Enter the name of the project to confirm.
                <TextField size='small' label='Project Name' placeholder={props.rowData.project_name} autoComplete='off' value={projectName} onChange={(event) => setProjectName(event.target.value)} />
            </div>
        ) : (
            <>
                Are you sure you want to delete&nbsp;<b>{ props.rowData.project_name }</b>?
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
                        <Button onClick={deleteSite} variant='contained' type='submit' disableElevation>Delete</Button>
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

export default SiteModalConfirm;
