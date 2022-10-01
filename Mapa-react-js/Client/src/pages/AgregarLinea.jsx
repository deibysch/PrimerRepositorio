import '../styles/AgregarLinea.css';
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { urls } from "./Apis"
import { useState } from 'react';
import Map from '../components/Map';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { createRef } from 'react';
import MapRouteMaker from '../components/MapRouteMaker';

export default function Agregarlinea() {

   const mapRoute1 = useMemo(() => createRef(), [])
   const mapRoute2 = useMemo(() => createRef(), [])
   let history = useHistory()
   let map, directionsRenderer, directionsService, cant = 0;
   const [page, setPage] = useState(1)

   useEffect(() => {
      document.querySelector("#divDibujar").style.display = (page == 3 ? 'none' : 'flex')
      mapRoute1.current.style.display = (page == 1 ? 'flex' : 'none')
      mapRoute2.current.style.display = (page == 2 ? 'flex' : 'none')
   });

   function btnAtras_Click() {
      setPage(page - 1);

   }
   function btnSiguiente_Click() {
      //console.log(prueba.props.func.getPuntos())
      setPage(page + 1);
      //    if(part==1){
      //       part=2
      //       const btnAtras=document.getElementById("btnAtras")
      //       btnAtras.disabled=false
      //       btnAtras.className="btnHabilitado"
      //       document.getElementById("divDibujar").style.visibility="hidden"
      //       document.getElementById("divDatos").style.visibility="visible"
      //    }
   }

   async function Guardar_click(e) {
      const [arrayPuntosBasicos1, arrayPuntosPolyline1] = mapRoute1.current[Object.keys(mapRoute1.current)[1]].call.getPuntos()
      const [arrayPuntosBasicos2, arrayPuntosPolyline2] = mapRoute2.current[Object.keys(mapRoute2.current)[1]].call.getPuntos()
      e.target.disabled = false;
      e.target.className="btnDesabilitado";
      const datos = {
         "name": document.getElementById("inputNumLinea").value,
         "colour": document.getElementById("inputColorLinea").value,
         "birthday": document.getElementById("inputFechaLinea").value,
         "description": document.getElementById("tareaDescripLinea").value,
         "gremial_id": document.getElementById("inputIdSindLinea").value,
         "route_essential1": arrayPuntosBasicos1,
         "route_essential2": arrayPuntosBasicos2,
         "route_detail1": arrayPuntosPolyline1,
         "route_detail2": arrayPuntosPolyline2
      };
      console.log("enviando datos...\n",datos);
      await fetch(
         urls.Lineas
         , {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
               'Content-type': 'application/json; charset=UTF-8'
            }
         }
      )
         .then(response => {
            alert("ENVIO CORRECTO: " + response);
            history.push("/inicioadmin")
         })
         .catch(err => {
            alert("ENVIO ERRONEO: " + err);
            e.target.disabled = false;
            e.target.className="btnHabilitado";
         })
   }


   return (
      <div id='divAgregarLinea'>
         <div id='divPantalla'>
            <div id='divDibujar' style={{ display: 'none' }}>
               {useMemo(() => <MapRouteMaker ref={mapRoute1} />, [])}
               {useMemo(() => <MapRouteMaker ref={mapRoute2} />, [])}
               <div>
                  <h2>RUTA {page}</h2>
                  <h5>Selecciona el Inicio y Fin de la Ruta</h5>
               </div>
            </div>
            <div id='divDatos' style={{ display: (page == 3 ? 'flex' : 'none') }}>
               <input id="inputNumLinea" type="text" placeholder={"Numero de Linea"} />
               <input id="inputColorLinea" type="text" placeholder={"Color de Linea"} />
               <input id="inputFechaLinea" type="date" />
               <textarea id="tareaDescripLinea" rows="5" placeholder={"Descripcion"}></textarea>
               <input id="inputIdSindLinea" multiple type="text" placeholder={"ID de Sindicato"} />
            </div>
         </div>
         <div className='divButtons'>
            <button
               onClick={btnAtras_Click}
               id="btnAtras"
               className={page == 1 ? "btnDesabilitado" : "btnHabilitado"}
               disabled={page == 1 ? true : false}
            >
               <b>Atras</b>
            </button>
            <button
               onClick={page == 3 ? Guardar_click : btnSiguiente_Click}
               className={"btnHabilitado"}
            >
               <b>{page == 3 ? "Guardar" : "Siguiente"}</b>
            </button>
         </div>
      </div>
   )
}