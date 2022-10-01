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

   const mapRoute1 = createRef();
   const mapRoute2 = createRef();
   let history = useHistory()
   let map, directionsRenderer, directionsService, cant = 0;
   const [page, setPage] = useState(1)

   useEffect(() => {
      // document.querySelector("#divDibujar").style.display= (page == 3? 'none': 'flex')
      // document.querySelector("#divDibujar h2").textContent="RUTA "+page
      // mapRoute1.current.style.display= (page == 1? 'flex': 'none')
      // mapRoute2.current.style.display= (page == 2? 'flex': 'none')
      // document.getElementById("divDatos").style.display= (page == 3? 'flex': 'none')
   },[page]);

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
      console.log(directionsRenderer);
      e.target.disabled = true;
      let arrayPuntosBasicos = []
      const arrayPuntosPolyline = []
      if (directionsRenderer.directions) {
         const resp = directionsRenderer.directions.request
         arrayPuntosBasicos.push({
            lat: resp.origin.lat ? resp.origin.lat() : resp.origin.location.lat(),
            lng: resp.origin.lng ? resp.origin.lng() : resp.origin.location.lng()
         })

         if (resp.waypoints)
            resp.waypoints.forEach(w => arrayPuntosBasicos.push({ lat: w.location.lat(), lng: w.location.lng() }));

         arrayPuntosBasicos.push({
            lat: resp.destination.lat ? resp.destination.lat() : resp.destination.location.lat(),
            lng: resp.destination.lng ? resp.destination.lng() : resp.destination.location.lng()
         })

         const puntosTempPolyline = directionsRenderer.directions.routes[0].overview_path
         puntosTempPolyline.forEach((p) => {
            arrayPuntosPolyline.push({ latitude: p.lat(), longitude: p.lng() });
         })
      }
      console.log("puntos a enviar:", arrayPuntosBasicos);
      if (arrayPuntosBasicos.length < 2) {
         alert("Selecciona 2 puntos!")
         e.target.disabled = false;
         return;
      }
      const datos = {
         "name": document.getElementById("inputNumLinea").value,
         "color": document.getElementById("inputColorLinea").value,
         "birthday": document.getElementById("inputFechaLinea").value,
         "path": arrayPuntosBasicos,
         "path_polyline": arrayPuntosPolyline,
         "gremial_id": document.getElementById("inputIdSindLinea").value
      };
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
         })
   }


   return (
      <div id='divAgregarLinea'>
         <div id='divPantalla'>
            <div id='divDibujar'>
               <h2>RUTA 1</h2>
               <h5>Selecciona el Inicio y Fin de la Ruta</h5>
               {useMemo(()=> <MapRouteMaker ref={mapRoute1} />,[])}
            </div>
            <div id='divDibujar'>
               <h2>RUTA 2</h2>
               <h5>Selecciona el Inicio y Fin de la Ruta</h5>
               {useMemo(()=> <MapRouteMaker ref={mapRoute2} />,[])}
            </div>
            <div id='divDatos'>
               <input id="inputNumLinea" type="text" placeholder={"Numero de Linea"} />
               <input id="inputColorLinea" type="text" placeholder={"Color de Linea"} />
               <input id="inputFechaLinea" type="date" />
               <input id="inputIdSindLinea" type="text" placeholder={"ID de Sindicato"} />
            </div>
         </div>
         <div>
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
               className={page == 3 ? "btnDesabilitado" : "btnHabilitado"}
               disabled={page == 3 ? true : false}
            >
               <b>{page == 3 ? "Guardar" : "Siguiente"}</b>
            </button>
         </div>
      </div>
   )
}