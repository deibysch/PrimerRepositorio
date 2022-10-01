import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../components/Socket";
import '../styles/Conductor.css'
import { urls } from "./Apis";

export default function Conductor(props) {

    let IdLinea = null, jsonLineas = [];
    let Ubicacion = { id: null, circle: null, punto: null }//geolocalizacion
    let map, directionsRenderer, directionsService;//mapa
    let idProceso = null, Compartiendo = false, cant = 0;//micros
    let tiempoSolicitud = 1000

    console.log(useParams())
    Ubicacion.id=useParams().id


    useEffect(() => {
        initMap()
        CargarListaDeLineas()
    }, []);

    function initMap() {
        map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: -17.78443767407429, lng: -63.18189476666437 },
            zoom: 10,
        });
        directionsService = new window.google.maps.DirectionsService();
        directionsRenderer = new window.google.maps.DirectionsRenderer({ map });
        Ubicacion.circle = new window.google.maps.Circle({
            strokeColor: "black",
            strokeOpacity: 0.9,
            strokeWeight: 0.2,
            fillColor: "blue",
            fillOpacity: 0.1,
            map,
        });
        Ubicacion.punto = new window.google.maps.Marker({
            //position: map.getCenter(),
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
            },
            map: map,
        });
    }

    function CargarListaDeLineas() {
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
    }

    function seleccion_ev(event) {
        const seleccion = event.target.value
        IdLinea = seleccion
        socket.emit("UnirConductoraLinea", IdLinea, Ubicacion.id)
        DibujarLinea(seleccion)
    }

    function DibujarLinea(idlinea) {
        const ruta = jsonLineas.find((lin) => lin.id == idlinea)
        if (ruta.path.length >= 2) {
            let ini = ruta.path[0]
            let fin = ruta.path[ruta.path.length - 1]
            let wp = []
            for (var i = 1; i < ruta.path.length - 1; i++) {
                wp.push({ location: (ruta.path[i].lat + ', ' + ruta.path[i].lng), stopover: false })
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

    async function ActualizarUbicacion() {
        if (Compartiendo) {
            cant+=1
            navigator.geolocation.getCurrentPosition(//navigator.geolocation.getCurrentPosition(
                async (position) => {
                    var todo = {
                        "id": 1,
                        "accuracy": position.coords.accuracy,
                        "altitude": position.coords.altitude,
                        "altitudeAccuracy": position.coords.altitudeAccuracy,
                        "heading": position.coords.heading,
                        "latitude": position.coords.latitude,
                        "longitude": position.coords.longitude,
                        "speed": position.coords.speed,
                        "timestamp": position.timestamp,
                        "Solicitud": cant
                    }
                    socket.emit("Ubicacion", todo)
                    // await fetch(
                    //     urls.Ubicaciones +"/"+ todo.id
                    //     , {
                    //         method: 'PUT',
                    //         body: JSON.stringify(todo),
                    //         headers: {
                    //             'Content-type': 'application/json; charset=UTF-8'
                    //         }
                    //     }
                    // )
                    //     .then(response => response.json())
                    //     .then(json => { console.log(json); })
                    //     .catch(err => { console.log(err); });
                    console.log("====")
                    console.log(
                        `Latitud: ${position.coords.latitude}
                          Longitud: ${position.coords.longitude}
                          Precision: ${position.coords.accuracy}
                          Direccion: ${position.coords.heading}
                          Altitud: ${position.coords.altitude}
                          Precision: ${position.coords.altitudeAccuracy}
                          Velocidad: ${position.coords.speed}
                          Fecha: ${new Date(position.timestamp)}
                          Solicitudes: ${cant}
                          --------------`
                    );
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    Ubicacion.circle.setCenter(pos)
                    Ubicacion.circle.setRadius(position.coords.accuracy / 2/*Math.sqrt(position.coords.accuracy) * 100*/)
                    Ubicacion.punto.setPosition(pos)
                    map.setCenter(pos);
                    //map.setZoom(12);
                    console.log("Solicitud " + cant + " OK")
                    idProceso = setTimeout(ActualizarUbicacion, tiempoSolicitud);
                },
                (err) => {
                    console.log("Solicitud " + cant + ": ", err.message);
                    idProceso = setTimeout(ActualizarUbicacion, tiempoSolicitud);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,//cuantos miliseg esperara para enviar un mensaje de error
                    maximumAge: 0//antigüedad máxima en miliseg de una posición almacenada en caché que es aceptable devolver
                }
            );
        }
        else {
            clearTimeout(idProceso)
            Ubicacion.circle.setCenter(null)
            Ubicacion.punto.setPosition(null)
            socket.emit("DetenerUbicacionDelConductor")
        }
    }

    function Button_click(e) {
        const selectt = document.getElementById("select")
        if (IdLinea != null) {
            if (navigator.geolocation) {
                selectt.disabled = !selectt.disabled
                Compartiendo = !Compartiendo
                if (Compartiendo) {
                    socket.emit('chat', "Compartiendo Ubicacion")
                    socket.emit("Uni")
                    e.target.textContent = "Detener"
                    idProceso = setTimeout(ActualizarUbicacion, tiempoSolicitud)
                    // tiempoSolicitud = eval(document.getElementById("inpMilsegSolic").value)
                    // SegUbicInact = eval(document.getElementById("inpSegInact").value)
                }
                else{
                    socket.emit('chat', "Ubicacion Detenida")
                    e.target.textContent = "Compartir"
                }
            } else {
                alert('El navegador no soporta geolocalizacion');
            }
        }
        else
            alert("selecciona una linea")
    }

    return (
        <div className="conductor">
            <div className="divdiv">
                <select id="select" onChange={seleccion_ev} defaultValue={'0'}>
                    <option value="0" disabled>Selecciona tu Linea...</option>
                </select>
                <button onClick={Button_click}>Compartir</button>
            </div>
            <div id="map"></div>
        </div>
    );
}