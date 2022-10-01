export default function Funcion(props){
    
    //console.log(props.paramInventado);
    let id, pedir1=false, cant=0;
    async function get() {
        if(pedir1){
            cant+=1
            await fetch("https://632491505c1b435727ab8796.mockapi.io/deiby/ubicacion")
            .then(response => response.json()) 
            .then( json => {
                console.log(json);
                console.log("Solicitud "+(cant)+" OK ")
            })
            .catch(err => {
                console.log("Solicitud "+(cant)+" ERROR ", err)
            })
            console.log(pedir1, cant);
            document.getElementById("h11").textContent=cant
            id=setTimeout(get, 100);
        }
        else
            clearTimeout(id)
    }

    function Button_click(e) {
        pedir1=!pedir1
        e.target.textContent=pedir1? "Detener": "Iniciar"
        if(pedir1)
            id=setTimeout(get, 100)
        // else
        //     clearTimeout(id)
    }

    return(
        <>
            <h1 id="h11">{cant}</h1>
            <button onClick={Button_click}>Iniciar</button>
        </>
    );
}