import { Link } from 'react-router-dom'
import './Sidebar.scss'
import React, { useRef, useEffect } from 'react'
import { exteriorLinks, interiorsLinks } from '../links'


export default function Sidebar() {
  const sidebarOptions = useRef(null)
  
  
  useEffect(() => {
    const dropDownItems = sidebarOptions.current.querySelectorAll(".dropdown")
    dropDownItems.forEach(element => {
      //console.log(element)
      //element.addEventListener("click", () => element.classList.toggle("active") )
      //element.addEventListener("click", () => element.classList.toggle("active"))
      element.querySelector("p").onclick = () => element.classList.toggle("active")
      //console.log(element, element.querySelector("p"))
    })
    /* SI HACE CLICK EN ALGÚN LINK DE LA SIDEBAR SE RETRAE AUTOMATICAMENTE */
    sidebarOptions.current.querySelectorAll("a").forEach(link => {
      //link.addEventListener("click", () => sidebarOptions.current.classList.remove("active"))
      link.onclick = () => sidebarOptions.current.classList.remove("active")
    })
    
  }, [])
  
  
  return (
    <nav id='sidebar' className='sidebar' ref={sidebarOptions}>
      <div className='sidebarContainer'>
        <div className="sidebarHeader">
          <p className='title'><i className='fa-solid fa-border-all'></i>Opciones</p>
          <button className='button backButton' onClick={() => sidebarOptions.current.classList.toggle("active")}><i className='fa-solid fa-angle-left'></i></button>
        </div>
        <div className="sidebarBody">
          <div className="sidebarItems">
            <div className='sidebarItem'>
              <Link to="/"><i className='fa-solid fa-home'></i>Inicio</Link>
            </div>
            <div className='sidebarItem dropdown'>
              <p>
                <i className='fa-solid fa-person-shelter'></i>
                Interiores
                <i className='fa-solid fa-angle-up'></i>
              </p>
              <DropdownMenu items={interiorsLinks}/>
            </div>
            <div className='sidebarItem dropdown'>
              <p>
                <i className='fa-solid fa-campground'></i>
                Exteriores
                <i className='fa-solid fa-angle-up'></i>
              </p>
              <DropdownMenu items={exteriorLinks}/>
            </div>
          </div>
        </div>
      </div>
      <div className='sidebarClose' onClick={() => { sidebarOptions.current.classList.toggle("active") }}></div>
    </nav>
  )
}

function DropdownMenu({items}) {
  return (
    <div className='dropdownMenu'>
      {
        items.map((item, i) => {
          return (
            <div className={item.links ? "itemsContainer" : "item"} key={i}
            onClick={item.links ? (evt) => { evt.currentTarget.classList.toggle("active") } : null}>
              {
                item.links ?
                <>
                  <p>
                    <i className={`fa-solid fa-${item.icon}`}></i>
                    <i>
                     {item.content}
                    </i>
                    <i className='fa-solid fa-angle-up'></i>
                  </p>
                  <div className='items'>
                    {
                      item.links.map((link, i) => {
                        return (
                          <div className='item' key={i}>
                            <Link to={link.path}>{link.content}</Link>
                          </div>
                        )
                      })
                    }
                  </div>
                </>
                : <Link to={item.path}>{item.content}</Link>
              }
            </div>
          )
        })
      }
    </div>
  )
}