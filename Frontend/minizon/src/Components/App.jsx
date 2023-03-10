import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/regular.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'
import { useState, useEffect } from 'react'
import Navbar from './Navbars/Navbar/Navbar'
import useWindow from '../Hooks/useWindow'
import Sidebar from './Navbars/Sidebar/Sidebar'
import Bottombar from './Navbars/Bottombar/Bottombar'

export default function App() {
  const windowSize = useWindow();

  return (
    <div className="App">
      {
        windowSize.Width <= 500 ?
        <> {/* MOBILE */}
         <Navbar/>
         <Sidebar/>
         <Bottombar/>
        </> :
        windowSize.Width <= 768 ?
        <> {/* TABLET */}
          <Navbar/>
          <Sidebar/>
        </> :
        windowSize.Width <= 1024 ?
        <>
          <Navbar/>
          <Sidebar/>
        </> : <Navbar/>
      }
      
    </div>
  )
}
