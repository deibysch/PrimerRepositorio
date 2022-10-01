import { forwardRef } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import Map from "./Map";

let Static_ID = 0

const MapRouteMaker=forwardRef((props, ref)=> {
    Static_ID+=1
    console.log("creando MapRouteMaker"+ Static_ID);

    const map_comp=createRef(null)
    let map_google, directionsService, directionsRenderer;

    useEffect(()=>{
        InitMap()
    },[])

    function InitMap() {
        map_google=map_comp.current[Object.keys(map_comp.current)[1]].call.map();
        directionsService=new window.google.maps.DirectionsService();
        directionsRenderer=new window.google.maps.DirectionsRenderer({
            draggable:true,
            map: map_google
        })

        const coord = []
        map_google.addListener("click", (e) => {
           if (coord.length < 2) {
              coord.push({ lat: e.latLng.lat(), lng: e.latLng.lng() })
              if (coord.length > 1) {
                 directionsService
                    .route({
                       origin: coord[0],
                       destination: coord[coord.length - 1],
                       travelMode: window.google.maps.TravelMode.DRIVING,
                       avoidTolls: false,
                       provideRouteAlternatives: false,
                    })
                    .then((response) => {
                       directionsRenderer.setDirections(response);
                    })
                    .catch((e) => window.alert("Error al calcular direccion: ", e));
              }
              else if (coord.length > 2) {
                 coord.splice(0, coord.length - 1)
              }
           }
        })

    }

    function getPuntos() {
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
        if (arrayPuntosBasicos.length < 2) {
            alert("Selecciona 2 puntos!")
            return;
        }
        return [arrayPuntosBasicos, arrayPuntosPolyline]
    }

    return(
        <div
            id={"div"+Static_ID}
            key={"dic"+Static_ID}
            call={{getPuntos}}
            style={{
                width: '100%',
                height: '100%',
            }}
            ref={ref}
        >
        <Map ref={map_comp}/>
        </div>
    )
})

export default MapRouteMaker