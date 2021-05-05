import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';
import BorrarDoc from './BorrarDoc';
import ActualizarComentario from './ActualizarComentario';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class AdminServicioArchivos extends React.Component {


    
    estadoRef = React.createRef();
    comentarioRef=React.createRef();

    state = {
        idAlumno: this.props.id,
        statusArchivo: null,
        file: null,
        status: null,
        lista: {},
        listar:[],
        comentar: "",
        usuario: {},
        servicio: {},
        alumno: {},
        statusServicio: null,
        cambioEstado: {},
        statusEstado: null,
    };

    changeState = () =>{
      this.setState({
            cambioEstado:{
                idAlumno:this.props.id,
                idServicio: this.state.servicio.idServicio,
                semestre: this.state.servicio.semestre,
                responsableDirecto: this.state.servicio.responsableDirecto,
                estado: this.estadoRef.current.value,
                fechaRegistro: this.state.servicio.fechaRegistro,
                revisado:this.state.servicio.revisado
            }
        })  
        console.log(this.state.cambioEstado.idServicio)
        console.log(this.state.cambioEstado.idAlumno)
      
        console.log(this.state.cambioEstado.estado)
      
    }//Fin de ChangeState

    componentWillMount=()=> {
        this.getLista();
        this.getServicio();  
    }

    getServicio = () => {
        axios.get("servicioSocial/findIdAlumno/"+ this.props.id)
        .then(response => {
        this.setState({
            servicio: response.data,
            statusServicio: 'success'
        });
        console.log(this.state.servicio.idAlumno)
        console.log(this.state.servicio.idServicio)
        console.log(this.state.servicio.responsableDirecto)
        console.log(this.state.servicio.estado)
        console.log(this.state.servicio.fechaRegistro)
        console.log(this.state.servicio.revisado) 
    });   
    }//Fin de getservicio()
    getAlumno = () => {
        axios.get("/alumno/find/" + this.state.idAlumno)
            .then(response => {
                this.setState({
                    alumno: response.data,
                });
            });
    }//Fin de getAlumno()
    
    deleteServicio = () => {
        axios.delete("servicioSocial/delete/"+this.props.id)
        .then(res => {
            window.location.href = "./" + this.props.id
        })
    }//Fin de deleteServicio
    
    cancelComentario = () => {
        this.setState({
            comentario: {
                status: "false",
                texto: ""
            },
            statusComentario: "true"
        })
    }
    cambiarEstado = () => {
       
        this.changeState();
        console.log(this.state.cambioEstado.estado)
       axios.patch("servicioSocial/update", this.state.cambioEstado)
            .then(res => {
                this.getServicio();
            }); 
           
            
    }//Fin de Cambiar Estado

    fileChange = (event) => {
        this.setState({
             file: event.target.files[0]
         });
     }

    getLista = () => {
        axios.get( "lista/findServicio/" + this.props.id)
            .then(response => {
                this.setState({
                    listar: response.data,
                });
            });
    }

    guardarLista = async (e) => {
        await axios.post("lista/save", this.state.lista)
        .then(res => {
            this.setState({
                status: "true"
            });
        });
    }
    fileChange = (event) => {
        this.setState({
             file: event.target.files[0]
         });
     }

    upLoad = () => {
        if(this.state.file && this.state.file != null && this.state.file != undefined){
            const fd = new FormData();
            console.log(this.state);
            fd.append('file', this.state.file, this.state.file.name)
            console.log(this.state.file.name)
                axios.post("docServicio/upload/" + this.state.file.name + this.props.id, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: this.props.id,
                                nombreDoc: res.data,
                                idTramite: 4,
                                idDoc: res.data + this.props.id,
                                comentario: this.state.comentar
                            },
                            statusArchivo: "true"
                        })
                        this.guardarLista();
                        window.location.reload(false);
                    });
        }else{
            this.setState({
                statusArchivo: "false"
            });
        }//Fin de else file
    }//Fin de funcion upLoad

  
    
    
    
    
    
    
    
    
    
    
    render() {
            return (
                <div className="center">
                            <div id="sidebar" className="archivosAdminCenter">
                            <br />
                            <strong>DOCUMENTACIÓN DE SERVICIO SOCIAL</strong>
                                <div>
                                <br/>
                                <input type="checkbox" id="btn-modal" />
                                <label htmlFor="btn-modal" className="btn" onClick={this.getEmail}>INFORMACIÓN DE LA SOLICITUD</label>
                                 <div className="modal">
                                <div className="contenedor">
                                    <h1>Baja de Servicio Social</h1>
                                    <label htmlFor="btn-modal">X</label>
                                    <div className="contenido">
                                <div>
                                <strong>Fecha de Registro:</strong> {this.state.servicio.fechaRegistro}
                                </div>
                                <div>
                                <strong>Semestre:</strong> {this.state.servicio.semestre}
                                </div>
                                <div>
                                <strong>Correo electónico:</strong> {this.state.usuario.email}
                                </div>        
                                <div>
                                    <strong>Revisado por: </strong> {this.state.servicio.revisado}
                                </div>
                                <div>
                                    <strong>Estado:</strong>{this.state.servicio.estado}
                                </div>
                             
                                <strong>cambiar estado de la revision</strong>
                                <div className="center">
                                    <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                                        <option value="NUEVO">NO REVISADO</option>
                                        <option value="PROCESANDO">EN PROCESO</option>
                                        <option value="FINALIZADO">FINALIZADO</option>
                                        <option value="RECHAZADO">RECHAZADO</option>
                                    </select>
                                    <button className="btn_join" onClick={this.cambiarEstado}>Actualizar</button>
                                    <br />
                                </div>
                                <br />
                                <button id="btn_deleteRegistro" onClick={this.deleteDictamen}>Borrar Registro</button>
                            </div>
                            </div>
                        </div>{/**fincontenedor */}
                        <br />
                        <br />
                               <tbody>
                                        <tr>
                                            <td className="table_lista"><strong>Documentos</strong></td>
                                            <td className="table_lista"><strong>Comentario</strong></td>
                                        </tr>
                                    </tbody>
                                    {this.state.listar.map((lista1, i) =>
                                        <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{lista1.nombreDoc}</td>
                                                <td className="table_lista">{lista1.comentario}</td>
                                                <td><Link to={'/PdfServicio/' + lista1.idDoc}target="_blank" id="btn_watch">Ver Archivo</Link></td>
                                                <td><Link to={'/DocServicio/' + lista1.idDoc}target="_blank" id="btn_downLoad">Descargar</Link></td>
                                                <td><BorrarDoc
                                                idLista={lista1.idLista}
                                                idDoc={lista1.idDoc}
                                                url= "docServicio/deleteDoc/"
                                                redirect={lista1.idAlumno}
                                                /></td>
                                                <td><ActualizarComentario
                                                idLista={lista1.idLista}
                                                idAlumno= {lista1.idAlumno}
                                                idDoc={lista1.idDoc}
                                                idTramite={lista1.idTramite}
                                                nombreDoc={lista1.nombreDoc}
                                                comentario={lista1.comentario}
                                                /></td>
                                            </tr>
                                    </tbody>
                                    )}
                                    <br />
                                    <div  className="archivosAdminCenter" ><strong>Enviar archivo PDF</strong></div> <br /> 
                                    <input type="file" name = "file" onChange={this.fileChange} />
                                    {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning_search">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                    })()} 
                                </div>

                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>ENVIAR</button> 
                            </div>
                </div>
            );
        
    }//Fin de Render
}//Fin de Class AdminServicioArchivos
export default AdminServicioArchivos;
