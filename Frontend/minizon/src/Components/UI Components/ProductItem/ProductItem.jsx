import "./ProductItem.scss"
import React from 'react'

export default function ProductItem({loading, data}) {
  console.log("ProductItem: ", data)
  return (
    <div className={`productItem${loading ? " loading" : ''}`}>
      {
        loading ? <ProductItemsLoading/> :
        <>
          <div className="itemHeader">
            {data.headerData.text}
          </div>
          <div className="itemBody">
            
          </div>
          <div className="itemFooter">

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