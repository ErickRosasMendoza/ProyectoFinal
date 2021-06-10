import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();



class AlumnoDictamen extends React.Component{

    estadoRef = React.createRef();




    state = {
        idAlumno: this.props.id,
        dictamen: {},
        alumno: {},
        usuario:{},
        statusDictamen: 'success',
        cambioEstado: {},
        statusEstado: null,
    };

    changeState = () =>{
        this.setState({
            cambioEstado:{
                idAlumno:this.props.id,
                idDictamen: this.state.dictamen.idDictamen,
                semestre: "SEPTIMO",
                porcentajeCreditos: this.state.dictamen.porcentajeCreditos,
                estado: this.estadoRef.current.value,
                fechaRegistro: this.state.dictamen.fechaRegistro,
                revisado: cookies.get('nombre'),
            }
        })
    }//Fin de ChangeState

        componentWillMount() {
            this.getDictamen();
            this.getAlumno();
        }
       
      
        getAlumno = () => {
           /*   axios.get("/alumno/find/"+ this.props.id)
            .then(response => {
            this.setState({
                alumno: response.data,
            });
            } ); */  
        }//Fin de getAlumno()   
    
    getDictamen = () => {
        axios.get("user/dictamen/findIdAlumno/"+ this.props.id)
        .then(response => {
        this.setState({
            dictamen: response.data,
            
        });
        } );   
    }//Fin de getDictamen()

    getEmail = () => {
        axios.get("alumno/find/"+ this.state.alumno.idUsuario)
        .then(response => {
        this.setState({
            usuario: response.data,
            });
        }); 
        alert(this.state.dictamen.revisado)  
    }//Fin de getEmail()

    deleteDictamen = () => {
        axios.delete("user/dictamen/delete/"+this.props.id)
        .then(res => {
            window.location.reload()
        })
    }//Fin de deleteDictamen

    estado = () => {
        this.setState({
            statusEstado: "true"
        });
    }//Fin de estado

    cancelEstado = () => {
        this.setState({
            statusEstado: "false"
        });
    }//Fin de estado

    cambiarEstado = () => {
        this.changeState();
        axios.post("user/dictamen/update", this.state.cambioEstado)
        .then(res =>{
            this.getDictamen();
        });
    }//Fin de Cambiar Estado

    render(){
       
       
                           {/* <td className="table_lista">
                                
                                
                             
                                <input type="checkbox" id="btn-modal"/>
                                <label htmlFor="btn-modal" className="btn" onClick={this.getEmail}>INFORMACIÓN</label>
                                <div className="modal">
                                  <div className="contenedor">
                                    <h1>Dictamen de 70%</h1>
                                    <label htmlFor="btn-modal">X</label>
                                        <div className="contenido">
                                    <div>
                                        <strong>Fecha de Registro:</strong> {this.state.dictamen.fechaRegistro}
                                    </div>
                                    <div>
                                        <strong>Semestre:</strong> {this.state.dictamen.semestre}
                                    </div>
                                    <div>
                                        <strong>Porcentaje de Creditos:</strong> {this.state.dictamen.porcentajeCreditos}%
                                    </div>
                    <div>
                            <strong>Estado:</strong>         {this.state.dictamen.estado}
                                
                    </div>
                    <div>
                            <strong>Revisado por: </strong>         {this.state.dictamen.revisado}
                                
                    </div>
                                   
                                    <button className="btn_join" onClick={this.estado}>Cambiar Estado</button>
                                   
                                {(() => {  
                                    switch (this.state.statusEstado){
                                    case "true":
                                    return (
                                        <div className="center">
                                                <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                                                    <option value="NUEVO">NO REVISADO</option>
                                                    <option value="PROCESANDO">EN PROCESO</option>
                                                    <option value="FINALIZADO">FINALIZADO</option>
                                                    <option value="RECHAZADO">RECHAZADO</option>
                                                    </select>
                                                <br/><br/>
                                                <button className="btn_join" onClick={this.cambiarEstado}>Actualizar</button>
                                                <button id="btn_delete" onClick={this.cancelEstado}>Cancelar</button>
                                                <br/>
                                                </div>
                                                    );
                                                
                                                default: break;
                                                }
                                            })()}
                                        <br/>
                                        <button id="btn_deleteRegistro" onClick={this.deleteDictamen}>Borrar Registro</button>
                                        </div>
                                    </div>
                                </div>{/**fin del contenedor 
                            </td>*/}
        
       
            return(
                <div className="center">
                    <tbody>
                        <tr >
                        <th className="table_lista"> </th>
                            <th className="table_lista">Alumno</th>
                            <th className="table_lista">Boleta</th>
                            <th className="table_lista">Programa Academico</th>
                            
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>        
                            <td className="table_lista">Trámite</td>
                            <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                            <td className="table_lista">{this.state.alumno.boleta}</td> 
                            <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                            
                        </tr>
                    </tbody>
                </div>
            );
        }
//Fin de Render ()
}//Fin de Classs AlumnoDictamen
export default AlumnoDictamen;