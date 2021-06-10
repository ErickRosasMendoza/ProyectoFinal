import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BorrarDoc from './BorrarDoc';


class AlumnoBaja extends React.Component{



    state = {
        idAlumno: this.props.id,
        alumno: {},
    };
      componentWillMount() {
           this.getAlumno();
        }
        getAlumno = () => {
            axios.get("alumno/find/"+ this.props.id)
            .then(response => {
            this.setState({
                alumno: response.data,
            });
            } );   
        }//Fin de getAlumno()
    
    render(){
        return(
            <div className="center">
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                                
                    </tr>
                </tbody>
            </div>
        );
}//Fin de Render ()
}//Fin de Classs AlumnoBaja
export default AlumnoBaja;