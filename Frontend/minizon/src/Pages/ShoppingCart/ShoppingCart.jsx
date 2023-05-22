import Loader from '../../Components/UI Components/Loader/Loader';
import { getCart } from '../../Services/CartService';
import './ShoppingCart.scss'
import React, { useEffect, useState } from 'react'

export default function ShoppingCart() {

  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const cart = getCart()
    if(cart.length > 0)
      setSubTotal(cart.reduce((acc, val) => acc + (parseFloat(val.PrecioDeVenta) * parseInt(val.Cantidad)), 0))

    setProductsData(cart)
    setLoading(false)
  }, []);

  return (
    <>
      {
        loading && <Loader size="xxl" text="cargando"/>
      }
      {
        !loading &&
        <div className='cartContainer'>
          <div className='productsDetails'>
            {
              productsData.length > 0 &&
              productsData.map(product => {
                return (
                  <>
                    {JSON.stringify(product)}
                  </>
                )
              })
            }
          </div>
          <div className='extras'>
            <header>
              <p>Subtotal</p>
              <p>Q{subTotal}</p>
            </header>
            <main>
              <button className='button'><i className='fa-solid fa-lock'></i>Iniciar compra</button>
              <button className='button'>Buscar más productos</button>
            </main>
          </div>
        </div>
      }
    </>
  )
}
