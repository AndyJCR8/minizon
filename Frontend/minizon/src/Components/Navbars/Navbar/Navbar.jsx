import { Link } from 'react-router-dom'
import Search from '../../UI Components/Search/Search'
import './Navbar.scss'
import React, { useRef, useEffect, useState } from 'react'
import { exteriorLinks, interiorsLinks } from '../links'


export default function Navbar() {

  const navbarOptions = useRef(null)
  
  useEffect(() => {
    const dropDownItems = navbarOptions.current.querySelectorAll(".dropdown")
    dropDownItems.forEach(element => {
      //element.addEventListener("mouseenter", () => element.classList.add("active") )
      element.onmouseenter = () => element.classList.add("active")
      //element.addEventListener("mouseleave", () => element.classList.remove("active") )
      element.onmouseleave = () => element.classList.remove("active")
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
  
  const dropdownMenu = useRef(null)
  const [subItems, setSubItems] = useState([]);

  const setLinks = (evt, item) => {
    if(item.links) {
      setSubItems(item.links)
      
      if(!evt.currentTarget.classList.contains("active")) {
        dropdownMenu.current.querySelector(".links").querySelectorAll(".item").forEach(el => {
          if(el.classList.contains("active")) el.classList.remove("active")
        })
        evt.currentTarget.classList.add("active")
      }
    }
    else setSubItems([])
  }

  return (
    <div className='dropdownMenu' ref={dropdownMenu}>
      <div className='links'>
        {
          items.map((item, i) => {
            
            return (
              <div className='item' key={i}
              onClick={(evt) => setLinks(evt, item)}>
                {
                  item.icon ?
                  <p>
                    <i className={`fa-solid fa-${item.icon}`}></i>{item.content}<i className='fa-solid fa-angle-right'></i>
                  </p>
                  :
                  <Link to={item.path}> {item.content} </Link>
                }
              </div>
            )
          })
        }
      </div>
      <div className='divisor'> </div>
      <div className='linksContent'>
        {
          subItems.length > 0 ? subItems.map((link, i) => {
            return (
              <div className='item' key={i}>
                <Link to={link.path}> {link.content} </Link>
              </div>
            )
          }) : null
        }
      </div>
    </div>
  )
}