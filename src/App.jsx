import Header from "./components/Header"
import { useState, useEffect } from 'react'
import NewGasto from './img/nuevo-gasto.svg'
import {generarId, formatearFecha}from './helpers/index'
import Modal from "./components/Modal"
import ListadoGastos from "./components/ListadoGastos"
import Filtros from "./components/Filtros"

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto")) ?? 0)

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)

  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): [])

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
   if(Object.keys(gastoEditar).length > 0){
    modal ? setModal(false) : setModal(true)

    setTimeout(()=>{
      setAnimarModal(true)
    },500)
   }
  }, [gastoEditar])

  useEffect(() => {
   localStorage.setItem("presupuesto",presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }

  }, [])

  useEffect(() => {
   localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  
  useEffect(() => {
    if(filtro){
      //filtrar gastos por categorias
      const gastosFiltrados = gastos.filter(gasto => {
        return gasto.categoria === filtro

      })
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  

  const handleNuevoGasto = () => {

    modal ? setModal(false) : setModal(true)

    setGastoEditar({})

    setTimeout(()=>{
      setAnimarModal(true)
    },500)

  }

  const guardarGasto = gasto => {

    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState=> gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      //Crear Gasto
      gasto.id = generarId()
    gasto.fecha = formatearFecha(Date.now()) 
    setGastos([...gastos, gasto])

    }
    setAnimarModal(false)

    setTimeout(()=>{
        modal ? setModal(false) : setModal(true)
    },500)
    
  } 

  const eliminarGasto = (id)=>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          
          <main>
            <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
            ></Filtros>
            <ListadoGastos
              gastos={gastos}
              
              eliminarGasto={eliminarGasto}
              setGastoEditar={setGastoEditar}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
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
          setGastoEditar={setGastoEditar}
        />

      }
    </div>

  )
}

export default App
