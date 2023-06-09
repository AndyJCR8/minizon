import "./Credentials.scss"
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { NotificationContext } from "../../Components/App"
import axios from "axios"

async function postData(data, callback) {
  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVICE_1}/usuario/login`, data)
    callback(res.data)
  } catch (error) {
    callback({'detail': `error: ${error}`})
  }
}

export default function Login() {

  const navigate = useNavigate()

  const notiContext = useContext(NotificationContext)

  const [answer, setAnswer] = useState("");
  const [answerType, setAnswerType] = useState("");
  const [answerActive, setAnswerActive] = useState(false);

  
  const [doAfterTime, setDoAfterTime] = useState({});
  const [formData, setFormData] = useState({});

  const handleDoAfterTime = useCallback(
    (obj) => {
      setDoAfterTime(obj)
      console.log("handleSetted")
    }
  ,[])
  
  useEffect(() => {
    if(Object.keys(formData).length > 0){
      postData(formData, (response) => {
  
        if(!Object.keys(response).includes("detail")) {
          setAnswer("Inicio de sesión correcto")
          setAnswerType("success")
          /*
            GUARDAR EL TOKEN DEL USUARIO EN UNA COOKIE CON LA EXPIRACIÓN
            QUE INDICA EL PROPIO TOKEN
          */
         const expires = (new Date(response.Expires)).toUTCString()
  
         document.cookie = `token=${response.AuthToken}; expires=${expires}; path=/`
         /* console.log(response)
         console.log("expires: ", expires) */

         navigate("/account")
        } else {
          setAnswer("El correo o la contraseña son incorrectos")
          setAnswerType("error")
        }
        try {
          if(doAfterTime['do'] != undefined) doAfterTime['do']()
          else { setTimeout(() => {
            doAfterTime['do']()
          }, 1000); }
        } catch (e) {}
        
        setAnswerActive(true)
        setTimeout(() => { setAnswerActive(false) }, 2000);

      })
    }
  }, [doAfterTime, formData]);

  /**
   * @param {SubmitEvent} e 
   */
  const loginUser = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    const notificationConf = { "message": "", "icon": "",
      "execInfo": {
        "time": null,
        "handleDoAfterTime": handleDoAfterTime
      }
    }

    notiContext.setNotificationData(notificationConf)
    setFormData({
      Email: form['email'].value,
      Password: form['password'].value,
      ExpireInSecs: form['remember'].checked ? 172800 : 25200
    })
  }

  return (
    <div className="loginContainer">
      <form className="credentialsForm" onSubmit={loginUser}>
        <div className="header">
          <p className="title">Iniciar sesión</p>
        </div>
        <div className="body">
          <section className="formItem">
            <label htmlFor="email"><i className="fa-solid fa-envelope"></i>Correo electrónico</label>
            <input id="email" name="email" className="formInput" type="email" placeholder="email@gmail.com" required tabIndex={1}/>
          </section>
          <section className="formItem">
            <label htmlFor="password"><i className="fa-solid fa-lock"></i>Contraseña</label>
            <input id="password" name="password" className="formInput" type="password" placeholder="contraseña" required tabIndex={2}/>
          </section>
          <section className="formItem rememberField">
            <div className="rememberUser">
              <input id="remember" name="remember" className="formCheckbox" type="checkbox" tabIndex={3}/>
              <label htmlFor="remember" className="chkBoxLabel">Recordar usuario</label>
            </div>
          </section>
        </div>
        <div className="footer">
          <div className="formButtons">
            <button className="button primary" type="submit" tabIndex={4}>Iniciar sesión</button>
            <Link to={"/account/register"} className="button primary" tabIndex={5}>¡Registrarse!</Link>
            {/* <button className="button secondary">¡Registrarse!</button> */}
          </div>
          <div className={`formAnswerContainer${answerActive ? ' active': ''}`}>
            <div className={`formAnswer ${answerType}`}>{answer}</div>
          </div>
          <div className="separator"></div>
          <div className="socialNets">
            <div className="text"><p>O iniciar sesión con</p></div>
            <div className="icons">
              <Link to={""} className="netIcon" tabIndex={6}><i className="fa-brands fa-facebook"></i></Link>
              <Link to={""} className="netIcon" tabIndex={7}><i className="fa-brands fa-google"></i></Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
