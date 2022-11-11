import React from 'react'
import { useState ,useEffect} from 'react'
import CloseModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'


const Modal = ({setModal, modal, animarModal, setAnimarModal, guardarGasto, gastoEditar}) => {


    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [mensajeError, setMensajeError] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
           }
    }, [])
    

    const handleModal= ()=>{
        setAnimarModal(false)

        setTimeout(()=>{
            modal ? setModal(false) : setModal(true)
        },500)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if([ nombre, cantidad, categoria ].includes('')){
            setMensajeError('Todos los Campos Son Obligatorios')
            
            setTimeout(()=>{
                setMensajeError('')
            },3000)
            return;
        }

        guardarGasto({nombre,cantidad,categoria})
    }

return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={CloseModal} 
                alt="close modal"
                onClick={handleModal}
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
            <legend>{gastoEditar ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensajeError && <Mensaje tipo="error">{mensajeError}</Mensaje>}
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id='nombre'
                    type="text" 
                    placeholder='Add Gasto'
                    value={nombre}
                    onChange={e => {setNombre(e.target.value)}}
                />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id='cantidad'
                    type="number" 
                    placeholder='Add Cantidad'
                    value={cantidad}
                    onChange={e => {setCantidad(Number(e.target.value))}}
                />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                <select  
                    id="categoria"
                    value={categoria}
                    onChange={e => {setCategoria(e.target.value)}}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Casa</option>
                    <option value="comida">Comida</option>
                    <option value="hobbie">Hobbie</option>
                    <option value="deporte">Deporte</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                    <option value="estudios">Estudios</option>
                </select>
            </div>
            <input 
                type="submit" value={gastoEditar? "Guardar Gasto":"Añadir Gasto"} />
        </form>
    </div>
  )
}

export default Modal