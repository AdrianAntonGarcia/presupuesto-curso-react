import React, { useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";


function App() {
	//Definir el state

	const [presupuesto, guardarPresupuesto] = useState(0);
	const [restante, guardarRestante] = useState(0);
	// Indicador para mostrar una parte u otra del return
	const [mostrarpregunta, actualizarPregunta] = useState(true);
	//Listado de gastos
	const [gastos, guardarGastos] = useState([]);
	//Objeto del gasto
	const [gasto, guardarGasto] = useState({});
	//Indicador para ver si tiene que aparecer
	const [creargasto, guardarCreargasto] = useState(false);

	// UseEffect que actualiza el restante
	// Se ejecuta cuando ocurre algún cambio en el componente por un cambio de estado, por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta
	// En este caso por los states que definimos en el segundo parámetro
	useEffect(()=>{
		if(creargasto){
			// Agrega el nuevo presupuesto
			guardarGastos([
				...gastos, gasto
			]);
			// Resta del presupuesto actual
			const presupuestoRestante = restante - gasto.cantidad;
			guardarRestante(presupuestoRestante);
		}

		//Resetear a false
		guardarCreargasto(false);
	}, [gasto, creargasto, gastos, restante]);


	return (
		<div className="container">
			<header>
				<h1>Gasto Semanal</h1>
				<div className="contenido-principal contenido">
					{mostrarpregunta ? (
						<Pregunta
							guardarPresupuesto={guardarPresupuesto}
							guardarRestante={guardarRestante}
							actualizarPregunta={actualizarPregunta}
						/>
					) : (
						<div className="row">
							<div className="one-half column">
								<Formulario 
									guardarGasto={guardarGasto}
									guardarCreargasto={guardarCreargasto}
								/>
							</div>
							<div className="one-half column">
								<Listado
									gastos={gastos}
								/>
								<ControlPresupuesto
									presupuesto={presupuesto}
									restante={restante}
								/>
							</div>
						</div>
					)}
				</div>
			</header>
		</div>
	);
}

export default App;
