import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './AccountPages.scss'
import React, { useState, useEffect, useCallback } from 'react'

export default function AccountAddresses({UserID}) {
  
  const [returnButton, setReturnButton] = useState(false);
  const [title, setTitle] = useState("Mis direcciones");
  const [addresses, setAddresses] = useState([]);

  const navigate = useNavigate()

  const handleNavigate = useCallback(
    () => { if(returnButton) navigate(-1) }
  )

  useEffect(() => {
    if(location.pathname.includes("@")) setReturnButton(true)
  });

  useEffect(() => {
    if(!location.pathname.includes("@")) setReturnButton(false)
    
    if(location.pathname == "/account/addresses") setTitle("Mis direcciones")
  }, [navigate]);
  
  return (
    <div className='addressesContainer'>
      <header className='addressesHeader'>
        <button onClick={() => handleNavigate()} className={`button secondary${returnButton ? ' active' : ''}`}><i className='fa-solid fa-arrow-left'></i></button>
        <h2>{title}</h2>
      </header>
      <main className='addresses'>
        <Routes>
          <Route element={
            <>
              {
                addresses.map(address => {
                  return (
                    <section className='address'>
                      
                    </section>
                  )
                })
              }
              <section className='address addressNew'>
                <Link to='@addNewAddress' onClick={() => setTitle("Nueva dirección")}>
                  <i className='fa-solid fa-plus'></i>
                  <p>Agregar nueva dirección</p>
                </Link>
              </section>
            </>
          } path='/'/>
          <Route element={<NewAddress/>} path='@addNewAddress'/>
        </Routes>
      </main>
    </div>
  )
}

function NewAddress() {
  return (
    <form className='addressesForm'>
      <header>
        <h2>Datos de la nueva dirección</h2>
      </header>
      <main>
        <div className='formItem'>
          <label>Dirección</label>
          <input className='formInput' placeholder='1ra. av 3ra calle zona 1'/>
        </div>
        <div className='formItem'>
          <label>Departamento</label>
          <select className='formSelect'>
            
          </select>
        </div>
        <div className='formItem'>
          <label>Municipio</label>
          <select className='formSelect'>

          </select>
        </div>
      </main>
      <footer>

      </footer>
    </form>
  )
}