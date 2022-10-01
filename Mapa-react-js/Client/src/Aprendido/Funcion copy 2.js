import { useEffect, useState } from "react";

export default function Funcion(props){
    
    const [name, setName] = useState('');
    //console.log(props.paramInventado);

    useEffect(()=>{
        setName('texto despues del render(): '+props.paramInventado)
    }, []);

    return(
        <h1 id="h11">{name}</h1>
    );
}