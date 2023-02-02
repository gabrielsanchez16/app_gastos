import React from 'react'
import {LeadingActions, SwipeableList,SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import ahorro from '../img/icono_ahorro.png'
import casa from '../img/icono_casa.png'
import comida from '../img/icono_comida.png'
import hobbie from '../img/icono_hobbie.png'
import deporte from '../img/icono_deporte.png'
import salud from '../img/icono_salud.png'
import suscripciones from '../img/icono_suscripciones.png'
import estudio from '../img/icono_estudio.png'



const Gasto = ({gasto, setGastoEditar,eliminarGasto}) => {

  const diccionarioIconos = {
  ahorro: ahorro,
  casa: casa,
  comida: comida,
  hobbie: hobbie,
  deporte: deporte,
  salud: salud,
  suscripciones: suscripciones,
  estudios: estudio,
}

const {categoria, nombre, cantidad,fecha, id} = gasto
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style:'currency',
        currency: 'USD'
    })
}

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={()=> setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = ()=> (
    <TrailingActions>
      <SwipeAction 
      onClick={()=> eliminarGasto(id)}
      destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )


  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
            <div className='contenido-gasto'>
              <img src={diccionarioIconos[categoria]} alt={nombre} />
              <div className='descripcion-gasto'>
                <p className='categoria'>{categoria}</p>
                <p className='nombre-gasto'>{nombre}</p>
                <p className='fecha-gasto'>Agregado: <span>{fecha}</span></p>
              </div>
            </div>
            <p className='cantidad-gasto'>{formatearPresupuesto(cantidad)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto