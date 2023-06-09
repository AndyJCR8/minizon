import axios from "axios"
import { addToCart, getCart, getCartCount } from "../../../Services/CartService"
import { CartCountContext, NotificationContext } from "../../App"
import "./ProductItem.scss"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getToken } from "../../../Services/TokenFromCookie"

export default function ProductItem({loading, data, productInfoProps}) {
  const notificationContext = useContext(NotificationContext)
  const cartCountContext = useContext(CartCountContext)
  const [frecuent, setFrecuent] = useState(false);

  const handleProductClick = useCallback(
    () => {
      productInfoProps.setShowInfo(true)
      productInfoProps.setProductData(data)
    }
  )

  const handleAddToCart = () => {
    const cart = getCart()
    
    if(cart.some(obj => obj._id == data._id)) {
      if(cart.find(obj => obj._id == data._id).Cantidad + 1 > data.Stock) {
        notificationContext.setNotificationData({
          "message": "Producto agotado",
          "type": "error",
          "icon": "xmark",
          "execInfo": {
            "time": "3000"
          }
        })
        return
      }
    }

    const cartData = {...data}
    if(frecuent) delete cartData.PrecioVenta
    else delete cartData.PrecioBeneficio
    
    addToCart(cartData)
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
  
  return (
    <div className={`productItem${loading ? " loading" : ''}`}>
      {
        loading ? <ProductItemsLoading/> :
        <>
          <div className="itemHeader">
            <img onClick={() => handleProductClick()} src={data.Imagen}/>
          </div>
          <div className="itemBody">
            <div className="catContainer">
              <p>{data.Categoria}</p>
            </div>
            <div className="nameContainer">
              <p>{data.Nombre}</p>
            </div>
          </div> 
          <div className="itemFooter">
            <div className="priceContainer">
              <p>Q {frecuent ? data.PrecioBeneficio : data.PrecioVenta}</p>
            </div>
            <div className="cartContainer">
              <button onClick={() => handleAddToCart()} className="button secondary"><i className="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

function ProductItemsLoading() {
  return (
    <>
      <div className="itemHeader">
        <div className="imgHolder"></div>
      </div>
      <div className="itemBody">
        <div className="categoryHolder"></div>
        <div className="nameHolder"></div>
      </div>
      <div className="itemFooter">
        <div className="priceHolder"></div>
        <div className="cartHolder"></div>
      </div>
    </>
  )
}