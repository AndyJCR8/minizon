import { Link } from 'react-router-dom'
import Search from '../../UI Components/Search/Search'
import './Navbar.scss'
import React from 'react'

export default function Navbar() {


  return (
    <nav className='navbar'>
      <div className='navbarOptions'>
        <div className='navbarItems'>
          <div className='navbarItem'>
            <Link to="/"><i className='fa-solid fa-home'></i>Inicio</Link>  
          </div>
          <div className='navbarItem'>
            <Link to="/"><i className='fa-solid fa-person-shelter'></i>Interiores</Link>  
          </div>
          <div className='navbarItem'>
            <Link to="/"><i className='fa-solid fa-campground'></i>Exteriores</Link>  
          </div>
        </div>
      </div>
      <div className='navbarTitle'>
        <p className='title'>MINIZON</p>
      </div>
      <div className='navbarActions'>
        <div className='navbarSearch'> <Search/> </div>

        <div className='navbarItems'>
          {/* <div className='navbarItem'>
             SI ES MUY PEQUEÑA LA PANTALLA ACTIVAR EL SIDEBAR POR MEDIO DE UN BOTÓN
          </div> */}
          <div className='navbarItem'>
            <Link to="/"><i className='fa-solid fa-heart'></i></Link>
          </div>
          <div className='navbarItem'>
            <Link to="/" className='shopIcon'>
              <i className='fa-solid fa-bag-shopping'></i>
              <i className='counter'>9</i>
            </Link>
          </div>
          <div className='navbarItem'>
            <Link to="/"><i className='fa-solid fa-user'></i></Link>
          </div>
          
        </div>
      </div>
    </nav>
  )
}
