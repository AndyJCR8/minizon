import { addToCart, getCart, getCartCount } from "../../../Services/CartService"
import { CartCountContext, NotificationContext } from "../../App"
import "./ProductItem.scss"
import React, { useCallback, useContext } from 'react'

export default function ProductItem({loading, data, productInfoProps}) {
  const notificationContext = useContext(NotificationContext)
  const cartCountContext = useContext(CartCountContext)
  

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
    
    addToCart({...data})
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
              <p>Q {data.PrecioVenta}</p>
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