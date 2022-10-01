import { useEffect, useState } from "react";

export default function Funcion(props){
    console.log("antes del Renderizado");
    const [paramConState, setParamConState]=useState("valor defecto")
    let paramSinState="valor defecto"

    useEffect (()=>{
        console.log ("paramConState Montado") ;
        return ()=>{
            console.log ("paramConState Desmontado") ;
        }
    },[paramConState]);
    useEffect (()=>{
        console.log ("paramSinState Montado") ;
        return ()=>{
            console.log ("paramSinState Desmontado") ;
        }
    },[paramSinState]);

    console.log("parameConState: "+paramConState);
    console.log("parameSinState: "+paramSinState);
    
    useEffect(()=>{
        console.log("Render Montado")
    }, []);;//con array vacio, se ejecuta despues de montar el render (solo pasa al refrescar la pagina)

    useEffect(()=>{
        console.log("Render Actualizado","------------",);
        return ()=>{
            console.log ("Render Desmontado") ;
        }
    });//sin array, se ejecuta cuando cualquier USESTATE se actualiza (cuando cualquier USESTATE cambia, se actualiza el RENDER)

    function buttonclick() {
        let i1=document.getElementById("inputt")
        setParamConState(i1.value)
        paramSinState=i1.value
    }

    return(
        <>
        {console.log("Renderizando")}
        <p><b>paramSinState: </b>{paramSinState}</p>
        <p><b>paramConState: </b>{paramConState}</p>
        <input id="inputt" type="text" />
        <button onClick={buttonclick}>Cambiar Parametros</button>
        </>
    );
}