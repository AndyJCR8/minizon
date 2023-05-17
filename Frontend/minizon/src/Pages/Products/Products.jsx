import { Route, Routes, useSearchParams } from 'react-router-dom'
import './Products.scss'
import React, { useEffect, useState } from 'react'
import ProductItem from '../../Components/UI Components/ProductItem/ProductItem'
import ProductInfo from '../../Components/UI Components/ProductInfo/ProductInfo'
import axios from 'axios'

export default function Products() {

  return (
    <div className='productsContainer'>
      <Routes>
        <Route path='categories' element={<ProductsByCategory/>}/>
        <Route path='searchFor' element={<ProductsBySearch/>}/>
      </Routes>
    </div>
  )
}

function ProductsByCategory() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    console.log(searchParams.get("id"))
  }, [searchParams]);

  return (
    <ProductInfo>
      <ShowProducts title="Categoría"/>
    </ProductInfo>
  )
  
}

function ProductsBySearch() {
  const [searchParams] = useSearchParams()
  
  useEffect(() => {
    console.log(searchParams.get("id"))
  }, [searchParams]);
  
  return (
    <></>
  )
}

function ShowProducts({title, productInfoProps, dataPath}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState({ state: "pending", items: Array.from(Array(50))});


  useEffect(() => {
    /* ACA SE DEBE CAMBIAR LA RUTA PARA OBTENER LOS DATOS REALES */
    (
      async function() {
        const response = (await axios.get(`http://localhost:3001/productsPaginate?total=${50}`)).data
        console.log(response)
        setData({state: "ready", items: response.products})
        setTotalPages(response.totalPages)
      }
    )()
    /*setTimeout(() => {
      const data = []
      for(var x = 0; x < productsCount; x++) data.push({
        headerData: { text: "headerItem" + x },
        bodyData: { text: "bodyItem" + x },
        footerData: { text: "footerItem" + x}
      })
      console.log(data)
      setData({state: "ready", items: [...data]})
    }, 4000);*/
  }, []);

  useEffect(() => {
    /* RECUPERAR LOS NUEVOS DATOS DE LA SIGUIENTE PÁGINA */
  }, [currentPage]);

  const handlePageClick = (page) => setCurrentPage(page);

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pageButton${i === currentPage ? ' active' : ''}`}>
          {i}
        </button>
      );
    }
    
    return buttons;
  };

  return (
    <div className='products'>
      <header>
        <p className='title'>{title}</p>
      </header>
      <main>
        {/* LISTADO DE PRODUCTOS SEGUN LA RUTA ENVIADA POR LA PROP dataPath */}
        {
          data.items.map((item, j) => {
            return (
              <ProductItem key={j}
              loading={data.state == "pending"}
              data={item}
              productInfoProps={productInfoProps}/>
            )
          })
        }
      </main>
      <footer>
        { renderPaginationButtons() }
      </footer>
    </div>
  )
}