import { MessageContext } from '../../App'
import './MessageStyles.scss'
import React, { useEffect, useRef, useState } from 'react'

export default function Message({data}) {

  const [messageWidth, setMessageWidth] = useState(0);
  const [show, setShow] = useState("");

  const { message, type, icon, time } = data

  const messageElement = useRef(null)
  const placeHolder = useRef(null)
  
  useEffect(() => {
    if(show === "") {
      //console.log("NUEVO MENSAJE!")
      setShow("active")
      const MessageWidth = placeHolder.current.getBoundingClientRect().width + 8
      
      setTimeout(() => {
        setMessageWidth(MessageWidth)
        setTimeout(() => {
          messageElement.current.classList.add("collapse")
        }, time - 1000);
        setTimeout(() => {
          setMessageWidth(0)
          setTimeout(() => { setShow(""); messageElement.current.classList.remove("collapse")}, 1000);
        }, time);
      }, 500);
    }
  }, [data]);

  return (
    <div className={`Message ${show}`}>
      <div className='MessageContainer'>
        <div className='icon'>
          {
            icon ? <i className={`fa-solid fa-${icon} ${type ?? ''}`}></i> : <Loader/>
          }
        </div>
        <div ref={messageElement} className='message' style={{width: `${messageWidth}px`}}>
          <span ref={placeHolder} style={{visibility: "hidden", height: 0}}>{message}</span>
          {message}
        </div>
      </div>
    </div>
  )
}

function Loader() {
  return (
    <div className='messageLoader'>
      <span class="loader"></span>
    </div>
  )
}
