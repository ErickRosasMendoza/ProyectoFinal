import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DirectorioAdmin from './DirectorioAdmin';
import Slider from './Slider';
import Cookies from 'universal-cookie';
import DatosActualizadosAdmin from './DatosActualizadosAdmin';
import DatosActualizadosEmail from './DatosActualizadosEmail';
import RecuperacionContraseña from './RecuperacionContraseña';

const cookies = new Cookies();

class MisDatosAdmin extends React.Component{



    state = {
        admin: {
            nombre:"null"
        },
        usuario: {},
        idUsuario: cookies.get('idUsuario'),
        idAdmin: cookies.get('idAdmin'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getAdmin();
           
        }

        getAdmin = () => {
            axios.get("admin/findIdUsuario/"+ this.state.idUsuario)
       
            .then(res => {
                    this.setState({
                        admin: res.data,
                        status: 'success'
                       });
                       cookies.set('idAdmin', this.state.admin.idAdmin, {path:"/"})
                       cookies.set('nombre', this.state.admin.nombre, {path:"/"})
            })
        }//Fin de funcion getAdmin()
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
        recuperarContraseña=()=>{
            this.setState({
                actualizar: "contraseña"
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
  
                <DirectorioAdmin/>
               
                    <tbody >
                        <tr >
                            <th className="table_lista">Nombre</th>
                            <th className="table_lista">Telefono</th>
                            <th className="table_lista">Correo</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table_lista"> {this.state.admin.nombre} {this.state.admin.apellidos}</td>
                            <td className="table_lista"> {this.state.admin.telefono}</td>
                            <td className="table_lista"> {this.state.email}</td>
                        </tr>
                        </tbody>

                    <tbody>
                        <tr>
                            <tr>
                            <td className="table_lista"><button  className="btn" id= "btn-table" onClick={this.updateDatos} >Actualizar Información Personal</button></td>
                            </tr>
                            <tr>
                            <td className="table_lista"><button  className="btn" id= "btn-table"onClick={this.updateEmail} >Cambiar Contraseña</button></td>
                            </tr>
                            <tr>
                            <td className="table_lista"><button   className="btn" id= "btn-table"onClick={this.recuperarContraseña} >Restablecer contraseña de Administrador</button></td>
                            </tr>
                            <tr>
                            <td className="table_lista"><button   className="btn" id= "btn-table"onClick={this.recuperarContraseña} >Eliminar cuenta</button></td>
                            </tr>
                        </tr>
                    </tbody>
                        {(() => {  
                            switch (this.state.actualizar){
                            case "DATOS":
                                return (
                                    <div>
                                    <DatosActualizadosAdmin
                                    cancel = {this.cancel}
                                    clase = "archivosAdminCenter3"/>
                                   
                                    </div>
                                  );
                            break;
                            case "EMAIL":
                                return (
                                    <div>
                                    <DatosActualizadosEmail
                                    cancel = {this.cancel}
                                    redirect="MisDatosAdmin"
                                    tipoUsuario="true"
                                    clase="archivosAdminCenter3"
                                    />
                                   
                                    </div>
                                  );
                              
                                    case "contraseña":
                                        return(
                                            <div>
                                               
                                            <RecuperacionContraseña
                                            cancel = {this.cancel}
                                            redirect="MisDatosAdmin"
                                            tipoUsuario="true"
                                            id= {this.state.idUsuario}
                                            className="archivosAdminCenter3"
                                            />
                                           
                                            </div>
                                        );
                                       
                             default: 
                             break;
                            }
                            })()}
                </div>
            );
  
}//Fin de Render ()
}//Fin de Classs MisDatosAdmin

export default MisDatosAdmin;