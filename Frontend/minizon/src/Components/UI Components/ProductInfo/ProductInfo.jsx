import { useCallback, useEffect, useState } from 'react'
import './ProductInfo.scss'
import React, { Children, cloneElement } from 'react'

export default function ProductInfo({children}) {

  const [showInfo, setShowInfo] = useState(false);
  const [active, setActive] = useState(false);
  const [productData, setProductData] = useState({});

  const [productCount, setProductCount] = useState(0);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    setProductCount(productData.Cantidad)
  }, [productData]);

  const handleProductCount = (plus) => {
    if(counter < productCount && plus) { setCounter(last => last + 1) }
    if(counter > 1 && !plus) { setCounter(last => last - 1) }
  }

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
              <div className='productName'><p>{productData.Nombre}</p></div>
              <div className='productDescription'><p>{productData.Descripcion}</p></div>
              <div className='productDetails'>
                <p className='productPrice'>Q{productData.PrecioDeVenta}</p>
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
                  <button className='button secondary'><i className='fa-solid fa-shopping-cart'></i></button>
                </div>
              </div>
            </main>
          </div>
        </div> : null
      }
    </>
  )
}
