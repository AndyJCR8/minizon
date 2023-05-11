import './Modal.scss'
import React, { useEffect, useState, ReactElement } from 'react'

/**
 * @param {{title: string, content: ReactElement, actions: ReactElement, states: {
 *  Active: { active: boolean, setActive: Function },
 *  Destroy: { destroy: boolean, setDestroy: Function }
 * }}}
 */
export default function Modal({title, content, actions, states}) {

  useEffect(() => (() => {}), [states.Destroy.destroy]);
  if(states.Destroy.destroy) return null;

  useEffect(() => { states.Active.setActive(true) }, []);

  return (
    <div className={`modalContainer${states.Active.active ? " active" : ""}`}>
      <div className='modal'>
        <header>
          <h3 className='modalTitle'>{title}</h3>
        </header>
        <main className='modalBody'>
          {content}
        </main>
        <footer className='modalOptions'>
          {actions}
        </footer>
      </div>
    </div>
  )
}
