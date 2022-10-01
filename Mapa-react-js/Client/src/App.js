import './App.css';
import {socket} from './components/Socket';
import {BrowserRouter,Route, Switch, Link} from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import InicioLineas from './pages/InicioLineas';
import Conductor from './pages/Conductor';
import CalcularRuta from './pages/CalcularRuta'
import InicioPasajero from './pages/InicioPasajero';
import InicioAdmin from './pages/InicioAdmin';
import AgregarLinea from './pages/AgregarLinea';
import EditarLinea from './pages/EditarLinea';

export default function App(){
  return <div>
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={Inicio}/>
        <Route path={"/login"} component={Login}/>
          <Route path={"/conductor/:id"} component={Conductor}/>
        <Route path={"/iniciopasajero"} component={InicioPasajero}/>
          <Route path={"/calcularruta"} component={CalcularRuta}/>
          <Route path={"/iniciolineas"} component={InicioLineas}/>
        <Route path={"/inicioadmin"} component={InicioAdmin}/>
          <Route path={"/agregarlinea"} component={AgregarLinea}/>
          <Route path={"/editarlinea"} component={EditarLinea}/>
      <Route path={"*"} render={()=>{return <h1>Pagina no Encontrada</h1>}}/>
    </Switch>
  </BrowserRouter>
  </div>
}