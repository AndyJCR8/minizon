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
              <div>
                <p>Hola querido usuario!</p>        
              </div>
            }/>
          </Routes>
        </ProtectRoutes>
      } path='*'/>
    </Routes>
  )
}
