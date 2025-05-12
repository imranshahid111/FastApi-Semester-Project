import React from 'react'
import { Users } from '../Data'

const UserComp = () => {
  return (
    <div className='container-fluid w-75'>
 
    <div className='row'>
            <h1 className='text-center'>Users </h1>
            <div className=''>
          <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {Users.map((u)=>{
        return(
            <>
      <tr>
      <th scope="row">{u.id}</th>
      <td>{u.name}</td>
      <td>{u.username}</td>
      <td><button className='btn btn-danger'>Delete</button></td>
    </tr>
            </>
        )
    })}

    
  </tbody>
</table>

            </div>
    </div>
</div>  )
}

export default UserComp