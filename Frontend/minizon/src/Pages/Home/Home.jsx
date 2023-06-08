import Carousel, { CarouselItem } from "./Carousel/Carousel"
import "./Home.scss"
import React, { useContext, useEffect } from 'react'
import Section from "./Section/Section"
import { NotificationContext } from "../../Components/App"
import ProductInfo from "../../Components/UI Components/ProductInfo/ProductInfo"

export default function Home() {

  /* const notificationContext = useContext(NotificationContext)
  useEffect(() => {
    notificationContext.setNotificationData({
      "message": "Página principal",
      //"type": "success",
      "icon": "home",
      "execInfo": {
        "time": "3000"
      }
    })
  }, []); */

  return (
    <div className="home">
      <div className="info">
        <div className="titleContainer">
          <p className="title">El <b className="ZillaSlab">ECOMMERCE</b> <br/>enfocado en su vivienda</p>
        </div>
        <Carousel>
          <CarouselItem><img src="/src/Assets/interior1.jpg"/></CarouselItem>
          <CarouselItem><img src="/src/Assets/interior2.jpg"/></CarouselItem>
          <CarouselItem><img src="/src/Assets/interior3.jpg"/></CarouselItem>
          <CarouselItem><img src="/src/Assets/exterior1.jpg"/></CarouselItem>
          <CarouselItem><img src="/src/Assets/exterior2.jpg"/></CarouselItem>
        </Carousel>
      </div>
      <div className="sections">
        {/*
        REENDERIZAR LAS SECCIONES:
          SE COMPONDRÁN DE UN TÍTULO Y UN LINK (PARA ACCEDER AL RESTO DE PRODUCTOS)
          
          CADA SECCIÓN MOSTRARA UN "CONTENT LOADER" ANTES DE CARGAR LOS PRODUCTOS FINALES,
          CON EL OBJETIVO DE ESPERAR ESOS DATOS DEL BACKEND

          EJ.
          <Section
            title={'Más comprados'}
            linkText={'mostrar todos'}
            linkPath={'/categories/mostbuyed'}
            dataPath={'/link/backend/productosMasVendidos'}/>
        */}
        <ProductInfo>
          <Section title="Mesas" linkText="ver todos" dataPath="buscarProductosCatLimit?count=5&cat=salacomedor&subcat=mesas" linkPath="/products/categories?cat=salacomedor&subcat=mesas" productsCount={5}/>
          <Section title="Sillas" linkText="ver todos" dataPath="buscarProductosCatLimit?count=5&cat=salacomedor&subcat=sillas" linkPath="/products/categories?cat=salacomedor&subcat=sillas" productsCount={5}/>
          <Section title="Camas" linkText="ver todos" dataPath="buscarProductosCatLimit?count=5&cat=cuartodormitorio&subcat=camas" linkPath="/products/categories?cat=cuartodormitorio&subcat=camas" productsCount={5}/>
          <Section title="Closets" linkText="ver todos" dataPath="buscarProductosCatLimit?count=5&cat=organizacion&subcat=closets" linkPath="/products/categories?cat=organizacion&subcat=closets" productsCount={5}/>
        </ProductInfo>
      </div>
    </div>
  )
}
