import Header from "./components/Header"
import { useState, useEffect } from 'react'
import NewGasto from './img/nuevo-gasto.svg'
import {generarId, formatearFecha}from './helpers/index'
import Modal from "./components/Modal"
import ListadoGastos from "./components/ListadoGastos"

function App() {

  const [presupuesto, setPresupuesto] = useState(0)

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)

  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
   if(Object.keys(gastoEditar).length > 0){
    modal ? setModal(false) : setModal(true)

    setTimeout(()=>{
      setAnimarModal(true)
    },500)
   }
  }, [gastoEditar])
  

  const handleNuevoGasto = () => {

    modal ? setModal(false) : setModal(true)

    setGastoEditar({})

    setTimeout(()=>{
      setAnimarModal(true)
    },500)

  }

  const guardarGasto = gasto => {
    gasto.id = generarId()
    gasto.fecha = formatearFecha(Date.now()) 
    setGastos([...gastos, gasto])

    setAnimarModal(false)

    setTimeout(()=>{
        modal ? setModal(false) : setModal(true)
    },500)
  } 

  return (
    <div className={modal ? 'fijar' : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={NewGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
        )}

      {modal &&
        <Modal
          gastoEditar={gastoEditar}
          setModal={setModal}
          modal={modal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        />

      }
    </div>

  )
}

export default App
