import './ProceedPayment.scss'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getToken } from '../../Services/TokenFromCookie';

export default function ProceedPayment() {

  const [direcciones, setDirecciones] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    (async () => {
      const resDir = await axios.get(`${import.meta.env.VITE_SERVICE_1}/direcciones`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })

      const resTar = await axios.get(`${import.meta.env.VITE_SERVICE_1}/tarjetas`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })

      setDirecciones(resDir.data.direcciones)
      setTarjetas(resTar.data.tarjetas)

    })()
  }, []);

  /**
   * 
   * @param {SubmitEvent} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div className='paymentContainer'>
      <form className='paymentForm' onSubmit={handleSubmit}>
        <header>
          <h2>Datos para el pedido</h2>
        </header>
        <main>
          <div className='formItem'>
            <label>NIT</label>
            <input name='nit' className='formInput' placeholder='1234567' required/>
          </div>
          <div className='formItem'>
            <label>Dirección de entrega</label>
            <div className='sectionContainer'>
              <select name='IDDireccion' className='formSelect' required>
                {
                  direcciones.length > 0 ?
                  direcciones.map((direccion, i) => {
                    return (
                      <option key={i} value={direccion.IDDireccion}>
                        {direccion.municipio.Nombre} - {direccion.Direccion}
                      </option>
                    )
                  }) : <option value={1}>No hay direcciones registradas</option>
                }
              </select>
              <i className='fa-solid fa-caret-down'></i>
            </div>
          </div>
          <div className='formItem'>
            <label>Seleccione la tarjeta</label>
            <div className='sectionContainer'>
              <select name='IDTarjetaa' className='formSelect' required>
                {
                  tarjetas.length > 0 ?
                  tarjetas.map((tarjeta, i) => {
                    const ident = tarjeta.Identificador.toString()

                    return (
                      <option key={i} value={`${tarjeta.IDTarjeta};${tarjeta.TipoCredito}`}>
                        {tarjeta.marca.Nombre} {ident.substring(ident.length - 4)}
                      </option>
                    )
                  }) : <option value={1}>No hay tarjetas registradas</option>
                }
              </select>
              <i className='fa-solid fa-caret-down'></i>
            </div>
          </div>
        </main>
        <footer>
          <button type='submit' className='button primary'><i className='fa-solid fa-money-bill'></i>Realizar pedido</button>
        </footer>
      </form>
    </div>
  )
}
