import {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import swal from 'sweetalert';


const ControlPresupuesto = ({presupuesto, gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total,0)
        const totalDisponible = presupuesto - totalGastado

        //porcentaje calcular
        const nuevoPorcentaje = (((presupuesto- totalDisponible) / presupuesto) * 100).toFixed(2);
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },1500)
    }, [gastos])
    

    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style:'currency',
            currency: 'USD'
        })
    }
    
    const HandleReset = () => {
        swal({
            title: "¿Deseas Reiniciar tu Presupuesto?",
            text: "Una vez eliminado no se podra recuperar tu presupuesto y gastos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
              swal("ha sido Reseteado correctamente", {
                icon: "success",
              });
            } else {
              swal("Se cancelo la Accion");
            }
          });
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                value={porcentaje}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#db2777' : '#3b82f6',
                    trailColor:"#f5f5f5",
                    textColor:  porcentaje > 100 ? '#db2777' : '#3b82f6'
                })}
                text={`${porcentaje}% Gastado`}
            >

            </CircularProgressbar>
        </div>
        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={HandleReset}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formatearPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? "negativo" : ""}`}>
                <span>Disponible:</span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatearPresupuesto(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto