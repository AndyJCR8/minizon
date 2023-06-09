import axios from 'axios';
import { CartCountContext } from '../../Components/App';
import Loader from '../../Components/UI Components/Loader/Loader';
import Modal from '../../Components/UI Components/Modal/Modal';
import useModal from '../../Hooks/useModal';
import { clearCart, getCart, getCartCount, removeFromCart, updateCart } from '../../Services/CartService';
import ProtectRoutes from '../Account/ProtectRoutes';
import ProceedPayment from '../ProceedPayment/ProceedPayment';
import './ShoppingCart.scss'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { getToken } from '../../Services/TokenFromCookie';

export default function ShoppingCart() {

  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [frecuent, setFrecuent] = useState(false);

  const modalStates = useModal()
  
  const cartCountContext = useContext(CartCountContext)

  useEffect(() => {
    (
      async () => {
        const userData = await axios.get(`${import.meta.env.VITE_SERVICE_1}/usuario/specificUserData`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        axios.post('',)
        //console.log("UserData: ", userData.data)
        setFrecuent(userData.data.Frecuente)
      }
    )()
  })
  
  
  const handleGetCart = useCallback(
    async () => {
      const cart = getCart()

      const Frecuente = (await axios.get(`${import.meta.env.VITE_SERVICE_1}/usuario/specificUserData`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })).data.Frecuente

      if(cart.length > 0)
        setSubTotal(cart.reduce((acc, val) => acc + ((Frecuente ? parseFloat(val.PrecioBeneficio) : parseFloat(val.PrecioVenta)) * parseInt(val.Cantidad)), 0))

      cartCountContext.setCartCount(getCartCount())
      
      setProductsData(cart)
      setLoading(false)
    },
  )
  

  const handleDeleteItem = (index) => {
    removeFromCart(index)
    handleGetCart()
  }

  const handleClearCart = () => {
    clearCart()
    handleGetCart()
  }


  useEffect(() => {
    handleGetCart()
  }, []);


  return (
    <Routes>
      <Route path='/' element={
        <>
          {
            loading && <Loader size="xxl" text="cargando"/>
          }
          {
            !loading && productsData.length > 0 &&
            <div className='cartContainer'>
              <div className='productsDetails'>
                <div className='title'>
                  <p>Carrito de compras</p>
                  <button onClick={() => modalStates.Active.setActive(true)} className='button primary'><i className='fa-solid fa-trash'></i> Vaciar carrito</button>
                </div>
                {
                  productsData.length > 0 &&
                  productsData.map((product, i) => {
                    return (
                      <section key={i} className='item'>
                        <div className='image'>
                          <img src={`${product.Imagen}`}/>
                        </div>
                        <div className='productInfo'>
                          <p>{product.Nombre}</p>
                          <div className='details'>
                            <div className='actions'>
                              <button onClick={() => handleDeleteItem(i)} className='button primary'><i className='fa-solid fa-trash'></i></button>
                              <button className='button secondary'><i className='fa-solid fa-heart'></i></button>
                            </div>
                            <div className='counter'>
                              <ProductCount key={product._id} setSubTotal={setSubTotal} index={i} productPrice={frecuent ? product.PrecioBeneficio : product.PrecioVenta} count={product.Cantidad} maxCount={product.Stock}/>
                            </div>
                            <div className='price'>
                              <p>Q {frecuent ? product.PrecioBeneficio : product.PrecioVenta}</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )
                  })
                }
                <div className='separator'></div>
              </div>
              <div className='extras'>
                <header>
                  <p>Subtotal</p>
                  <p>Q {subTotal}</p>
                </header>
                <main>
                  <Link to='pay' className='button primary'><i className='fa-solid fa-lock'></i>Iniciar compra</Link>
                  <button className='button secondary'>Buscar más productos</button>
                </main>
              </div>
              <Modal title='Vaciar carrito de compras' message='¿Está seguro que quiere vaciar el carrito?' actions={
                <>
                  <button className='button primary' onClick={() => { handleClearCart() }}>Si</button>
                  <button className='button secondary' onClick={() => { modalStates.Active.setActive(false) }}>No</button>
                </>
              } states={modalStates}/>
            </div>
          }
          {
            !loading && productsData.length == 0 &&
            <div className='noProductsContainer'>
              <h1>No hay productos en el carrito</h1>
            </div>
          }
        </>
      }/>
      <Route element={
        <ProtectRoutes>
          <ProceedPayment/>
        </ProtectRoutes>
      } path='/pay'/>
    </Routes>
  )
}

function ProductCount({setSubTotal, productPrice, index, count, maxCount}) {
  const [counter, setCounter] = useState(count);

  const handleProductCount = (plus) => {
    
    if(counter < maxCount && plus) {
      setCounter(last => last + 1);
      setSubTotal(last => last + parseFloat(productPrice));
      updateCart(index, 1)
    }
    if(counter > 1 && !plus) {
      setCounter(last => last - 1);
      setSubTotal(last => last - parseFloat(productPrice));
      updateCart(index, -1)
    }
  }

  return (
    <div className='productCount'>
      <div className='minusCounter'>
        <button onClick={() => { handleProductCount(false) }} className='button primary minusButton'><i className='fa-solid fa-minus'></i></button>
      </div>
      <p className='count'>{counter}</p>
      <div className='plusCounter'>
        <button onClick={() => { handleProductCount(true) }} className='button primary plusButton'><i className='fa-solid fa-plus'></i></button>
      </div>
    </div>
  )
}