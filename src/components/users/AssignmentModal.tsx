import Axios from 'axios';
import '../../css/Users.css';
import { Button, ButtonBase, Divider, FormControl, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { blackTheme, greenTheme } from "../MaterialThemes";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { AuthContextType, useAuth } from "../../utils/AuthContext";
import { SelectProject } from '../trucks/TruckModal';

interface AssignedSites{
  site_assignment_id?: number,
  site_id: number,
  project_name: string
};

function AssignmentModal(props:any) {
    const { user } = useAuth() as AuthContextType;
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [listOfSites, setListOfSites] = useState<Array<SelectProject>>([]);
    const [listOfAssignedSites, setListOfAssignedSites] = useState<Array<AssignedSites>>([]);
    const [listOfAssignedSitesBeforeChanges, setListOfAssignedSitesBeforeChanges] = useState<Array<AssignedSites>>([]);
    const [project, setProject] = useState<string>('');

    useEffect(() => {
      getSites();
    }, []);

    useEffect(() => {
      if(props.show){
          getAssignments();
          setUsername(props.rowData.username);
          setEmail(props.rowData.email);
      }else{
          setUsername('');
          setEmail('');
          setProject('');
          setListOfAssignedSites([]);
          setListOfAssignedSitesBeforeChanges([]);
      }
    }, [props.show]);

    const getSites = () => {
      if(user){
        Axios.get('http://localhost:3001/api/sites', {
          params: {
            id: user.id,
            role: user.role
          }
        }).then((response) => {
          setListOfSites(response.data);
        });
      }
    };

    const getAssignments = () => {
      Axios.get('http://localhost:3001/api/assignments', {
        params: {
          id: props.rowData.id
        }
      }).then((response) => {
        setListOfAssignedSites(response.data);
        setListOfAssignedSitesBeforeChanges(response.data);
      });
    };

    const addAssignment = (site_id: number) => {
      setLoading(true);
      Axios.post('http://localhost:3001/api/add-assignment', {
        user_id: props.rowData.id,
        site_id
      }).then((response) => {
        if(response.status === 200){
          props.onHide();
          props.updateUserTable();
          props.updateSiteTable();
        }
        setLoading(false);
      });
    }

    const deleteAssignment = (site_assignment_id: number) => {
      setLoading(true);
      Axios.delete('http://localhost:3001/api/delete-assignment', {
          params: {
              site_assignment_id
          }
      }).then((response) => {
          if(response.data.status === 'success') {
              props.onHide();
              props.updateUserTable();
              props.updateSiteTable();
          }
          setLoading(false);
      });
    }
    
    const crudChecker = () => {
      let allMatch:boolean = true;
      setListOfAssignedSites((assignedSites) => assignedSites.sort((a, b) => { return a.site_id - b.site_id }));
      setListOfAssignedSitesBeforeChanges((assignedSitesBeforeChanges) => assignedSitesBeforeChanges.sort((a, b) => { return a.site_id - b.site_id }));
      if(listOfAssignedSites.length === listOfAssignedSitesBeforeChanges.length){
        for(let i=0; i<listOfAssignedSitesBeforeChanges.length; i++){
          if(listOfAssignedSites[i].site_id != listOfAssignedSitesBeforeChanges[i].site_id){
            allMatch = false;
          }
        }
      }else{
        allMatch = false;
      }

      if(allMatch){
        props.onHide();
      }else{
        if(listOfAssignedSites.length > 0 && listOfAssignedSitesBeforeChanges.length === 0){
          listOfAssignedSites.forEach((assignedSite) => {
            addAssignment(assignedSite.site_id);
          });
        }else if(listOfAssignedSites.length === 0 && listOfAssignedSitesBeforeChanges.length > 0){
          listOfAssignedSitesBeforeChanges.forEach((assignedSiteBeforeChange) => {
              if(assignedSiteBeforeChange.site_assignment_id){
                deleteAssignment(assignedSiteBeforeChange.site_assignment_id);
              }
          });
        }else{
          listOfAssignedSites.forEach((assignedSite) => {
            const foundSite = listOfAssignedSitesBeforeChanges.find((site) => site.site_id === assignedSite.site_id);
            if(!foundSite){
              addAssignment(assignedSite.site_id);
            }
          });
          listOfAssignedSitesBeforeChanges.forEach((assignedSiteBeforeChange) => {
            const foundSite = listOfAssignedSites.find((site) => site.site_assignment_id === assignedSiteBeforeChange.site_assignment_id);
            if(!foundSite){
              if(assignedSiteBeforeChange.site_assignment_id){
                deleteAssignment(assignedSiteBeforeChange.site_assignment_id);
              }
            }
          });
        }
      }
    };

  const addAssignedSite = () => {
    setProject('');
    const selectedSite = listOfSites.find((site) => site.site_id === parseInt(project));
    if(selectedSite){
      setListOfAssignedSites((assignedSite) => [{site_id: parseInt(project), project_name: selectedSite.project_name }, ...assignedSite]);
    }
  }

  const removeAssignedSite = (site:AssignedSites) => {
    setListOfAssignedSites(listOfAssignedSites.filter((assignedSite) => {
      return assignedSite.site_id != site.site_id;
    }));
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
          Assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <ThemeProvider theme={blackTheme}>
            <div className='form-wrap'>
                <div className='d-flex flex-row justify-content-center gap-3'>
                    <TextField label='Username' variant='standard' value={username} inputProps={{ readOnly: true }} fullWidth />
                    <TextField label='Email' variant='standard' value={email} inputProps={{ readOnly: true }} fullWidth />
                </div>
                <Divider />
                <FormLabel component='legend'>Sites</FormLabel>
                <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                    <FormControl fullWidth size='small'>
                        <InputLabel id='project-name'>Project Name</InputLabel>
                        <Select label='Project Name' labelId='project-name' value={project} onChange={(event: SelectChangeEvent) => setProject(event.target.value as string)}>
                          { listOfSites.length ? (
                            listOfSites.map((project) => {
                              if(!listOfAssignedSites.some((assignedSite) => assignedSite.site_id === project.site_id)){
                                return (
                                  <MenuItem key={project.site_id} value={project.site_id}>
                                      {project.project_name}
                                  </MenuItem>
                                );
                              }
                            })
                          ):(
                            <MenuItem value=''>
                                <em>No projects found</em>
                            </MenuItem>
                          ) }
                        </Select>
                    </FormControl>
                    { project === '' ? (
                      <ButtonBase sx={{ borderRadius: 25, padding: 0.5 }} disabled><AddCircle sx={{ color: '#757575' }} /></ButtonBase>
                    ):(
                      <ButtonBase onClick={ () => addAssignedSite() } centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><AddCircle className='text-primary' /></ButtonBase>
                    ) }
                </div>
                { listOfAssignedSites.length > 0 ? (
                  <>
                    <FormLabel component='legend' className='mt-4'>{ listOfAssignedSites.length > 1 ? 'Assigned Sites' : 'Assigned Site' }</FormLabel>
                    <div className='project-list'>
                      { listOfAssignedSites.map((site) => 
                        <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                          <input type='hidden' value={site.site_id} />
                          <TextField variant='standard' value={site.project_name} inputProps={{ readOnly: true }} fullWidth />
                          <ButtonBase onClick={ () => removeAssignedSite(site) } centerRipple={true} sx={{ borderRadius: 25, padding: 0.5 }}><RemoveCircle sx={{ color: '#E72423' }} /></ButtonBase>
                        </div>
                      ) }
                    </div>
                  </>
                ):(
                  ''
                ) }
            </div>
        </ThemeProvider>
      </Modal.Body>
      <Modal.Footer className='border-0 button-row-wrap'>
        <ThemeProvider theme={greenTheme}>
            <Button onClick={props.onHide} variant='outlined'>Cancel</Button>
            { loading ? (
                <LoadingButton variant='contained' loading>Save</LoadingButton>
            ) : (
                <Button onClick={crudChecker} variant='contained' type='submit' disableElevation>Save</Button>
            ) }
        </ThemeProvider>
      </Modal.Footer>
    </Modal>
  );
}

export default AssignmentModal;
