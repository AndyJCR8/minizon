import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './Account.scss'
import React, { useEffect, useState } from 'react'
import Login from '../Login&Register/Login'
import ProtectRoutes from './ProtectRoutes';
import Register from '../Login&Register/Register';

export default function Account() {

  return (
    
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      
      <Route element={
        <ProtectRoutes>
          <Routes>
            <Route path='/' element={
              <AccountGUI/>
            }/>
          </Routes>
        </ProtectRoutes>
      } path='*'/>
    </Routes>
  )
}

function AccountGUI({userData}) {

  return (
    <div className='accountContainer'>
      <Routes>
        <Route element={
          <div className='accountDashboard'>
            
          </div>
        } path='/'/>
      </Routes>
    </div>
  )
}