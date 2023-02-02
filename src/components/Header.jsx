
import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"


const Header = ({
  presupuesto, 
  setPresupuesto,
  isValidPresupuesto, 
  setIsValidPresupuesto,
  gastos,
  setGastos 
}) => {
  return (
    <header>
        <h1>MoneyControl-Management</h1>
        {isValidPresupuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            gastos={gastos}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ): (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            
        />
        )}
        
    </header>
  )
}

export default Header