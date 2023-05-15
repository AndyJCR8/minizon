import { useEffect, useState } from 'react'
import './ProductInfo.scss'
import React, { Children, cloneElement } from 'react'

export default function ProductInfo({children}) {

  const [showInfo, setShowInfo] = useState(false);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    
  }, [productData]);

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
        <div className={`productSpecificInfoContainer${showInfo ? ' active' : ''}`}>
          <div className='productSpecificInfo'>
            <header>
              <img src={`${productData.Imagen}`}/>
            </header>
            <main>
              <div className='productName'><p>{productData.Nombre}</p></div>
              <div className='productDescription'><p>{productData.Descripcion}</p></div>
              <div className='productDetails'>
                <p>{productData.Descripcion}</p>
              </div>
            </main>
          </div>
        </div> : null
      }
    </>
  )
}
