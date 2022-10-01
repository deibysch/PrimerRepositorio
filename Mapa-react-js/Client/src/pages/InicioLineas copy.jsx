import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import {urls} from './Apis'

let linea=null, jsonLineas=[];

export default function InicioLineas(){

    let grafGEO=[{'id':null, 'circle':null, 'punto':null}]
    let map, cantidad=0//, directionsRenderer, directionsService
    const [directionsRenderer, setDirectionsRenderer]=useState(null)
    const [directionsService, setDirectionsService]=useState(null)
    
    const [pedir, setPedir]=useState(false);
    const [cant, setCant]=useState(0);

    async function get() {
        await fetch("http://maps.socidocbolivia.site/api/gremial")
        .then(response => response.json()) 
        .then( json => {
            console.log(json);
            console.log("Solicitud "+(0)+" OK ")
        })
        .catch(err => {
            console.log("Solicitud "+(0)+" ERROR ", err)
        })
        
    }

    useEffect(()=>{
        if(!pedir)
            return;
        let id=setTimeout(async ()=> {
            await get()
            console.log(cant,pedir);
            setCant(cant+1)
        }, 100)//500
        return () => {
            clearTimeout(id)
        };
    }, [cant]);
 
    useEffect(()=>{
        console.log("sss");
        initMap()
        const sel=document.getElementById('select')
        fetch(urls.Lineas)
            .then(response => response.json())
            .then(json => {
                json.forEach(elem => {
                    let option = document.createElement("option");
                    option.text = "Linea "+elem.name+" "+elem.color;
                    option.value = elem.id;
                    sel.appendChild(option)
                });
                jsonLineas=json
            })
            .catch(err => {console.log(err);})
   }, []);

    function initMap() {
        map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: -17.78443767407429, lng: -63.18189476666437 },
            zoom: 10,
        });
        setDirectionsService(new window.google.maps.DirectionsService());
        setDirectionsRenderer(new window.google.maps.DirectionsRenderer({
            //draggable: true,
            map,
        }));

        //CrearUbicaciones()
    }

    async function CrearUbicaciones(){
        await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion")
            .then(response => response.json()) 
            .then(async json => {
                json.forEach(async ubic => {
                    if(ubic.linea==linea){
                        //   if(!ubic.online || (Date.now()-ubic.timestamp>20*100)){
                        //       await DetenerUbicacionOnline(ubic.id)
                        //       let indice = grafGEO.findIndex(element => element.id == ubic.id);
                        //       if(indice != -1){
                        //           grafGEO[indice].circle.setMap(null);
                        //           grafGEO[indice].punto.setMap(null);
                        //           grafGEO.splice(indice,1)
                        //       }
                        //   }
                        //   else
                        {
                            let indice = grafGEO.findIndex(element => element.id == ubic.id);
                            
                            if(indice == -1){
                                grafGEO.push(
                                    {
                                        'id':ubic.id,
                                        'circle':new window.google.maps.Circle({
                                            // center: {lat: ubic.latitude, lng: ubic.longitude},
                                            // radius: ubic.accuracy/2,
                                            strokeColor: "black",
                                            strokeOpacity: 0.9,
                                            strokeWeight: 0.2,
                                            fillColor: "blue",
                                            fillOpacity: 0.1,
                                            map,
                                        }),
                                        'punto':new window.google.maps.Marker({
                                            //position: {lat: ubic.latitude, lng: ubic.longitude},
                                            icon: {
                                                path: window.google.maps.SymbolPath.CIRCLE,
                                                scale: 10,
                                            },
                                            map: map,
                                        })
                                    }
                                )
                                indice=grafGEO.length-1
                            }
                            const pos = {lat:ubic.latitude, lng:ubic.longitude};
                            grafGEO[indice].circle.setCenter(pos)
                            grafGEO[indice].circle.setRadius(ubic.accuracy/2)
                            grafGEO[indice].punto.setPosition(pos)
                            //map.setCenter(pos);
                        }
    
                    }
                });
                CrearUbicaciones()
                console.log("Solicitud "+(cantidad+=1)+" OK")
            })
            .catch(async err => {
                console.log("Solicitud "+(cantidad+=1)+" ERROR ", err)
                CrearUbicaciones()
            }
        )
    }

    async function DetenerUbicacionOnline(id){
        var datos = {
            "id": id,
            "online": false
        }
        await fetch(
            'https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion/'+datos.id 
            ,{
                method: 'PUT',
                body: JSON.stringify(datos),
                headers: {'Content-type': 'application/json; charset=UTF-8'}
            }
        )
            .then(response => {
                console.log("online=false: correcto")
            })
            .catch(async err =>{
                console.log("online=false: ERROR: ",err);
                await DetenerUbicacionOnline(id)
            });
    }

    function seleccion_ev(event){
        const seleccion=event.target.value
        //linea=seleccion
        DibujarLinea(seleccion)
    }

    function DibujarLinea(id) {
        const ruta=jsonLineas.find((elem)=>elem.id==id)
        if(ruta.path.length>=2){
            let ini=ruta.path[0]
            let fin=ruta.path[ruta.path.length-1]
            let wp=[]
            for (var i = 1; i < ruta.path.length-1; i++) {
                wp.push({location: (ruta.path[i].lat+', '+ruta.path[i].lng), stopover:false})
            }
            directionsService
                .route({
                    origin: ini,
                    destination: fin,
                    waypoints: wp,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    avoidTolls: false,
                    provideRouteAlternatives: false,
                })
                .then((response) => {
                    directionsRenderer.setDirections(response);
                })
                .catch((e) => console.log("Directions request failed due to ", e));
        }
    }

    return(
        <div style={{display:"flex"}}>
            <div style={{width:'200px', backgroundColor: 'gray'}}>
            <p>Actualizaciones: {cant}</p>
            <button id="btn" style={{width:'100%'}}
                onClick={()=>{
                    setCant(pedir?cant-1:cant+1)
                    setPedir(!pedir);
                }}
            >
                {pedir? "Occultar": "Mostrar"} Micros
            </button>
            <select id="select" onChange={seleccion_ev} defaultValue={'0'} style={{width:'100%'}}>
                <option value="0" disabled>Selecciona una Linea...</option>
            </select>
            </div>
            <div id="map" style={{width:'100%', height:'100vh', backgroundColor: 'yellow'}}>
            {console.log("=====")}</div>
        </div>
    ) 
}