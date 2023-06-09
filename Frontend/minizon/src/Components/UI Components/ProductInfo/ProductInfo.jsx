import { useCallback, useEffect, useState } from 'react'
import './ProductInfo.scss'
import React, { Children, cloneElement } from 'react'
import { addToCart, getCart, getCartCount } from '../../../Services/CartService';
import { useContext } from 'react';
import { CartCountContext, NotificationContext } from '../../App';
import { addToWishList, getWishList, removeFromWishList } from '../../../Services/WishListService';
import axios from 'axios';
import { getToken } from '../../../Services/TokenFromCookie';

export default function ProductInfo({children}) {

  const [showInfo, setShowInfo] = useState(false);
  const [active, setActive] = useState(false);
  const [productData, setProductData] = useState({});

  const [productCount, setProductCount] = useState(0);
  const [counter, setCounter] = useState(1);

  const [loved, setLoved] = useState(false);
  const [frecuent, setFrecuent] = useState(false);

  const notificationContext = useContext(NotificationContext)
  const cartCountContext = useContext(CartCountContext)

  const handleProductCount = (plus) => {
    if(counter < productCount && plus) { setCounter(last => last + 1) }
    if(counter > 1 && !plus) { setCounter(last => last - 1) }
  }

  const handleAddToCart = () => {
    const cart = getCart()
    if(cart.some(obj => obj._id == productData._id)) {
      if(cart.find(obj => obj._id == productData._id).Cantidad + counter > productData.Stock) {
        notificationContext.setNotificationData({
          "message": "Existencia excedida",
          "type": "error",
          "icon": "xmark",
          "execInfo": {
            "time": "3000"
          }
        })
        return
      }
    }
    
    addToCart({...productData, Cantidad: counter})
    cartCountContext.setCartCount(getCartCount())
    notificationContext.setNotificationData({
      "message": "Producto añadido al carrito",
      "type": "success",
      "icon": "check",
      "execInfo": {
        "time": "3000"
      }
    })
  }
  
  const handleAddToWishList = () => {

    if(!loved) addToWishList(productData)
    else removeFromWishList(getWishList().findIndex(item => item._id == productData._id))

    setLoved(!loved)
    notificationContext.setNotificationData({
      "message": !loved ? "Producto añadido a los deseados" : "Producto eliminado de los deseados",
      "type": "",
      "icon": "heart",
      "execInfo": {
        "time": "2000"
      }
    })
  }

  useEffect(() => {
    (
      async () => {
        const userData = await axios.get(`${import.meta.env.VITE_SERVICE_1}/usuario/specificUserData`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        //console.log("UserData: ", userData.data)
        
        setFrecuent(userData.data.Frecuente)
      }
    )()
  })

  useEffect(() => {
    setProductCount(productData.Stock)
    setLoved(getWishList().some(item => item._id == productData._id))
  }, [productData]);


  useEffect(() => {
    setTimeout(() => { setActive(showInfo) }, 100);
    setCounter(1)
  }, [showInfo]);

  return (
    <>
      {
        Children.map(children, child => {
          return cloneElement(child, {
            productInfoProps: {
              setShowInfo: setShowInfo, setProductData: setProductData
            }
          })
        })
      }
      {
        showInfo && Object.keys(productData ?? {}).length > 0 ?
        <div className={`productSpecificInfoContainer${active ? ' active' : ''}`}>
          <div className='productSpecificInfo'>
            <div className='closeContainer'> <button onClick={() => { setActive(false); setTimeout(() => { setShowInfo(false) }, 250); }} className='button secondary'><i className='fa-solid fa-xmark'></i></button> </div>
            <header>
              <img src={`${productData.Imagen}`}/>
            </header>
            <main>
              <div className='productName'>
                <p className='name'>{productData.Nombre}</p>
                <div className='categoryContainer'>
                  <p className='category'><i className='fa-solid fa-cubes-stacked'></i>{productData.Categoria}</p>
                  <button onClick={() => handleAddToWishList()} className='button'><i className={`fa-${loved ? 'solid' : 'regular'} fa-heart`}></i></button>
                </div>
              </div>
              <div className='productDescription'><p>{productData.Descripcion}</p></div>
              <div className='productDetails'>
                <p className='productPrice'>Q{frecuent ? productData.PrecioBeneficio : productData.PrecioVenta}</p>
                <div className='productCount'>
                  <div className='minusCounter'>
                    <button onClick={() => { handleProductCount(false) }} className='button primary minusButton'><i className='fa-solid fa-minus'></i></button>
                  </div>
                  <p className='count'>{counter}</p>
                  <div className='plusCounter'>
                    <button onClick={() => { handleProductCount(true) }} className='button primary plusButton'><i className='fa-solid fa-plus'></i></button>
                  </div>
                </div>
                <div className='addToCartContainer'>
                  <button onClick={() => handleAddToCart()} className='button secondary'><i className='fa-solid fa-shopping-cart'></i></button>
                </div>
              </div>
            </main>
          </div>
          <div onClick={() => { setActive(false); setTimeout(() => { setShowInfo(false) }, 250); }} className='backgroundScreen'></div>
        </div> : null
      }
    </>
  )
}
