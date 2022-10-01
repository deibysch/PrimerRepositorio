import { useEffect, useState, useCallback } from "react";

export default function Funcion(props){
    
    const [cantSolicitud, setCantSolicitud] = useState(0);
    const [pedir, setPedir]=useState(false);
    //console.log(props.paramInventado);
    async function get() {
        await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion")
        .then(response => response.json()) 
        .then( json => {
            console.log(json);
            console.log("Solicitud "+(cantSolicitud)+" OK ")
        })
        .catch(err => {
            console.log("Solicitud "+(cantSolicitud)+" ERROR ", err)
        }).finally(()=>{
            console.log(pedir);
            setCantSolicitud(cantSolicitud+1)
        })
    }

    useEffect(()=>{
        if(!pedir)
            return;
        const interval = setInterval(get, 300);//perfecto
        console.log("====");
        return () => clearInterval(interval);
    }, [pedir]);

    return(
        <>
            <h1>{cantSolicitud}</h1>
            <button onClick={()=>{setPedir(!pedir)}}>{pedir? "Detener": "Iniciar"}</button>
        </>
    );
}