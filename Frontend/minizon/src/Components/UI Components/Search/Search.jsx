import './Search.scss'
import React from 'react'

export default function Search() {
  return (
    <div className='searchContainer'>
      <input className='searchInput' placeholder='Búsqueda'/>
      <button className='searchIcon'><i className='fa fa-search'></i></button>
    </div>
  )
}
