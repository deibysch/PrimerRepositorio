import React from "react";
import { useHistory } from "react-router-dom";
//import './App.css';
export default function Inicio() {

   let history = useHistory();
 
   function Conductor_click() {
     history.push("/login");
   }
 
   function Pasajero_click() {
     history.push("/iniciopasajero");
   }
 
   function Admin_click() {
     history.push("/inicioadmin");
   }

   return(
      <div>
         <h1>Que tipo de usuario eres?</h1>
         <button onClick={Conductor_click}>Conductor</button>
         <br />
         <button onClick={Pasajero_click}>Pasajero</button>
         <br />
         <button onClick={Admin_click}>Admin</button>
      </div>
   )
}