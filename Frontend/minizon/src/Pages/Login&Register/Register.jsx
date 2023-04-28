import "./Credentials.scss"
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { NotificationContext } from "../../Components/App"
import axios from "axios"

async function postData(data, callback) {
  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVICE_1}/usuario/registro`, data)
    callback(res.data)
  } catch (error) {
    callback({'detail': `error: ${error}`})
  }
}

export default function Register() {
  
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
          setAnswer("Registro correcto")
          setAnswerType("success")
          /*
            GUARDAR EL TOKEN DEL USUARIO EN UNA COOKIE CON LA EXPIRACIÓN
            QUE INDICA EL PROPIO TOKEN
          */
         const expires = (new Date(response.Expires)).toUTCString()
  
         document.cookie = `token=${response.AuthToken}; expires=${expires}`
         /* console.log(response)
         console.log("expires: ", expires) */

         navigate("/account")
        } else {
          setAnswer("Hubo un error al registrar el usuario")
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
    if(form['password'].value !== form['confirmPassword'].value) {
      setAnswer("Las contraseñas no coinciden")
      setAnswerType("error")
      setAnswerActive(true)
      setTimeout(() => { setAnswerActive(false) }, 2000);
      return
    }
    
    notiContext.setNotificationData(notificationConf)
    const edad = form['edad'].value
    console.log(edad)
    setFormData(edad > 0 ? {
      Nombre: form['nombre'].value,
      Edad: edad,
      Telefono: form['telefono'].value,
      Email: form['email'].value,
      Password: form['password'].value,
      ExpireInSecs: 25200
    }:{
      Nombre: form['nombre'].value,
      Telefono: form['telefono'].value,
      Email: form['email'].value,
      Password: form['password'].value,
      ExpireInSecs: 25200
    })
  }

  return (
    <div className="registerContainer">
      <form className="credentialsForm" onSubmit={loginUser}>
        <div className="header">
          <p className="title">Registro de usuario</p>
        </div>
        <div className="body">
          <section className="formItem">
            <label htmlFor="nombre"><i className="fa-solid fa-user"></i>*Nombre de usuario</label>
            <input id="nombre" name="nombre" className="formInput" type="text" placeholder="nickname" required tabIndex={1}/>
          </section>
          <section className="formItem">
            <label htmlFor="edad"><i className="fa-solid fa-birthday-cake"></i>Edad</label>
            <input id="edad" name="edad" className="formInput" type="number" placeholder="edad" defaultValue={null} tabIndex={2}/>
          </section>
          <section className="formItem">
            <label htmlFor="telefono"><i className="fa-solid fa-phone"></i>*Teléfono</label>
            <input id="telefono" name="telefono" className="formInput" type="tel" placeholder="1234 45678" required tabIndex={3}/>
          </section>
          <section className="formItem">
            <label htmlFor="email"><i className="fa-solid fa-envelope"></i>*Correo electrónico</label>
            <input id="email" name="email" className="formInput" type="email" placeholder="email@gmail.com" required tabIndex={4}/>
          </section>
          <section className="formItem">
            <label htmlFor="password"><i className="fa-solid fa-lock"></i>*Contraseña</label>
            <input id="password" name="password" className="formInput" type="password" placeholder="contraseña" required tabIndex={5}/>
          </section>
          <section className="formItem">
            <label htmlFor="confirmPassword"><i className="fa-solid fa-shield"></i>*Confirmar contraseña</label>
            <input id="confirmPassword" name="confirmPassword" className="formInput" type="password" placeholder="contraseña" required tabIndex={6}/>
          </section>
        </div>
        <div className="footer">
          <div className="formButtons">
            <button className="button primary" type="submit" tabIndex={7}>Registrarse</button>
            <Link to={"/account/login"} className="button primary" tabIndex={8}>¡Iniciar sesión!</Link>
            {/* <button className="button secondary">¡Registrarse!</button> */}
          </div>
          <div className={`formAnswerContainer${answerActive ? ' active': ''}`}>
            <div className={`formAnswer ${answerType}`}>{answer}</div>
          </div>
          
        </div>
      </form>
    </div>
  )
}
