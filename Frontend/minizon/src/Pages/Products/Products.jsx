import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import './Products.scss'
import React, { useEffect, useRef, useState } from 'react'
import ProductItem from '../../Components/UI Components/ProductItem/ProductItem'
import ProductInfo from '../../Components/UI Components/ProductInfo/ProductInfo'
import axios, { CanceledError } from 'axios'
import { categories, categoriesWithSubCats } from './CategoriesTitles'

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
  const [catTitle, setCatTitle] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    
    if(searchParams.has("subcat")) {
      const cat = searchParams.get("cat")
      const subcat = searchParams.get("subcat")

      if(cat == null || subcat == null) navigate("/")

      try {
        const catTitle = categoriesWithSubCats[cat]["catName"], subcatTitle = categoriesWithSubCats[cat][subcat]

        if(catTitle == undefined || subcatTitle == undefined) navigate('/')
        const title = `${categoriesWithSubCats[cat]["catName"]} - ${categoriesWithSubCats[cat][subcat]}`;
  
        setCatTitle(title)
      } catch (error) { navigate('/') }
    } else {
      const cat = searchParams.get("cat")
      const title = categories[cat]

      if(cat == null || title == undefined) navigate("/")

      setCatTitle(title)
    }
    
  }, [searchParams]);

  return (
    <ProductInfo>
      <ShowProducts title={catTitle}/>
    </ProductInfo>
  )
  
}

function ProductsBySearch() {
  const [searchParams] = useSearchParams()
  
  useEffect(() => {
    //console.log(searchParams.get("id"))
    () => {}
  }, [searchParams]);
  
  return (
    <ProductInfo>
      <ShowProducts title={`Buscando por: ${searchParams.get('search')}`}/>
    </ProductInfo>
  )
}

function ShowProducts({title, productInfoProps, dataPath}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState({ state: "pending", items: Array.from(Array(20))});
  const [requestController, setRequestController] = useState(null);

  useEffect(() => {
    /* ACA SE DEBE CAMBIAR LA RUTA PARA OBTENER LOS DATOS REALES */
    (
      async function() {
        const response = (await axios.get(`http://localhost:3001/productsPaginate?total=${20}&page=${currentPage}`)).data
        setData({state: "ready", items: response.products})
        setTotalPages(response.totalPages)
      }
    )()
  }, []);

  useEffect(() => {
    /* RECUPERAR LOS NUEVOS DATOS DE LA SIGUIENTE PÁGINA */
    if(requestController) requestController.cancel("request canceled")

    const source = axios.CancelToken.source();
    setRequestController(source);

    (
      function() {
        setData({ state: "pending", items: Array.from(Array(20))})
        axios.get(`http://localhost:3001/productsPaginate?total=${20}&page=${currentPage}`, {
          cancelToken: source.token
        })
        .then(response => { setData({state: "ready", items: response.data.products}) })
        .catch(error => {})
      }
    )();

    return () => {
      if(requestController) requestController.cancel()
    }
  }, [currentPage, title, dataPath]);

  const handlePageClick = (page) => {
    if(page <= totalPages && page >= 1) setCurrentPage(page);
  }

  const renderPaginationButtons = () => {
    const buttons = [];

    if(totalPages > 4) {
      buttons.push(<button key="a" onClick={() => handlePageClick(currentPage - 1)} className={`leftPage`}><i className='fa-solid fa-caret-left'></i></button>);
      
      for (let i = 1; i <= totalPages; i++) {
        if(i == 3) {
          buttons.push(
            <button key={i} className={`dotButton`}> <i className='fa-solid fa-ellipsis'></i> </button>
          );
        } else if(i <= 2) {
          buttons.push(
            <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`pageButton${i === currentPage ? ' active' : ''}`}>
              {i}
            </button>
          );
        } else if (i > totalPages - 2) {
          buttons.push(
            <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`pageButton${i === currentPage ? ' active' : ''}`}>
              {i}
            </button>
          );
        }
      }
      
      buttons.push(<button key="b" onClick={() => handlePageClick(currentPage + 1)} className={`rightPage`}><i className='fa-solid fa-caret-right'></i></button>);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(<button key={i} onClick={() => handlePageClick(i)} className={`pageButton${i === currentPage ? ' active' : ''}`}> {i} </button>);
      }
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
        <div className='page'><p>Página {currentPage}</p></div>
        <div className='paginationButtons'> 
          { renderPaginationButtons() }
        </div>
      </footer>
    </div>
  )
}