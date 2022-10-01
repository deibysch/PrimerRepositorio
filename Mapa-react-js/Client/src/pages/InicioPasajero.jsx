import React from "react";
import { useHistory } from "react-router-dom";
export default function InicioPasajero() {

   let history = useHistory();
 
   function VerLineas_click() {
     history.push("/InicioLineas");
   }
 
   function CalcularRuta_click() {
     history.push("/calcularruta");
   }

   return(
      <div>
         <h1>Selecciona una Opcion</h1>
         <button onClick={VerLineas_click}>Ver Lineas</button>
         <br />
         <button onClick={CalcularRuta_click}>Calcular Ruta</button>
      </div>
   )
}