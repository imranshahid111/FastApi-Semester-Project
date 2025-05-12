import React from 'react'
import Header from '../src/Components/Header'
import SideBar from '../src/Components/SideBar'
import Inventary from '../src/Components/Inventary'

const InventaryPage = () => {
  return (
<div className='grid-container'>
      <Header />
      <SideBar />
      <Inventary />
    </div>  )

}

export default InventaryPage