import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter,Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Pasajero from './pages/Pasajero';
import Conductor from './pages/Conductor';
import LineasPasajero from './pages/LineasPasajero';
import { Helmet } from 'react-helmet';
import Funcion from './Aprendido/Funcion';
 
export default function App(){
  return <div>
    <Funcion/>
  </div>
}