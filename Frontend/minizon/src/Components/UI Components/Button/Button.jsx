import './Button.scss'
import React from 'react'

export default function Button({className, solid, withIcon, icon, withText, text, onClick}) {

  return (
    <button className={`btn ${className}`} onClick={() => onClick()}>
      {withIcon ? <i className={`fa-${solid ? "solid" : "regular"} fa-${icon}`}></i> : null}
      {withText ? text : null}
    </button>
  )
}
