import "./Home.scss"
import React from 'react'

export default function Home() {
  return (
    <div className="home">
      <div className="titleContainer">
        <p className="title">El <b className="ZillaSlab">ECOMMERCE</b> <br/>enfocado en su vivienda</p>
      </div>
      <Carousel/>
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
            getDataFrom={'/link/backend/productosMasVendidos'}/>
        */}
      </div>
    </div>
  )
}

function Carousel() {
  return (
    <div className="pageCarousel">

    </div>
  )
}

function Section() {
  return (
    <div className="section">

    </div>
  )
}