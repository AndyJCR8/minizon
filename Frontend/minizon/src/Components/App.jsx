import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/regular.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'
import '@fortawesome/fontawesome-free/scss/brands.scss'
import { useState, useEffect, useRef, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbars/Navbar/Navbar'
import useWindow from '../Hooks/useWindow'
import Sidebar from './Navbars/Sidebar/Sidebar'
import Bottombar from './Navbars/Bottombar/Bottombar'
import Home from '../Pages/Home/Home'
import Account from '../Pages/Account/Account'
import Notification from './UI Components/Notification/Notification'

export const NotificationContext = createContext()

export default function App() {
  const windowSize = useWindow();
  const sidebarOptions = useRef(null)

  return (
    <div className="App">
      {
        windowSize.Width <= 500 ?
        <> {/* MOBILE */}
         <Navbar/>
         <Sidebar/>
         <Bottombar sidebarRef={sidebarOptions}/>
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
      <Body/>
    </div>
  )
}

function Body() {
  const [notificationData, setNotificationData] = useState({});

  return (
    <NotificationContext.Provider value={{setNotificationData: setNotificationData}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/account/*' element={<Account/>}/>
      </Routes>
      <Notification data={notificationData}/>
    </NotificationContext.Provider>
  )
}
