import { useEffect, useState, useCallback, useMemo } from "react";
let pedir1=false;
export default function Funcion(props){
    
    //console.log(props.paramInventado);
    async function get() {
        await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion")
        .then(response => response.json()) 
        .then( json => {
            console.log(json);
            console.log("Solicitud "+(0)+" OK ")
        })
        .catch(err => {
            console.log("Solicitud "+(0)+" ERROR ", err)
        })
        
    }
    
    function Iniciar(){
        let id=setTimeout(async function tick() {
            if(pedir1){
                await get()
                id=setTimeout(tick, 100);
            }
            else
                clearTimeout(id)
            console.log(pedir1);
        }, 100)
    }

    return(
        <>
            <h1>hjk</h1>
            <button onClick={()=>{pedir1=!pedir1; Iniciar()}}>{pedir1? "Detener": "Iniciar"}</button>
        </>
    );
}