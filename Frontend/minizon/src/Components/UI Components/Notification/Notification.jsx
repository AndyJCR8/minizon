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
        setTimeout(() => { setNotificationWidth(0) }, 500);

        execInfo.handleDoAfterTime({do: () => {
          notificationElement.current.classList.add("collapse")
          
          setTimeout(() => {
            setNotificationWidth(0)
            setTimeout(() => { setShow(""); notificationElement.current.classList.remove("collapse")}, 500);
          }, 500);
        }})
      }
    }
    
  }, [data]);

  return (
    <div className={`Notification${show}`}>
      <div className='NotificationContainer'>
        <div className='icon'>
          {
            icon != "" ? <i className={`fa-solid fa-${icon} ${type ?? ''}`}></i> : <Loader/>
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
      <span className="loader"></span>
    </div>
  )
}
