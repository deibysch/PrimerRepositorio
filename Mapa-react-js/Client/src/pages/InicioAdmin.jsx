import React from "react";
import { useHistory } from "react-router-dom";
export default function InicioAdmin() {

   let history = useHistory();
 
   function AgregarLinea_click() {
     history.push("/agregarlinea");
   }
 
   function EditarLinea_click() {
     history.push("/editarlinea");
   }

   return(
      <>
         <h1>Selecciona una Opcion</h1>
         <button onClick={AgregarLinea_click}>Agregar Linea</button>
         <button onClick={EditarLinea_click}>Editar Linea</button>
      </>
   )
}