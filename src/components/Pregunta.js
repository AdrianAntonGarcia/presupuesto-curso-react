import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarPregunta }) => {
	// Definir el state
	const [cantidad, guardarCantidad] = useState(0);
	const [error, guardarError] = useState(false);

	// Función que lee el presupuesto
	// Lo que venga del input va a venir como string aunque hayamos definido tipo number
	// onChange={definirPresupuesto}
	// onChange={e=>guardarCantidad(parseInt(e.target.value, 10));}
	const definirPresupuesto = (e) => {
		guardarCantidad(parseInt(e.target.value, 10));
	};

	// Submit para defenir el presupuesto
	const agregarPresupuesto = (e) => {
		e.preventDefault();

		// Validar
		if (cantidad < 1 || isNaN(cantidad)) {
			guardarError(true);
			return;
		}

		// Si pasa la validación
		guardarError(false);
		guardarPresupuesto(cantidad);
		guardarRestante(cantidad);
		actualizarPregunta(false);
	};

	return (
		<Fragment>
			<h2>Coloca tu presupuesto</h2>
			{error ? <Error mensaje="El presupuesto es incorrecto" /> : null}
			<form onSubmit={agregarPresupuesto}>
				<input
					type="number"
					className="u-full-width"
					placeholder="Coloca tu presupuesto"
					onChange={definirPresupuesto}
				/>
				<input
					type="submit"
					className="button-primary u-full-width"
					value="Definir un presupuesto"
				/>
			</form>
		</Fragment>
	);
};

Pregunta.propTypes = {
	guardarPresupuesto: PropTypes.func.isRequired,
	guardarRestante: PropTypes.func.isRequired,
	actualizarPregunta: PropTypes.func.isRequired,
};

export default Pregunta;
