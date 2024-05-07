import AssignmentUserTable from "../../components/users/AssignmentUserTable";
import AssignmentSiteTable from "../../components/sites/AssignmentSiteTable";
import { useState } from "react";
import Axios from 'axios';

export interface DesignatedSite{
  project_name: string,
  city: string,
  town: string,
  barangay: string,
  assus: number
}

function AssignUsers() {
  const [listOfSites, setListOfSites] = useState<Array<DesignatedSite>>([]);

  const getAssignmentSites = () =>{
    Axios.get('http://localhost:3001/api/assignments-site').then((response) => {
      setListOfSites(response.data);
    });
  };

  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-3 mb-1'>
          <h3 className='main-text site-header-text'>SITE ASSIGNMENT</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col-lg-5 mb-2">
                <AssignmentUserTable getAssignmentSites={getAssignmentSites} />
            </div>
            <div className="col-lg-7 mb-2">
                <AssignmentSiteTable listOfSites={listOfSites} getAssignmentSites={getAssignmentSites} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignUsers;
