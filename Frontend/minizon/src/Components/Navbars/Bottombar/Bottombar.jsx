import { Link } from 'react-router-dom'
import './Bottombar.scss'
import React, { useContext } from 'react'
import { CartCountContext } from '../../App';

export default function Bottombar() {
  const cartCounterContext = useContext(CartCountContext)
  
  return (
    <nav className='bottombar'>
      <div className='bottbarItems'>
        <div className='bottbarItem'>
          {/* SI ES MUY PEQUEÑA LA PANTALLA ACTIVAR EL SIDEBAR POR MEDIO DE UN BOTÓN */}
          <a onClick={() => { document.querySelector("#sidebar").classList.add("active") }}><i className='fa-solid fa-bars'></i></a>
        </div>
        <div className='bottbarItem'>
          <Link to="/wishList"><i className='fa-solid fa-heart'></i></Link>
        </div>
        <div className='bottbarItem'>
          <Link to="/cart" className='shopIcon'>
            <i className='fa-solid fa-bag-shopping'></i>
            <i className='counter'>{cartCounterContext.cartCount > 9 ? '+9' : cartCounterContext.cartCount}</i>
          </Link>
        </div>
        <div className='bottbarItem'>
          <Link to="/account"><i className='fa-solid fa-user'></i></Link>
        </div>
      </div>
    </nav>
  )
}
