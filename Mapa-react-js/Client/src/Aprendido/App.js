import React from 'react';
import Clase from './Clase';
import Funcion from './Funcion';

class App extends React.Component{

  render(){
    return <div>
      <Clase paramInventado={"CLASE"}/>
      <Funcion paramInventado={"FUNCION"}/>
    </div>
  }
}

export default App