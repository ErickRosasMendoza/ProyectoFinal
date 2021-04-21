import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import {BrowserRouter, HashRouter} from "react-router-dom";
import Router from './Router';
///////////////////////////////////////////////////

//import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,HashRouter } from 'react-router-dom';

import Error from './components/Error';
import DirectorioAdmin from './components/DirectorioAdmin';
import ListaAlumnos from './components/ListaAlumnos';
import BuscarAlumno from './components/BuscarAlumno';
import CrearAdmin from './components/CrearAdmin';
import DirectorioAlumno from './components/DirectorioAlumno';
import Dictamen from './components/Dictamen';
import Liberacion from './components/Liberacion';
import Baja from './components/Baja';
import ServicioSocial from './components/ServicioSocial';
import SubirDictamen from './components/SubirDictamen';
import SubirLiberacion from './components/SubirLiberacion';
import SubirBaja from './components/SubirBaja';
import SubirServicio from './components/SubirServicio';
import CrearAlumno from './components/CrearAlumno';
import DatosAlumno from './components/DatosAlumno';
import MisDatosAlumno from './components/MisDatosAlumno';
import DatosAdmin from './components/DatosAdmin';
import MisDatosAdmin from './components/MisDatosAdmin';
import DocDictamen from './components/DocDictamen';
import PdfDictamen from './components/PdfDictamen';
import DocBaja from './components/DocBaja';
import PdfBaja from './components/PdfBaja';
import DocLiberacion from './components/DocLiberacion';
import PdfLiberacion from './components/PdfLiberacion';
import DocServicio from './components/DocServicio';
import PdfServicio from './components/PdfServicio';
import BuscarICE from './components/BuscarICE';
import BuscarICA from './components/BuscarICA';
import BuscarIE from './components/BuscarIE';
import BuscarISISA from './components/BuscarISISA';
import AlumnoServicio from './components/AlumnoServicio';
import DirectorioArchivosAlumno from './components/DirectorioArchivosAlumno';
import BuscarBoleta from './components/BuscarBoleta';
import BuscarDictamenAlumnos from './components/BuscarDictamenAlumnos';
import BuscarBajaAlumnos from './components/BuscarBajaAlumnos';
import BuscarLiberacionAlumnos from './components/BuscarLiberacionAlumnos';
import BuscarServicioAlumnos from './components/BuscarServicioAlumnos';
//////////////////////////////////////

ReactDOM.render(
    <React.StrictMode>
         <HashRouter basename={'/'}>
           
         <Switch>
                    <Route exact path="/" component={MisDatosAlumno} />

                     {/**RUTAS ADMINISTRADOR  */}
                     
{/**RUTA PRINCIPAL  */}<Route exact path = "/admin/MisDatosAdmin" component = {MisDatosAdmin}/>
                    <Route exact path = "/admin/Lista" component = {ListaAlumnos}/>
                    <Route exact path = "/admin/BuscarNombre" component ={BuscarAlumno}/>
                    <Route exact path = "/admin/BuscarBoleta" component = {BuscarBoleta}/>
                    <Route exact path = "/admin/Crearadmin" component = {CrearAdmin}/>
                    <Route exact path = "/admin/BuscarICE" component = {BuscarICE}/>
                    <Route exact path = "/admin/BuscarICA" component = {BuscarICA}/>
                    <Route exact path = "/admin/BuscarIE" component = {BuscarIE}/>
                    <Route exact path = '/admin/BuscarISISA' component = {BuscarISISA}/>
                    <Route exact path = "/admin/BuscarDictamen" component = {BuscarDictamenAlumnos}/>
                    <Route exact path = "/admin/BuscarBaja" component = {BuscarBajaAlumnos}/>
                    <Route exact path = "/admin/BuscarLiberacion" component = {BuscarLiberacionAlumnos}/>
                    <Route exact path = "/admin/BuscarServicio" component = {BuscarServicioAlumnos}/>
                    <Route exact path = "/admin/DirectorioArchivosAlumno/:id" component = {DirectorioArchivosAlumno}/>

                     {/**RUTAS USUARIO  */}

{/*RUTA PRINCIPAL, falta poner el "user", PARA QUE NO TRUENE en el back */ }
                    <Route exact path = "/MisDatosAlumno" component = {MisDatosAlumno}/> 

                    <Route exact path = "/user/CrearDictamen" component = {Dictamen}/>
                    <Route exact path = "/user/CrearLiberacion" component = {Liberacion}/>
                    <Route exact path = "/user/CrearBaja" component = {Baja}/>
                    <Route exact path = "/user/CrearServicio" component = {ServicioSocial}/>

                    {/**esta ruta lleva a llenar un frmulario de nuevo usuario */} 
                    <Route exact path = "/DatosAlumno" component = {DatosAlumno}/>

                   
                     {/**RUTAS PARA LOS DOCUMENTOS, LAS COMPARTEN AMBAS PARTES  */}
                   
                    <Route exact path = "/DocDictamen/:doc" component = {DocDictamen}/>
                    <Route exact path = "/DocLiberacion/:doc" component = {DocLiberacion}/>
                    <Route exact path = "/DocBaja/:doc" component = {DocBaja}/>
                    <Route exact path = "/DocServicio/:doc" component = {DocServicio}/>

                    <Route exact path = "/PdfDictamen/:doc" component = {PdfDictamen}/>
                    <Route exact path = "/PdfBaja/:doc" component = {PdfBaja}/>
                    <Route exact path = "/PdfLiberacion/:doc" component = {PdfLiberacion}/>
                    <Route exact path = "/PdfServicio/:doc" component = {PdfServicio}/>
                   
                    {/**esta ruta lleva a llenar un frmulario de nuevo usuario */} 
                    <Route exact path = "/DatosAlumno" component = {DatosAlumno}/>

                    {/*falta poner el "user" como default en el back */ }
                    <Route exact path = "/MisDatosAlumno" component = {MisDatosAlumno}/>  
                   
                    <Route component={Error} />
                    <Route exact path = "/AlumnoServicio/:id" component = {AlumnoServicio}/>
                    
                </Switch>

        
            
         </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();