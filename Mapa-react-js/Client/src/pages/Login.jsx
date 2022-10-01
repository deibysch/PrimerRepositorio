import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { urls } from "./Apis";
export default function Login() {
   let jsonUsuarios=[]
   useEffect(()=>{
      fetch(urls.Usuarios)
          .then(response => response.json())
          .then(json => {
              jsonUsuarios = json
              console.log("usuarios cargados");
          })
          .catch(err => { console.log(err); })
   },[])

   let history = useHistory();

   function Conductor() {
      let  lbluser=document.getElementById("lbluser").value
      let  lblpassword=document.getElementById("lblpassword").value
      let userLog=jsonUsuarios.find((elem)=>elem.user==lbluser && elem.password==lblpassword)
      if(userLog!=undefined)
         history.push("/conductor/"+userLog.idusuario);
      else
         alert("datos incorrectos")
   }

   return (
      <div>
         <label>Usuario</label>
         <input id="lbluser" type="text" />
         <br />
         <label>Contraseña</label>
         <input id="lblpassword" type="text" />
         <br />
         <button onClick={Conductor}>Iniciar Sesion</button>
      </div>
   )
}