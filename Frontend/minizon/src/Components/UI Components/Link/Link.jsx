import './Link.scss'
import React from 'react'

export default function Link({className, text, icon, onClick}) {

  return (
    <a className={`link ${className}`} onClick={() => onClick()}>
      {icon ? <i className={`fa-solid fa-${icon}`}></i> : null}
      {text ? text : null}
    </a>
  )
}
