import { Link } from 'react-router-dom'
import './Bottombar.scss'
import React, { useRef } from 'react'

export default function Bottombar() {

  return (
    <nav className='bottombar'>
      <div className='bottbarItems'>
        <div className='bottbarItem'>
          {/* SI ES MUY PEQUEÑA LA PANTALLA ACTIVAR EL SIDEBAR POR MEDIO DE UN BOTÓN */}
          <a onClick={() => { document.querySelector("#sidebar").classList.add("active") }}><i className='fa-solid fa-bars'></i></a>
        </div>
        <div className='bottbarItem'>
          <Link to="/"><i className='fa-solid fa-heart'></i></Link>
        </div>
        <div className='bottbarItem'>
          <Link to="/cart" className='shopIcon'>
            <i className='fa-solid fa-bag-shopping'></i>
            <i className='counter'>9</i>
          </Link>
        </div>
        <div className='bottbarItem'>
          <Link to="/account"><i className='fa-solid fa-user'></i></Link>
        </div>
      </div>
    </nav>
  )
}
