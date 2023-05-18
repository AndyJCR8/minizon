import { useNavigate } from 'react-router-dom'
import './Search.scss'
import React, { useRef } from 'react'

export default function Search() {

  const searchInput = useRef(null)
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/products/searchFor?search=${searchInput.current.value}`)
  }

  return (
    <div className='searchContainer'>
      <input ref={searchInput} className='searchInput' placeholder='Búsqueda'/>
      <button onClick={() => handleSearch()} className='searchIcon'><i className='fa fa-search'></i></button>
      <button className='sidebarMenu' onClick={() => document.querySelector("#sidebar").classList.add("active")}><i className='fa fa-bars'></i></button>
    </div>
  )
}
