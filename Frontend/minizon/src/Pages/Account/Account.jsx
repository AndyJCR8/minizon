import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './Account.scss'
import React, { useEffect, useState } from 'react'
import Login from '../Login&Register/Login'
import ProtectRoutes from './ProtectRoutes';
import Register from '../Login&Register/Register';
import Logout from '../Login&Register/Logout';

export default function Account() {

  return (
    
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/register' element={<Register/>}/>
      
      <Route element={
        <ProtectRoutes>
          <AccountGUI/>
        </ProtectRoutes>
      } path='*'/>
    </Routes>
  )
}

function AccountGUI({userData}) {
  
  return (
    <div className='accountContainer'>
      <div className='accountNavbar'>
        <div className='header'>
          <p className='userName'>Bienvenido <i>{userData['Nombre']}</i></p>
          <p className='userEmail'>{userData['Email']}</p>
        </div>
        <ul className='items'>
          <Link to="" className='item'>
            <i className='fa-solid fa-cart-flatbed'></i>
            <p>Mis pedidos</p>
          </Link>
          <Link to="" className='item'>
            <i className='fa-solid fa-circle-info'></i>
            <p>Mis datos</p>
          </Link>
          <Link to="" className='item'>
            <i className='fa-solid fa-location-dot'></i>
            <p>Mis direcciones</p>
          </Link>
          <Link to="" className='item'>
            <i className='fa-solid fa-credit-card'></i>
            <p>Mis tarjetas</p>
          </Link>
        </ul>
        <div className='footer'>
          <Link to="/logout" className='button primary'>Cerrar sesión</Link>
        </div>
      </div>
      <div className='accountContent'>
        <Routes>
          <Route element={
            <div className='accountDashboard'>
              <div className='titleContainer'>
                <p className='title'>
                  ¡Bienvenido de nuevo <p className='userName'>{userData['Nombre']}</p>!
                </p>
              </div>
            </div>
          } path='/'/>

        </Routes>
      </div>
    </div>
  )
}