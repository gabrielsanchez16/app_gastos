import React from 'react'
import Gasto from './Gasto'
const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro }) => {
  return (
    <div className='listado-gastos contenedor'>


      {
        filtro ?
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta Categoria'}</h2>
            {(gastosFiltrados.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                eliminarGasto={eliminarGasto}
                setGastoEditar={setGastoEditar}
              />
            )))}
          </>
          :
          <>
            <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos'}</h2>
            {(gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                eliminarGasto={eliminarGasto}
                setGastoEditar={setGastoEditar}
              />
            )))}
          </>

      }

    </div>
  )
}

export default ListadoGastos