import React from 'react'
import Header from '../src/Components/Header'
import SideBar from '../src/Components/SideBar'
import UserComp from '../src/Components/UserComp'

const UserPage = () => {
  return (
    <div className='grid-container'>
    <Header />
    <SideBar />
    <UserComp />

  </div>  )
}

export default UserPage