import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './AccountPages.scss'
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import useFormAnswer from '../../../Hooks/useFormAnswer';
import axios from 'axios';
import { getToken } from '../../../Services/TokenFromCookie';
import Modal from '../../../Components/UI Components/Modal/Modal';
import useModal from '../../../Hooks/useModal';

export default function AccountCards({UserID}) {
  
  const [returnButton, setReturnButton] = useState(false);
  const [title, setTitle] = useState("Mis tarjetas");
  const [cards, setCards] = useState([]);
  const [deleteAddData, setDeleteAddData] = useState({});

  const modalStates = useModal()
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    () => { if(returnButton) navigate(-1) }
  )
  const handleCards = useCallback(
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVICE_1}/tarjetas`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(res.data.tarjetas)
        setCards(res.data.tarjetas)
    }, []
  )

  const handleDeleteCard = useCallback(
    async () => {
      const res = await axios.delete(`${import.meta.env.VITE_SERVICE_1}/tarjeta?idTarjeta=${deleteAddData.IDTarjeta}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      modalStates.Active.setActive(false)
      handleCards()
    },
    [deleteAddData]
  )

  const handleSetModalData = useCallback(
    (card) => {
      setDeleteAddData(card);
      modalStates.Active.setActive(true); 
      //modalStates.SubMessage.setSubMessage(`${card.Direccion} - ${card.municipio.Nombre} ${card.municipio.departamento.Nombre}`); 
    },
    []
  )
  

  useEffect(() => {
    if(location.pathname.includes("@")) setReturnButton(true)
  });

  useEffect(() => {
    if(!location.pathname.includes("@")) setReturnButton(false)
    
    if(location.pathname == "/account/cards") {
      setTitle("Mis tarjetas")
      handleCards()
    }
  }, [navigate]);
  
  return (
    <div className='cardsContainer'>
      <header className='cardsHeader'>
        <button onClick={() => handleNavigate()} className={`button secondary${returnButton ? ' active' : ''}`}><i className='fa-solid fa-arrow-left'></i></button>
        <h2>{title}</h2>
      </header>
      <main className='cards'>
        <Routes>
          <Route element={
            <>
              {
                cards.map(card => {
                  const identificador = card.Identificador.toString()
                  const year = card.YearVencimiento.toString()
                  const brand = {
                    "Visa": "cc-visa",
                    "MasterCard": "cc-mastercard",
                    "AmericanExpress": "cc-amex",
                    "Discover": "cc-discover",
                    "DinersClub": "cc-diners-club",
                    "JCB": "cc-jcb"
                  }

                  card.Identificador = identificador.substring(identificador.length - 4)
                  card.YearVencimiento = year.substring(year.length - 2)
                  
                  return (
                    <section className={`card ${card.marca.Nombre}`}>
                      <div className='cardContainer'>
                        <p className='cardOwner'>{card.NombreTitular}</p>
                        
                        <div className='cardInfo'>
                          <p className='identifier'>
                            <i className='fa-solid fa-circle'></i>
                            <i className='fa-solid fa-circle'></i>
                            <i className='fa-solid fa-circle'></i>
                            <i className='fa-solid fa-circle'></i>
                            {card.Identificador}
                          </p>
                          <p className='expires'>Fecha de caducidad: {card.MesVencimiento}/{card.YearVencimiento}</p>
                        </div>
                        <div className='options'>
                          <Link to={`@editCard/${card.IDTarjeta}`}>Editar</Link>
                          <button onClick={() => { handleSetModalData(card) }} type='button'>Eliminar</button>
                        </div>
                      </div>
                      <div className='cardBrand'>
                        <div className='brand'><i className={`fa-brands fa-${brand[card.marca.Nombre]}`}></i></div>
                      </div>
                    </section>
                  )
                })
              }
              <section className='cardNew'>
                <Link to='@addNewCard' onClick={() => setTitle("Nueva tarjeta de crédito / débito")}>
                  <i className='fa-solid fa-plus'></i>
                  <p>Agregar nueva tarjeta</p>
                </Link>
              </section>
              <Modal title='Eliminar tarjeta de crédito / débito' message='¿Desea eliminar la tarjeta seleccionada?' subMessage={modalStates.SubMessage.subMessage} actions={
                <>
                  <button className='button primary' onClick={() => { handleDeleteCard() }}>Si</button>
                  <button className='button secondary' onClick={() => { modalStates.Active.setActive(false) }}>No</button>
                </>
              } states={modalStates}/>
            </>
          } path='/'/>
          <Route element={<NewCard/>} path='@addNewCard'/>
          <Route element={<EditCard/>} path='@editCard/:id'/>
          
        </Routes>
      </main>
    </div>
  )
}

function NewCard() {
  const [marcas, setMarcas] = useState([]);

  const [answer, answerType, answerActive, setAnswerFormData] = useFormAnswer()

  /**
   * @param {SubmitEvent} e
   */
  const addNewCard = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    const formResponse = (answer, typeAnswer) => {
      setAnswerFormData(answer, typeAnswer, true)
      setTimeout(() => {
        setAnswerFormData(answer, typeAnswer, false)
      }, 2000);
    }

    if(form['IDMarca'].value == -1) formResponse("Debe seleccionar una marca antes de continuar", "error");
    
    (async () => {
      const res = await axios.post(`${import.meta.env.VITE_SERVICE_1}/tarjeta`,
        {
          Identificador: form['Identificador'].value,
          YearVencimiento: form['YearVencimiento'].value,
          MesVencimiento: form['MesVencimiento'].value,
          NombreTitular: form['NombreTitular'].value,
          CodigoSeguridad: form['CodigoSeguridad'].value,
          TipoCredito: form['TipoCredito'].value,
          IDMarca: form['IDMarca'].value,
        },
        {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(res.status == 200) formResponse("Tarjeta añadida correctamente", "success")
      else formResponse("Ha ocurrido un error al añadir la tarjeta", "error")
    })();
  }


  useEffect(() => {
    (async () => {
      const resMarcas = await axios.get(`${import.meta.env.VITE_SERVICE_1}/marcas`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(!Object.keys(resMarcas.data).includes("message"))
        setMarcas(resMarcas.data.marcas)
    })()
  }, []);
  
  return (
    <form className='cardsForm' onSubmit={addNewCard}>
      <header>
        <h2>Datos de la tarjeta</h2>
      </header>
      <main>
        <div className='formItem'>
          <label>Nombre del titular</label>
          <input name='NombreTitular' className='formInput' type='string' placeholder='nombre del titular' required/>
        </div>
        <div className='formItem'>
          <label>Identificador</label>
          <input name='Identificador' className='formInput' type='number' placeholder='1234567891011121314' min={1} required/>
        </div>
        <div className='formItem'>
          <label>Año de vencimiento</label>
          <input name='YearVencimiento' className='formInput' type='number' placeholder='2024' required/>
        </div>
        <div className='formItem'>
          <label>Mes de vencimiento</label>
          <input name='MesVencimiento' className='formInput' type='number' placeholder='12' max={12} required/>
        </div>
        <div className='formItem'>
          <label>Código de seguridad</label>
          <input name='CodigoSeguridad' className='formInput' type='number' max={999} placeholder='123' required/>
        </div>
        <div className='formItem'>
          <label>Tipo de tarjeta</label>
          <div className='sectionContainer'>
            <select name='TipoCredito' className='formSelect' required>
              <option value='true'>Crédito</option>
              <option value='false'>Débito</option>
            </select>
            <i className='fa-solid fa-caret-down'></i>
          </div>
        </div>
        <div className='formItem'>
          <label>Marca</label>
          <div className='sectionContainer'>
            <select name='IDMarca' className='formSelect' required>
              {
                marcas.length > 0 ?
                marcas.map((marca, i) => {
                  return (
                    <option key={i} value={marca.IDMarca}> {marca.Nombre} </option>
                  )
                }) : <option value={-1}>No hay marcas registradas</option>
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
        <button type='submit' className='button primary'>Registrar tarjeta</button>
      </footer>
    </form>
  )
}

function EditCard() {

  const [marcas, setMarcas] = useState([]);
  const [card, setCard] = useState({});
  
  const { id } = useParams()

  const [answer, answerType, answerActive, setAnswerFormData] = useFormAnswer()
  
  /**
   * @param {SubmitEvent} e
   */
  const editCard = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    const formResponse = (answer, typeAnswer) => {
      setAnswerFormData(answer, typeAnswer, true)
      setTimeout(() => {
        setAnswerFormData(answer, typeAnswer, false)
      }, 2000);
    }

    if(form['IDMarca'].value == -1) formResponse("Debe seleccionar una marca antes de continuar", "error");
    
    (async () => {
      const res = await axios.put(`${import.meta.env.VITE_SERVICE_1}/tarjeta?idTarjeta=${id}`,
      {
        Identificador: form['Identificador'].value,
        YearVencimiento: form['YearVencimiento'].value,
        MesVencimiento: form['MesVencimiento'].value,
        NombreTitular: form['NombreTitular'].value,
        CodigoSeguridad: form['CodigoSeguridad'].value,
        TipoCredito: form['TipoCredito'].value,
        IDMarca: form['IDMarca'].value,
      }
      ,{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(res.status == 200) formResponse("Tarjeta editada correctamente", "success")
      else formResponse("Ha ocurrido un error al editar la tarjeta", "error")
    })();
  }

  useEffect(() => {
    (async () => {
      const resMarcas = await axios.get(`${import.meta.env.VITE_SERVICE_1}/marcas`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      if(!Object.keys(resMarcas.data).includes("message"))
        setMarcas(resMarcas.data.marcas)

      const resCard = await axios.get(`${import.meta.env.VITE_SERVICE_1}/tarjeta?idTarjeta=${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })

      const identificador = resCard.data.tarjeta.Identificador.toString()
      resCard.data.tarjeta.Identificador = identificador.substring(identificador.length - 4)

      setCard(resCard.data.tarjeta)
    })()
  }, []);
  
  return (
    <form className='cardsForm' onSubmit={editCard}>
      <header>
        <h2>Edición de la tarjeta: </h2>
        {
          Object.keys(card ?? {}).length > 0 ?
          <h3 className='editCardText'>
            { card.marca.Nombre }
            <i className='fa-solid fa-circle'></i>
            <i className='fa-solid fa-circle'></i>
            <i className='fa-solid fa-circle'></i>
            <i className='fa-solid fa-circle'></i>
            {card.Identificador}
          </h3>
          : null
        }
      </header>
      <main>
        <div className='formItem'>
          <label>Nombre del titular</label>
          <input defaultValue={Object.keys(card ?? {}).length > 0 ? card.NombreTitular : null} name='NombreTitular' className='formInput' type='string' placeholder='nombre del titular' required/>
        </div>
        <div className='formItem'>
          <label>Identificador</label>
          <input defaultValue={Object.keys(card ?? {}).length > 0 ? card.Identificador : null} name='Identificador' className='formInput' type='number' placeholder='1234567891011121314' min={1} required/>
        </div>
        <div className='formItem'>
          <label>Año de vencimiento</label>
          <input defaultValue={Object.keys(card ?? {}).length > 0 ? card.YearVencimiento : null} name='YearVencimiento' className='formInput' type='number' placeholder='2024' required/>
        </div>
        <div className='formItem'>
          <label>Mes de vencimiento</label>
          <input defaultValue={Object.keys(card ?? {}).length > 0 ? card.MesVencimiento : null} name='MesVencimiento' className='formInput' type='number' placeholder='12' max={12} required/>
        </div>
        <div className='formItem'>
          <label>Código de seguridad</label>
          <input defaultValue={Object.keys(card ?? {}).length > 0 ? card.CodigoSeguridad : null} name='CodigoSeguridad' className='formInput' type='number' max={999} placeholder='123' required/>
        </div>
        <div className='formItem'>
          <label>Tipo de tarjeta</label>
          <div className='sectionContainer'>
            <select defaultValue={Object.keys(card ?? {}).length > 0 ? card.TipoCredito.toString() : ""} name='TipoCredito' className='formSelect' required>
              <option value='true'>Crédito</option>
              <option value='false'>Débito</option>
            </select>
            <i className='fa-solid fa-caret-down'></i>
          </div>
        </div>
        <div className='formItem'>
          <label>Marca</label>
          <div className='sectionContainer'>
            <select defaultValue={Object.keys(card ?? {}).length > 0 ? card.marca.Nombre : ""} name='IDMarca' className='formSelect' required>
              {
                marcas.length > 0 ?
                marcas.map((marca, i) => {
                  return (
                    <option key={i} value={marca.IDMarca}> {marca.Nombre} </option>
                  )
                }) : <option value={-1}>No hay marcas registradas</option>
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