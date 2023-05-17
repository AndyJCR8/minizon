import './Section.scss'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ProductItem from '../../../Components/UI Components/ProductItem/ProductItem';
import axios from 'axios';

export default function Section({title, linkText, linkPath, dataPath, productsCount, productInfoProps}) {

  const [data, setData] = useState({ state: "pending", items: Array.from(Array(productsCount))});
  
  useEffect(() => {
    (
      async function() {
        const response = (await axios.get(`http://localhost:3001/products?total=${productsCount}`)).data
        setData({state: "ready", items: response.products})
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

  return (
    <div className="section">
      <div className="header">
        <div className='title'> <p>{title}</p> </div>
        {
          linkText ? <div className='viewall'> <Link to={linkPath}>{linkText}<i className='fa-solid fa-cubes-stacked'></i></Link> </div> : null
        }        
      </div>
      <div className="body">
        {
          data.items.map((item, j) => {
            //console.log(item)
            return (
              <ProductItem key={j}
              loading={data.state == "pending"}
              data={item}
              productInfoProps={productInfoProps}/>
            )
          })
        }
      </div>
    </div>
  )
}
