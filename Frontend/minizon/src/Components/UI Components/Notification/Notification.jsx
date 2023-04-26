import './NotificationStyles.scss'
import React, { useEffect, useRef, useState } from 'react'

export default function Notification({data}) {

  const [notificationWidth, setNotificationWidth] = useState(0);
  const [show, setShow] = useState("");

  const { message, type, icon, execInfo } = data

  const notificationElement = useRef(null)
  const placeHolder = useRef(null)
  
  useEffect(() => {
    if(show === "" && Object.keys(data).length > 1) {
      //console.log("NUEVO MENSAJE!")
      setShow(" active")
      console.log(data)
      if(execInfo['time'] != null) {
        const notiWidth = placeHolder.current.getBoundingClientRect().width + 8
        
        setTimeout(() => {
          setNotificationWidth(notiWidth)
          setTimeout(() => {
            notificationElement.current.classList.add("collapse")
          }, parseInt(execInfo['time']) - 1000);
          setTimeout(() => {
            setNotificationWidth(0)
            setTimeout(() => { setShow(""); notificationElement.current.classList.remove("collapse")}, 1000);
          }, parseInt(execInfo['time']));
        }, 500);
        
      } else {
        const notiWidth = 0
        console.log("Hola")
        setTimeout(() => {
          setNotificationWidth(notiWidth)
        }, 500);
        
        /* notificationElement.current.classList.add("collapse")
          
        setTimeout(() => {
          setNotificationWidth(0)
          setTimeout(() => { setShow(""); notificationElement.current.classList.remove("collapse")}, 1000);
        }, 1000); */
      }
    }
    
  }, [data]);

  return (
    <div className={`Notification${show}`}>
      <div className='NotificationContainer'>
        <div className='icon'>
          {
            icon ? <i className={`fa-solid fa-${icon} ${type ?? ''}`}></i> : <Loader/>
          }
        </div>
        <div ref={notificationElement} className='message' style={{width: `${notificationWidth}px`}}>
          <span ref={placeHolder} style={{visibility: "hidden", height: 0}}>{message}</span>
          {message}
        </div>
      </div>
    </div>
  )
}

function Loader() {
  return (
    <div className='notificationLoader'>
      <span class="loader"></span>
    </div>
  )
}
