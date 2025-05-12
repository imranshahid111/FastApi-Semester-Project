import React from 'react'
import { BsCart3, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsPeopleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const SideBar = ({openSidebarToggle , OpenSidebar}) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
                <Link to="/" className='pLink'>
            <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
            </li>
                </Link>
                <Link to="/product" className='pLink'>
            <li className='sidebar-list-item'>
                    <BsFillArchiveFill className='icon'/> Products
            </li>
                </Link>
                <Link to="/category" className='pLink'>
            <li className='sidebar-list-item'>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
            </li>
                </Link>
                <Link to='/users' className='pLink'>
            <li className='sidebar-list-item'>
                    <BsPeopleFill className='icon'/> Customers
            </li>
                </Link>
                <Link to='/inventary' className='pLink'>
            <li className='sidebar-list-item'>
                    <BsListCheck className='icon'/> Inventory
            </li>
                </Link>
                <Link to="/reports" className='pLink'>
            <li className='sidebar-list-item'>
                    <BsMenuButtonWideFill className='icon'/> Reports
            </li>
                </Link>
                <Link to='/setting' className='pLink'>
            <li className='sidebar-list-item'>
                    <BsFillGearFill className='icon'/> Setting
            </li>
                </Link>
        </ul>
    </aside>
  )
}

export default SideBar