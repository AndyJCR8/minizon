import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './AccountPages.scss'
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import useFormAnswer from '../../../Hooks/useFormAnswer';
import axios from 'axios';
import { getToken } from '../../../Services/TokenFromCookie';

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

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const [answer, answerType, answerActive, setAnswerFormData] = useFormAnswer()

  /**
   * @param {SubmitEvent} e
   */
  const addNewAddress = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    const formResponse = (answer, typeAnswer) => {
      setAnswerFormData(answer, typeAnswer, true)
      setTimeout(() => {
        setAnswerFormData(answer, typeAnswer, false)
      }, 2000);
    }

    if(form['IDMunicipio'].value == -1) formResponse("Debe seleccionar un municipio antes de continuar", "error");
    
    (async () => {
      const res = await axios.post(`${import.meta.env.VITE_SERVICE_1}/direccion`, { Direccion: form['Direccion'].value, IDMunicipio: form['IDMunicipio'].value }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(res.status == 200) formResponse("Dirección añadida correctamente", "success")
      else formResponse("Ha ocurrido un error al añadir la dirección", "error")
    })();
  }

  /**
   * @param {ChangeEvent} e 
   */
  const departamentoChanged = (e) => {
    (async () => {
      const idDepartamento = e.currentTarget.value

      const resMunicipios = await axios.get(`${import.meta.env.VITE_SERVICE_1}/municipios?idDepartamento=${idDepartamento}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      
      if(!Object.keys(resMunicipios.data).includes("message"))
        setMunicipios(resMunicipios.data.municipios)
      else setMunicipios([])
    })()
  }

  useEffect(() => {
    (async () => {
      const resDepartamentos = await axios.get(`${import.meta.env.VITE_SERVICE_1}/departamentos`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setDepartamentos(resDepartamentos.data.departamentos)
      
      const lastDepartamento = resDepartamentos.data.departamentos.at(0)
      const resMunicipios = await axios.get(`${import.meta.env.VITE_SERVICE_1}/municipios?idDepartamento=${lastDepartamento.IDDepartamento}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      
      
      if(!Object.keys(resMunicipios.data).includes("message"))
        setMunicipios(resMunicipios.data.municipios)
    })()
  }, []);
  
  return (
    <form className='addressesForm' onSubmit={addNewAddress}>
      <header>
        <h2>Datos de la nueva dirección</h2>
      </header>
      <main>
        <div className='formItem'>
          <label>Dirección</label>
          <input name='Direccion' className='formInput' placeholder='1ra. av 3ra calle zona 1' required/>
        </div>
        <div className='formItem'>
          <label>Departamento</label>
          <div className='sectionContainer'>
            <select name='IDDepartamento' className='formSelect' onChange={departamentoChanged} required>
              {
                departamentos.map((departamento, i) => {
                  return (
                    <option key={i} value={departamento.IDDepartamento}>
                      {departamento.Nombre}
                    </option>
                  )
                })
              }
            </select>
            <i className='fa-solid fa-caret-down'></i>
          </div>
        </div>
        <div className='formItem'>
          <label>Municipio</label>
          <div className='sectionContainer'>
            <select name='IDMunicipio' className='formSelect' required>
              {
                municipios.length > 0 ?
                municipios.map((municipio, i) => {
                  return (
                    <option key={i} value={municipio.IDMunicipio}>
                      {municipio.Nombre} - {municipio.CodigoPostal}
                    </option>
                  )
                }) : <option value={-1}>No hay municipios registrados</option>
              }
            </select>
            <i className='fa-solid fa-caret-down'></i>
          </div>
        </div>
      </main>
      <footer>
        <div className={`formAnswerContainer${answerActive ? ' active': ''}`}>
          <div className={`formAnswer ${answerType}`}>{answer}</div>
        </div>
        <button type='submit' className='button primary'>Agregar dirección</button>
      </footer>
    </form>
  )
}