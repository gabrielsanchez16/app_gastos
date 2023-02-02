import { useEffect, useState } from 'react'

const Filtros = ({filtro, setFiltro}) => {
    return (
        <div className='filtros sombra contenedor'>
            <form >
                <div className='campo filter-contain'>
                    <label>Filtrar Gastos</label>
                    <select 
                        value={filtro}
                        onChange={e => {setFiltro(e.target.value)}}
                    >
                        <option value="">-- Todas las Categorias --</option>
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
            </form>
        </div>
    )
}

export default Filtros