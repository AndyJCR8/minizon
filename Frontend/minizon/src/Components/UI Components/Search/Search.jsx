import './Search.scss'
import React from 'react'

export default function Search() {
  return (
    <div className='searchContainer'>
      <button className='searchIcon'><i className='fa fa-search'></i></button>
      <input className='searchInput' placeholder='Búsqueda'/>
    </div>
  )
}
