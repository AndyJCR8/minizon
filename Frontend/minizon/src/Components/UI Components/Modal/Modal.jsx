import './Modal.scss'
import React, { useEffect, useState, ReactElement } from 'react'

/**
 * @param {{title: string, message: string, actions: ReactElement, states: {
 *  Active: { active: boolean, setActive: any },
 *  Destroy: { destroy: boolean, setDestroy: any }
 * }}}
 */
export default function Modal({title, message, actions, states}) {
  
  useEffect(() => { states.Active.setActive(true) }, []);

  const handleClose = () => {
    states.Active.setActive(false)
    //setTimeout(() => { states.Destroy.setDestroy(true) }, 1000);
  }

  return (
    <div className={`modalContainer${states.Active.active ? " active" : ""}`}>
      <div className='modal'>
        <div className='closeContainer'>
          <button className='button close' onClick={() => handleClose()}><i className='fa-solid fa-xmark'></i></button>
        </div>
        <header>
          <h3 className='modalTitle'>{title}</h3>
        </header>
        <main className='modalBody'>
          <p className='message'>{message}</p>
        </main>
        <footer className='modalOptions'>
          {actions}
        </footer>
      </div>
    </div>
  )
}
