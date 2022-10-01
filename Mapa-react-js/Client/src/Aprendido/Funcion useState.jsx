import { useEffect, useState, useCallback, useMemo } from "react";
//let pedir=false;
export default function Funcion(props){
    
    const [pedir, setPedir]=useState(false);

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

    useEffect(()=>{
        if(!pedir)
            return;
        let id=setTimeout(async function tick() {
            if(pedir){
                await get()
                id=setTimeout(tick, 800);//500
            }
            else
                clearTimeout(id)
            console.log(pedir);
        }, 800)//500
        return () => clearTimeout(id);
    }, [pedir]);

    return(
        <>
            <h1>hjk</h1>
            <button onClick={()=>{setPedir(!pedir)}}>{pedir? "Detener": "Iniciar"}</button>
        </>
    );
}