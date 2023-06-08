import { CartCountContext } from '../../Components/App';
import Loader from '../../Components/UI Components/Loader/Loader';
import Modal from '../../Components/UI Components/Modal/Modal';
import useModal from '../../Hooks/useModal';
import { clearCart, getCart, getCartCount, removeFromCart, updateCart } from '../../Services/CartService';
import './ShoppingCart.scss'
import React, { useCallback, useContext, useEffect, useState } from 'react'

export default function ShoppingCart() {

  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const modalStates = useModal()
  
  const cartCountContext = useContext(CartCountContext)
  
  
  const handleGetCart = useCallback(
    () => {
      const cart = getCart()
      if(cart.length > 0)
        setSubTotal(cart.reduce((acc, val) => acc + (parseFloat(val.PrecioDeVenta) * parseInt(val.Cantidad)), 0))

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
                          <ProductCount key={product._id} setSubTotal={setSubTotal} index={i} productPrice={product.PrecioDeVenta} count={product.Cantidad} maxCount={product.Stock}/>
                        </div>
                        <div className='price'>
                          <p>Q {product.PrecioDeVenta}</p>
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
              <button className='button primary'><i className='fa-solid fa-lock'></i>Iniciar compra</button>
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