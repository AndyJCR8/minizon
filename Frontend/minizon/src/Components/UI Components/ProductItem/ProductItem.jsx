import "./ProductItem.scss"
import React, { useCallback } from 'react'

export default function ProductItem({loading, data, productInfoProps}) {

  const handleProductClick = useCallback(
    () => {
      productInfoProps.setShowInfo(true)
      productInfoProps.setProductData(data)
    }
  )
  
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
              <p>Q {data.PrecioDeVenta}</p>
            </div>
            <div className="cartContainer">
              <button className="button secondary"><i className="fa-solid fa-cart-shopping"></i></button>
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