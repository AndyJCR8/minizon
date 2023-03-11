import { Link } from 'react-router-dom'
import Search from '../../UI Components/Search/Search'
import './Navbar.scss'
import React, { useRef, useEffect } from 'react'

const interiorsLinks = [
  { path: "/", content: "item1" },
  { path: "/", content: "item2" },
  { path: "/", content: "item3" },
  { path: "/", content: "item4" },
  { path: "/", content: "item5" },
  { path: "/", content: "item6" }
]

const exteriorLinks = interiorsLinks.map((x, i) => { return { path: x.path, content: "item" + (i + 7) } });

export default function Navbar() {

  const navbarOptions = useRef(null)
  
  useEffect(() => {
    const dropDownItems = navbarOptions.current.querySelectorAll(".dropdown")
    dropDownItems.forEach(element => {
      element.addEventListener("mouseenter", () => element.classList.add("active") )
      element.addEventListener("mouseleave", () => element.classList.remove("active") )
    })
  }, [])

  return (
    <nav className='navbar'>
      <div ref={navbarOptions} className='navbarOptions'>
        <div className='navbarItems'>
          <div className='navbarItem'>
            <Link to="/"><i className='fa-solid fa-home'></i>Inicio</Link>
          </div>
          <div className='navbarItem dropdown'>
            <p>
              <i className='fa-solid fa-person-shelter'></i>
              Interiores
              <i className='fa-solid fa-angle-up'></i>
            </p>
            <DropdownMenu items={interiorsLinks}/>
          </div>
          <div className='navbarItem dropdown'>
            <p>
              <i className='fa-solid fa-campground'></i>
              Exteriores
              <i className='fa-solid fa-angle-up'></i>
            </p>
            <DropdownMenu items={exteriorLinks}/>
          </div>
        </div>
      </div>
      <div className='navbarTitle'>
        <Link to="/" className='title'>MINIZON</Link>
      </div>
      <div className='navbarActions'>
        <div className='navbarSearch'> <Search/> </div>

        <div className='navbarItems'>
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

function DropdownMenu({items}) {
  return (
    <div className='dropdownMenu'>
      {
        items.map((item, i) => {
          return (
            <div className='item' key={i}>
              <Link to={item.path}>{item.content}</Link>
            </div>
          )
        })
      }
    </div>
  )
}