import React from 'react'

export default function ProceedPayment() {
  return (
    <div className='paymentContainer'>
      <form className='paymentForm' onSubmit={addNewAddress}>
        <header>
          <h2>Datos para el pedido</h2>
        </header>
        <main>
          <div className='formItem'>
            <label>Nombre completo</label>
            <input name='Nombre' className='formInput' placeholder='nombre completo' required/>
          </div>
          <div className='formItem'>
            <label>NIT</label>
            <input name='nit' className='formInput' placeholder='1234567' required/>
          </div>
          <div className='formItem'>
            <label>NIT</label>
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
          <button type='submit' className='button primary'><i className='fa-solid fa-money-bill'></i>Realizar pedido</button>
        </footer>
      </form>
    </div>
  )
}
