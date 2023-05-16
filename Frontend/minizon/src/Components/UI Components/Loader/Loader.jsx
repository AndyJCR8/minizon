import "./Loader.scss"
import React from 'react'

export default function Loader({size}) {
  
  return (
    <div className="loaderContainer">
      <span className={`loader ${size}`}></span>
    </div>
  )
}
