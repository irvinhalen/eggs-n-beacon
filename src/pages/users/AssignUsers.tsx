import AssignmentUserTable from "../../components/users/AssignmentUserTable";
import AssignmentSiteTable from "../../components/sites/AssignmentSiteTable";

function AssignUsers() {
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
                <AssignmentUserTable />
            </div>
            <div className="col-lg-7 mb-2">
                <AssignmentSiteTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignUsers;
