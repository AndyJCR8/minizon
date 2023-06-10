import axios from 'axios';
import './AccountPages.scss'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../../Services/TokenFromCookie.js'

export default function AccountOrders({UserID}) {
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const ords = await axios.get(`${import.meta.env.VITE_SERVICE_2}/orden/buscarOrdenes/${UserID}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setOrders(ords.data)
    })()

  }, []);

  return (
    <div className='ordersContainer'>
      <div className='ordersList'>
        <div className='title'>
          <p>Lista de pedidos</p>
        </div>
        <div className='items'>
          {
            orders.length > 0 ?
            orders.map((order, i) => {
              const firstProduct = order.IDProductos[0]

              return (
                <section key={crypto.randomUUID()} className='item'>
                  <div className='image'>
                    <img src={`${firstProduct.Imagen}`}/>
                  </div>
                  <div className='orderInfo'>
                    <p>{order.CodigoPedido}</p>
                    <p>{order.EstadoPedido}</p>
                  </div>
                </section>
              )
            }) : <p>No hay pedidos registradas</p>
          }
        </div>
      </div>
    </div>
  )
}
