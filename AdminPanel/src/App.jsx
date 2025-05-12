import { useState } from 'react'

import './App.css'

import Dashboard from '../Pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Products from '../Pages/Products'
import Category from '../Pages/Category'
import InventaryPage from '../Pages/InventaryPage'
import UserPage from '../Pages/UserPage'
import ReportsPage from '../Pages/ReportsPage'
import Setting from '../Pages/Setting'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/product' element={<Products/>} />
      <Route path='/category' element={<Category/>} />
      <Route path='/inventary' element={<InventaryPage/>} />
      <Route path='/users' element={<UserPage/>} />
      <Route path='/reports' element={<ReportsPage/>} />
      <Route path='/setting' element={<Setting/>} />
    </Routes>
    </>
  )
}

export default App
