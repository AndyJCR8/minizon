import './AccountPages.scss'
import React from 'react'

export default function AccountUserData({UserID}) {

  /**
   * @param {SubmitEvent} e 
   */
  const updateData = (e) => {
    e.preventDefault()
    console.log(e.currentTarget)
  }

  console.log("UserIDUserData: ", UserID)
  return (
    <div className='userDataContainer'>
      <form className='userDataForm' onSubmit={updateData}>
        <div className='header'>
          <p className='title'></p>
        </div>
        <div className='body'>
          <div className='formItem'>
            <label>Nombre</label>
            <input type='text' placeholder='nombre de usuario'/>
          </div>
          <div className='formItem'>
            <label>Edad</label>
            <input type='number' placeholder='18' min={18} max={999}/>
          </div>
          <div className='formItem'>
            <label>Telefono</label>
            <input type='tel' placeholder='1234-5678'/>
          </div>
          <div className='formItem'>
            <label>Email</label>
            <input type='email' placeholder='correo@gmail.com'/>
          </div>
          <div className='formItem'>
            <label>Contraseña</label>
            <input type='password' placeholder='contraseña'/>
          </div>
        </div>
        <div className='footer'>
          <button className='button primary' type='submit'>Actualizar datos</button>
        </div>
      </form>
    </div>
  )
}
