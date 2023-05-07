import axios from 'axios';
import './AccountPages.scss'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../../Services/TokenFromCookie';
import useFormAnswer from '../../../Hooks/useFormAnswer';

export default function AccountUserData({UserID}) {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formDisable, setFormDisable] = useState(true);

  const [answer, answerType, answerActive, setAnswerFormData] = useFormAnswer()
  
  /**
   * @param {SubmitEvent} e 
   */
  const updateData = (e) => {
    e.preventDefault()
    if(formDisable) return;

    const form = e.currentTarget
    const data = {}

    for(let key of Object.keys(form)) {
      if(form[key].value != "" && form[key].value != undefined) data[form[key].name] = form[key].value
    }
    delete data.ConfirmPass

    if(form['Password'].value != form['ConfirmPass'].value) {
      setAnswerFormData("Las contraseñas no son iguales", "error", true)
      setTimeout(() => {
        setAnswerFormData("Las contraseñas no son iguales", "error", false)
      }, 2000);
      return;
    }

    (async () => {
      const res = await axios.put(`${import.meta.env.VITE_SERVICE_1}/usuario/actualizacion?idUsuario=${UserID}`, data, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      let ResAnswer = "", ResType = ""

      if(res.status == 200) { ResAnswer = "Datos actualizados correctamente"; ResType = "success" }
      else { ResAnswer = "Ha ocurrido un error en la petición"; ResType = "error" }

      setAnswerFormData(ResAnswer, ResType, true)
      setTimeout(() => {
        setAnswerFormData(ResAnswer, ResType, false)
      }, 2000);
    })()

    setFormDisable(true)
  }
  
  useEffect(() => {

    (async () => {
      
      const res = await axios.get(`${import.meta.env.VITE_SERVICE_1}/usuario/specificUserData?idUsuario=${UserID}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setUserData(res.data)
      setLoading(false)
      
    })();

  }, []);

  
  return (
    <div className='userDataContainer'>
      <form className='userDataForm' onSubmit={updateData} onChange={()=>{setFormDisable(false)}}>
        <header className='header'>
          <h2 className='title'>Edición de datos de la cuenta</h2>
        </header>
        <main className='body'>
          <section className='formItem'>
            <label>Nombre</label>
            <input name='Nombre' defaultValue={userData['Nombre']} className='formInput' type='text' placeholder='nombre de usuario' readOnly={loading}/>
          </section>
          <section className='formItem'>
            <label>Edad</label>
            <input name='Edad' defaultValue={userData['Edad']} className='formInput' type='number' placeholder='18' min={18} max={999} readOnly={loading}/>
          </section>
          <section className='formItem'>
            <label>Telefono</label>
            <input name='Telefono' defaultValue={userData['Telefono']} className='formInput' type='tel' placeholder='1234-5678' readOnly={loading}/>
          </section>
          <section className='formItem'>
            <label>Email</label>
            <input name='Email' defaultValue={userData['Email']} className='formInput' type='email' placeholder='correo@gmail.com' readOnly={loading}/>
          </section>
          <section className='formItem'>
            <label>Contraseña</label>
            <input name='Password' className='formInput' type='password' placeholder='contraseña'/>
          </section>
          <section className='formItem'>
            <label>Confirmar contraseña</label>
            <input name='ConfirmPass' className='formInput' type='password' placeholder='confirmar contraseña'/>
          </section>
        </main>
        <footer className='footer'>
          <div className={`formAnswerContainer${answerActive ? ' active': ''}`}>
            <div className={`formAnswer ${answerType}`}>{answer}</div>
          </div>
          <button className='button primary' type='submit' disabled={formDisable}>Actualizar datos</button>
        </footer>
      </form>
    </div>
  )
}
