import { useSwipeable } from "react-swipeable";
import "./Carousel.scss"
import React, { Children, cloneElement, useEffect, useState } from 'react'

export default function Carousel({children}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    const childrenCount = Children.count(children)

    if(newIndex < 0)                   newIndex = childrenCount - 1
    else if(newIndex >= childrenCount) newIndex = 0
    
    setActiveIndex(newIndex)
  }

  /* FUNCIONES PARA EL SWIPE DE TELEFONOS */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => { updateIndex(activeIndex + 1) },
    onSwipedRight: () => { updateIndex(activeIndex - 1) }
  })
  /* ------------------------------------ */

  useEffect(() => {
    const interval = setInterval(() => {
      if(!paused) updateIndex(activeIndex + 1)
    }, 4000)
    return () => {
      if(interval) clearInterval(interval)
    }
  });

  return (
    <div className="carousel" {...swipeHandlers}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}>
      <div className="indicators">
        <button className="button carouselBtn" onClick={() => updateIndex(activeIndex - 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button className="button carouselBtn" onClick={() => updateIndex(activeIndex + 1)}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <div className='inner' style={{translate: `-${activeIndex * 100}% 0%`}}>
        {
          Children.map(children, (child, i) => {
            return cloneElement(child, { width: "100%" })
          })
        }
      </div>
    </div>
  )
}

export function CarouselItem({ children, width }) {
  return (
    <div className='carouselItem' style={{ width: width}}>
      {children}
    </div>
  )
}