import Carousel, { CarouselItem } from "./Carousel/Carousel"
import "./Home.scss"
import React from 'react'

export default function Home() {
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
        <Section/>
        <Section/>
        <Section/>
        <Section/>
      </div>
    </div>
  )
}

function Section({title, linkText, linkPath, dataPath}) {
  return (
    <div className="section">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore dicta corporis! Ipsam ut reprehenderit quae sunt neque deserunt, cupiditate sint eligendi saepe nemo amet accusamus officia suscipit ab veniam!</p>
    </div>
  )
}