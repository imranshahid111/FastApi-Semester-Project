import React from 'react'
import Header from '../src/Components/Header'
import SideBar from '../src/Components/SideBar'
import CreateCategory from '../src/Components/CreateCategory'

const Category = () => {
  return (
    <div className='grid-container'>
    <Header />
    <SideBar />
    <CreateCategory />

  </div>  )
}

export default Category