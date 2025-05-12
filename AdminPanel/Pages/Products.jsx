import React from 'react'
import ProductComp from '../src/Components/ProductComp'
import SideBar from '../src/Components/SideBar'
import Header from '../src/Components/Header'

const Products = () => {
    // const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    // const OpenSidebar = () => {
    //   setOpenSidebarToggle(!openSidebarToggle)
    // }
  return (
    <div className='grid-container'>
    <Header />
    <SideBar />
    <ProductComp />

  </div>
  )
}

export default Products