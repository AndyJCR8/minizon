import Loader from '../../Components/UI Components/Loader/Loader';
import Modal from '../../Components/UI Components/Modal/Modal';
import useModal from '../../Hooks/useModal';
import { clearWishList, getWishList, removeFromWishList } from '../../Services/WishListService';
import './WishList.scss'
import React, { useCallback, useContext, useEffect, useState } from 'react'

export default function WishList() {

  const [loading, setLoading] = useState(true);
  const [productsData, setProductsData] = useState([]);

  const modalStates = useModal()

  const handleGetWishList = useCallback(
    () => {
      const wishList = getWishList()
      
      setProductsData(wishList)
      setLoading(false)
    },
  )
  
  const handleDeleteItem = (index) => {
    removeFromWishList(index)
    handleGetWishList()
  }

  const handleClearList = () => {
    clearWishList()
    handleGetWishList()
  }

  useEffect(() => {
    handleGetWishList()
  }, []);

  return (
    <>
      {
        loading && <Loader size="xxl" text="cargando"/>
      }
      {
        !loading && productsData.length > 0 &&
        <div className='wishListContainer'>
          <div className='productsDetails'>
            <div className='title'>
              <p>Lista de deseados</p>
              <button onClick={() => modalStates.Active.setActive(true)} className='button primary'><i className='fa-solid fa-trash'></i> Vaciar lista</button>
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
          <Modal title='Vaciar la lista de deseados' message='¿Está seguro que quiere vaciar la lista?' actions={
            <>
              <button className='button primary' onClick={() => { handleClearList() }}>Si</button>
              <button className='button secondary' onClick={() => { modalStates.Active.setActive(false) }}>No</button>
            </>
          } states={modalStates}/>
        </div>
      }
      {
        !loading && productsData.length == 0 &&
        <div className='noProductsContainer'>
          <h1>No hay productos en la lista de deseados</h1>
        </div>
      }
    </>
  )
}