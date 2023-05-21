import "./Loader.scss"
import React from 'react'

export default function Loader({size, text}) {
  
  return (
    <div className="loaderContainer">
      <span className={`loader ${size}`}></span>
      {text && <p className={`loaderText ${size}`}>{text}</p>}
    </div>
  )
}
