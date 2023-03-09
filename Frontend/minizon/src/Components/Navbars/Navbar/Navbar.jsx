import Search from '../../UI Components/Search/Search'
import './Navbar.scss'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbarOptions'>
        <div className='navbarItems'>

        </div>
      </div>
      <div className='navbarTitle'>
        <p className='title'>MINIZON</p>
      </div>
      <div className='navbarActions'>
        <div className='navbarSearch'>
          <Search/>
        </div>
        <div className='navbarItems'>
          <div className='navbarItem'>
            {/* SI ES MUY PEQUEÑA LA PANTALLA ACTIVAR EL SIDEBAR POR MEDIO DE UN BOTÓN*/}
          </div>

          
        </div>
      </div>
    </nav>
  )
}
