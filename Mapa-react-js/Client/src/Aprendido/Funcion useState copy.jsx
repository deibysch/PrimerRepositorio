import { useEffect, useState} from "react";
export default function Funcion(props){
    
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

    return(
        <>
        {console.log("Renderizando")}
            <button
                onClick={()=>{
                    setCant(pedir?cant-1:cant+1)
                    setPedir(!pedir);
                }}
            >
            {pedir? "Detener": "Iniciar"}
            </button>
        </>
    );
}