import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './AccountPages.scss'
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import useFormAnswer from '../../../Hooks/useFormAnswer';
import axios from 'axios';
import { getToken } from '../../../Services/TokenFromCookie';
import Modal from '../../../Components/UI Components/Modal/Modal';
import useModal from '../../../Hooks/useModal';

export default function AccountAddresses({UserID}) {
  
  const [returnButton, setReturnButton] = useState(false);
  const [title, setTitle] = useState("Mis direcciones");
  const [addresses, setAddresses] = useState([]);
  const [deleteAddData, setDeleteAddData] = useState({});

  const modalStates = useModal()
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    () => { if(returnButton) navigate(-1) }
  )
  const handleAddresses = useCallback(
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVICE_1}/direcciones`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(res.data.direcciones)
        setAddresses(res.data.direcciones)
    }, []
  )

  const handleDeleteAddress = useCallback(
    async () => {
      const res = await axios.delete(`${import.meta.env.VITE_SERVICE_1}/direccion?idDireccion=${deleteAddData.IDDireccion}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      modalStates.Active.setActive(false)
      handleAddresses()
    },
    [deleteAddData]
  )

  const handleSetModalData = useCallback(
    (address) => {
      setDeleteAddData(address);
      modalStates.Active.setActive(true); 
      modalStates.SubMessage.setSubMessage(`${address.Direccion} - ${address.municipio.Nombre} ${address.municipio.departamento.Nombre}`); 
    },
    []
  )
  

  useEffect(() => {
    if(location.pathname.includes("@")) setReturnButton(true)
  });

  useEffect(() => {
    if(!location.pathname.includes("@")) setReturnButton(false)
    
    if(location.pathname == "/account/addresses") {
      setTitle("Mis direcciones")
      handleAddresses()
    }
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
                addresses.map((address, i) => {
                  
                  return (
                    <section key={i} className='address'>
                      <p className='addressInfo'>{address.Direccion}</p>
                      <div className='place'>
                        <p>{address.municipio.Nombre}</p>
                        <p>{address.municipio.departamento.Nombre}</p>
                      </div>
                      <div className='options'>
                        <Link to={`@editAddress/${address.IDDireccion}`}>Editar</Link>
                        <button onClick={() => { handleSetModalData(address) }} type='button'>Eliminar</button>
                      </div>
                    </section>
                  )
                })
              }
              <section className='addressNew'>
                <Link to='@addNewAddress' onClick={() => setTitle("Nueva dirección")}>
                  <i className='fa-solid fa-plus'></i>
                  <p>Agregar nueva dirección</p>
                </Link>
              </section>
              <Modal title='Eliminar dirección' message='¿Desea eliminar la dirección seleccionada?' subMessage={modalStates.SubMessage.subMessage} actions={
                <>
                  <button className='button primary' onClick={() => { handleDeleteAddress() }}>Si</button>
                  <button className='button secondary' onClick={() => { modalStates.Active.setActive(false) }}>No</button>
                </>
              } states={modalStates}/>
            </>
          } path='/'/>
          <Route element={<NewAddress/>} path='@addNewAddress'/>
          <Route element={<EditAddress/>} path='@editAddress/:id'/>
          
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

function EditAddress() {

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [address, setAddress] = useState({});
  
  const { id } = useParams()

  const [answer, answerType, answerActive, setAnswerFormData] = useFormAnswer()
  
  /**
   * @param {SubmitEvent} e
   */
  const editAddress = (e) => {
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
      const res = await axios.put(`${import.meta.env.VITE_SERVICE_1}/direccion?idDireccion=${id}`, { Direccion: form['Direccion'].value, IDMunicipio: form['IDMunicipio'].value }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(res.status == 200) formResponse("Dirección editada correctamente", "success")
      else formResponse("Ha ocurrido un error al editar la dirección", "error")
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
      
      const resAddress = await axios.get(`${import.meta.env.VITE_SERVICE_1}/direccion?idDireccion=${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setAddress(resAddress.data.direccion)
    })()
  }, []);
  
  return (
    <form className='addressesForm' onSubmit={editAddress}>
      <header>
        <h2>Edición de la dirección: </h2>
        {
          Object.keys(address ?? {}).length > 0 ?
          <h3 className='editAddressText'>{address.Direccion} - {address.municipio.Nombre} {address.municipio.departamento.Nombre}</h3> : null
        }
      </header>
      <main>
        <div className='formItem'>
          <label>Dirección</label>
          <input defaultValue={Object.keys(address ?? {}).length > 0 ? address.Direccion : null} name='Direccion' className='formInput' placeholder='1ra. av 3ra calle zona 1' required/>
        </div>
        <div className='formItem'>
          <label>Departamento</label>
          <div className='sectionContainer'>
            <select defaultValue={Object.keys(address ?? {}).length > 0 ? address.municipio.IDDepartamento : ""} name='IDDepartamento' className='formSelect' onChange={departamentoChanged} required>
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
            <select defaultValue={Object.keys(address ?? {}).length > 0 ? address.IDMunicipio : ""} name='IDMunicipio' className='formSelect' required>
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
        <button type='submit' className='button primary'>Editar dirección</button>
      </footer>
    </form>
  )
}