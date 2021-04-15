import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import HeaderDEyAE from './HeaderDEyAE';
import axios from 'axios';
import DirectorioAlumno from './DirectorioAlumno';
import Cookies from 'universal-cookie';
import DatosActualizadosAlumno from './DatosActualizadosAlumno';
import DatosActualizadosEmail from './DatosActualizadosEmail';

const cookies = new Cookies();

class MisDatosAlumno extends React.Component{


    state = {
        alumno: {},
        usuario: {},
        // idUsuario: cookies.get('idUsuario'),
        // idAlumno: cookies.get('idAlumno'),
        // email: cookies.get('email'),
        idUsuario: "1",
        idAlumno: "1",
        email: "dummy@prueba.com",
        actualizar: null,
        status: null
    };
        componentWillMount() {
            this.getAlumno();
            //alert(cookies.get('idUsuario'));

        }

        getAlumno = () => {
            console.log(this.state.idUsuario);
            axios.get("alumno/findIdUsuario/"+ this.state.idUsuario)
            .then(res => {
                    this.setState({
                        alumno: res.data,
                        status: 'success'
                       });
                       cookies.set('idAlumno', this.state.alumno.idAlumno, {path:"/"})
                       cookies.set('boleta', this.state.alumno.boleta, {path:"/"})
            })
            .catch(err=>{
                window.location.href = '/DatosAlumno';
        })
        }//Fin de funcion getAlumno()

        updateDatos=()=>{
            this.setState({
                actualizar: "DATOS"
            })
        }
        updateEmail=()=>{
            this.setState({
                actualizar: "EMAIL"
            })
        }
        cancel=()=>{
            this.setState({
                actualizar: "false"
            })
        }
        
    render() {
            return(
                <div className="center">
                <HeaderDEyAE />
                    <DirectorioAlumno />
                    <br/>
                    <tbody >
                        <tr >
                            <th className="table_lista">Nombre</th>
                            <th className="table_lista">Boleta</th>
                            <th className="table_lista">Programa Academico</th>
                            <th className="table_lista">Correo</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table_lista">{this.state.alumno.nombre} {this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno}</td>
                            <td className="table_lista">{this.state.alumno.boleta}</td>
                            <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                            <td className="table_lista">{this.state.email}</td>
                            <td><button  className = "btn datosAlumnos"  onClick={this.updateDatos} >Actualizar Información Personal</button></td>
                            <td><button  className = "btn datosAlumnos" onClick={this.updateEmail} >Actualizar Email ó Contraseña</button></td>
                        </tr>
                        </tbody>
                        {(() => {  
                        switch (this.state.actualizar){
                        case "DATOS":
                            return (
                                <div>
                                <DatosActualizadosAlumno/>
                                <button  id="btn_delete" onClick={this.cancel} >Cancelar</button>
                                </div>
                              );
                        break;
                        case "EMAIL":
                            return (
                                <div>
                                <DatosActualizadosEmail
                                redirect="MisDatosAlumno"
                                tipoUsuario="false"
                                />
                                <button  id="btn_delete" onClick={this.cancel} >Cancelar</button>
                                </div>
                              );
                            break;
                         default: break;
                        }
                        })()}
                </div>
            );
}//Fin de Render ()
}//Fin de Classs MisDatosAlumno

export default MisDatosAlumno;