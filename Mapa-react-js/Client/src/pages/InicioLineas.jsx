import React, { useEffect } from "react";
import { socket } from "../components/Socket";
import { urls } from './Apis'


export default function InicioLineas() {

    let IdLinea = null, jsonLineas = [];
    let UbicGraf = [/*{'id':null, 'circle':null, 'punto':null}*/]//geolocalizacion
    let map, directionsRenderer, directionsService;//mapa
    let MostrarMicros = false, cant = 0;//micros

    socket.on("Ubicacion", ActualizarUbicacion)

    // socket.on("Ubicacion", (Ubicacion) => {
    //     console.log(Ubicacion);
    //     ActualizarUbicacion(Ubicacion)
    // })

    socket.on("DetenerUbicacionDelConductor", (idubicacion) => {
        EliminarUbicacionDelMapa(idubicacion)
    })

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
        directionsRenderer = new window.google.maps.DirectionsRenderer({
            //draggable: true,
            map,
        });
    }

    function CargarListaDeLineas() {
        const sel = document.getElementById('select')
        fetch(urls.Lineas)
            .then(response => response.json())
            .then(json => {
                json.forEach(elem => {
                    let option = document.createElement("option");
                    option.text = "Linea " + elem.name + " " + elem.color;
                    option.value = elem.id;
                    sel.appendChild(option)
                });
                jsonLineas = json
            })
            .catch(err => { console.log(err); })
    }

    function EliminarUbicacionDelMapa(idubicacion=null, ind=null) {
        let indice = ind!=null? ind : UbicGraf.findIndex(element => element.id == idubicacion);
        if(indice != -1){
            UbicGraf[indice].circle.setMap(null);
            UbicGraf[indice].punto.setMap(null);
            UbicGraf.splice(indice, 1)
        }
    }

    function ActualizarUbicacion(ubic) {
        console.log(ubic);
        let indice = UbicGraf.findIndex(element => element.id == ubic.id);
        if (indice == -1) {
            UbicGraf.push(
                {
                    'id': ubic.id,
                    'circle': new window.google.maps.Circle({
                        // center: {lat: ubic.latitude, lng: ubic.longitude},
                        // radius: ubic.accuracy/2,
                        strokeColor: "black",
                        strokeOpacity: 0.9,
                        strokeWeight: 0.2,
                        fillColor: "blue",
                        fillOpacity: 0.1,
                        map,
                    }),
                    'punto': new window.google.maps.Marker({
                        //position: {lat: ubic.latitude, lng: ubic.longitude},
                        icon: {
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                        },
                        map: map,
                    })
                }
            )
            indice = UbicGraf.length - 1
        }
        const pos = { lat: ubic.latitude, lng: ubic.longitude };
        UbicGraf[indice].circle.setCenter(pos)
        UbicGraf[indice].circle.setRadius(ubic.accuracy / 2)
        UbicGraf[indice].punto.setPosition(pos)
        //map.setCenter(pos);
        cant += 1
        document.getElementById("hh").textContent = "Solicitudes: " + cant
    }

    function seleccion_ev(event) {
        const seleccion = event.target.value
        IdLinea = seleccion
        DibujarLinea(seleccion)
        if (MostrarMicros) {
            while (UbicGraf.length > 0)
                EliminarUbicacionDelMapa(null, 0)
            socket.emit("UnirPasajeroaLinea", IdLinea)
        }
    }


    function DibujarLinea(id) {
        const ruta = jsonLineas.find((lin) => lin.id == id)
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
                .catch((e) => console.log("No se pudo dibujar la ruta: ", e));
        }
    }

    function Button_click(e) {
        if (IdLinea != null) {
            MostrarMicros = !MostrarMicros
            e.target.textContent = (MostrarMicros ? "Ocultar" : "Mostrar") + " Micros"
            if (MostrarMicros) {
                socket.on('Ubicacion', ActualizarUbicacion);
                socket.emit("UnirPasajeroaLinea", IdLinea)
            }
            else {
                //socket.removeListener('Ubicacion', ActualizarUbicacion);
                socket.emit("DesconectarPasajeroDeLinea")
            }
            while (UbicGraf.length > 0)
                EliminarUbicacionDelMapa(null, 0)
        }
        else
            alert("selecciona una linea")
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: '200px', backgroundColor: '#888' }}>
                <h4 id="hh" style={{ textAlign: "center" }}>Solicitudes: {cant}</h4>
                <button onClick={Button_click} style={{ width: '100%' }}>Mostrar Micros</button>
                <select id="select" onChange={seleccion_ev} defaultValue={'0'} style={{ width: '100%' }}>
                    <option value="0" disabled>Selecciona una Linea...</option>
                </select>
            </div>
            <div id="map" style={{ width: '100%', height: '100vh', backgroundColor: 'yellow' }}></div>
        </div>
    )
}