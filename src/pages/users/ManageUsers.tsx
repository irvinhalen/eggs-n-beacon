import UserTable from "../../components/users/UserTable";

function ManageUsers() {
  return (
    <>
      <div className='bg-div' />
      <div className='main_div'>
      <div className='px-4 py-4 mb-1'>
          <h3 className='main-text site-header-text'>ACCOUNT MANAGEMENT</h3>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col mb-2">
                <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers;
