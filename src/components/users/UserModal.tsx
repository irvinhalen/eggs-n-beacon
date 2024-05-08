import { Button, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";

function UserModal(props:any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if(props.show){
            setUsername(props.rowData.username);
            setEmail(props.rowData.email);
        }else{
            setUsername('');
            setEmail('');
        }
    }, [props.show])

    const updateUser = () => {
        setLoading(true);
        Axios.put('http://localhost:3001/api/update-user', {
            id: props.rowData.id,
            username,
            email
        }).then((response) => {
            if(response.data.status === 'success') {
                props.onHide();
                props.updateTable();
                setUsername('');
                setEmail('');
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
          Edit User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <div className='form-wrap'>
            <TextField label='Username' variant='outlined' size='small' autoComplete='off' value={username} onChange={(event) => setUsername(event.target.value)} />
            <TextField label='Email Address' variant='outlined' size='small' autoComplete='off' value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { loading ? (
                <LoadingButton variant='contained' loading>Update</LoadingButton>
            ) : (
                <Button onClick={updateUser} variant='contained' type='submit' disableElevation>Update</Button>
            ) }
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
