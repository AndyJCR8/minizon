import { Link } from "react-router-dom"
import "./Credentials.scss"
import React from 'react'

export default function Login() {

  /**
   * @param {SubmitEvent} e 
   */
  const loginUser = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    console.log(form["email"].value)
    console.log(form["password"].value)
    

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
            <input name="email" className="formInput" type="email" placeholder="email@gmail.com" required tabIndex={1}/>
          </section>
          <section className="formItem">
            <label htmlFor="password"><i className="fa-solid fa-lock"></i>Contraseña</label>
            <input name="password" className="formInput" type="password" placeholder="contraseña" required tabIndex={2}/>
          </section>
        </div>
        <div className="footer">
          <div className="formButtons">
            <button className="button primary" type="submit" tabIndex={3}>Iniciar sesión</button>
            <Link to={"/account/register"} className="button primary" tabIndex={4}>¡Registrarse!</Link>
            {/* <button className="button secondary">¡Registrarse!</button> */}
          </div>
          <div className="separator"></div>
          <div className="socialNets">
            <div className="text"><p>O iniciar sesión con</p></div>
            <div className="icons">
              <Link to={""} className="netIcon" tabIndex={5}><i className="fa-brands fa-facebook"></i></Link>
              <Link to={""} className="netIcon" tabIndex={6}><i className="fa-brands fa-google"></i></Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
