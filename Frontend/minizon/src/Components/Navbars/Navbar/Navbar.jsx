import Button from '../../UI Components/Button/Button'
import Link from '../../UI Components/Link/Link'
import Search from '../../UI Components/Search/Search'
import './Navbar.scss'
import React from 'react'

export default function Navbar() {

  const linksInfo = [
    { className: "icon actionLink", icon: "heart", onClick: () => { console.log("Button 1 pressed") } },
    { className: "iconText actionLink", text: "0", icon: "bag-shopping", onClick: () => { console.log("Button 2 pressed") } },
    { className: "icon actionLink", icon: "user-astronaut", onClick: () => { console.log("Button 3 pressed") } },
  ]

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
        <div className='navbarSearch'> <Search/> </div>

        <div className='navbarItems'>
          {/* <div className='navbarItem'>
             SI ES MUY PEQUEÑA LA PANTALLA ACTIVAR EL SIDEBAR POR MEDIO DE UN BOTÓN
          </div> */}
          {
            linksInfo.map((lInfo, i) => {
              return (
                <div className='navbarItem' key={i}>
                  <Link className={lInfo.className} icon={lInfo.icon} text={lInfo.text} onClick={lInfo.onClick}/>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </nav>
  )
}
