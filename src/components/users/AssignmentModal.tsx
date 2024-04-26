import { Button, ButtonBase, Divider, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, ThemeProvider } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { blackTheme, greenTheme } from "../MaterialThemes";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
// import Axios from "axios";

function AssignmentModal(props:any) {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        //remove this later
        setLoading(false);
        if(props.show){
            setUsername(props.rowData.username);
            setEmail(props.rowData.email);
        }else{
            setUsername('');
            setEmail('');
        }
    }, [props.show])

//   const addBeacon = () => {
//     setLoading(true);
//     Axios.post('http://localhost:3001/api/add-beacon', {
//       beacon_name: username
//     }).then((response) => {
//         if(response.data.status === 'success') {
//             props.onHide();
//             props.updateTable();
//             setUsername('');
//             setLoading(false);
//         } else {
//             setLoading(false);
//         }
//     });
//   }

//   const updateBeacon = () => {
//     setLoading(true);
//     Axios.put('http://localhost:3001/api/update-beacon', {
//       beacon_id: props.rowData.beacon_id,
//       beacon_name: username
//     }).then((response) => {
//         if(response.data.status === 'success') {
//             props.onHide();
//             props.updateTable();
//             setUsername('');
//             setLoading(false);
//         } else {
//             setLoading(false);
//         }
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
      <Modal.Header className='border-0'>
        <Modal.Title id="contained-modal-title-vcenter">
          Assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <ThemeProvider theme={blackTheme}>
            <div className='form-wrap'>
                <div className='d-flex flex-row justify-content-center gap-3'>
                    <TextField label='username' variant='standard' value={username} inputProps={{ readOnly: true }} fullWidth />
                    <TextField label='email' variant='standard' value={email} inputProps={{ readOnly: true }} fullWidth />
                </div>
                <Divider />
                <FormLabel component='legend'>Sites</FormLabel>
                <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                    <FormControl fullWidth size='small'>
                        <InputLabel id='project-name'>Project Name</InputLabel>
                        <Select label='Project Name' labelId='project-name'>
                            <MenuItem value='Altitude'>
                                Altitude
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <ButtonBase centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><AddCircle className='text-primary' /></ButtonBase>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                    <TextField label='Assigned Site' variant='standard' value='Vertex' inputProps={{ readOnly: true }} fullWidth />
                    <ButtonBase centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><RemoveCircle sx={{ color: '#E72423' }} /></ButtonBase>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                    <TextField label='Assigned Site' variant='standard' value='Peanut Resort' inputProps={{ readOnly: true }} fullWidth />
                    <ButtonBase centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><RemoveCircle sx={{ color: '#E72423' }} /></ButtonBase>
                </div>
            </div>
        </ThemeProvider>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
        <ThemeProvider theme={greenTheme}>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { loading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                <Button onClick={props.onHide} variant='contained' type='submit' disableElevation>Save</Button>
            ) }
        </ThemeProvider>
      </Modal.Footer>
    </Modal>
  );
}

export default AssignmentModal;
