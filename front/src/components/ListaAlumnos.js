import React, {Component} from 'react';
import axios from 'axios';
import BorrarAlumno from './BorrarAlumno';
import { Link } from 'react-router-dom';

import DirectorioAdmin from './DirectorioAdmin';
class ListaAlumnos extends Component{


    state = {
        alumnos: [],
        status: null
    };

    componentWillMount() {
        this.getAlumnos();
    
    }

    getAlumnos = () => {
        axios.get("alumno/findAll")
            .then(response => {
                this.setState({
                    alumnos: response.data,
                    status: 'success'
                });
                console.log(this.state.alumnos);
            });
    }
    eliminarAlumno = () =>{
        alert("hola")
        axios.delete("usuario/delete" + this.alumno.idAlumno )
    }
    
render() {
    if(this.state.alumnos.length >=1){
        
   
       return (
        <React.Fragment>
            <DirectorioAdmin />
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                    </tr>
                </tbody>
                {this.state.alumnos.map((alumno, i) =>
                    <tbody key={i}>
                    <tr>
                        <td className="table_lista">{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombre}</td>
                        <td className="table_lista">{alumno.boleta}</td> 
                        <td className="table_lista">{alumno.programaAcademico}</td>
                        <td><Link to={'/admin/DirectorioArchivosAlumno/' + alumno.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                        <td><BorrarAlumno
                        id = {alumno.idAlumno}/></td>
                    </tr>
                </tbody>
                )
                }
        </React.Fragment>
    );
    }else if(this.state.alumnos.length == 0 && this.state.status == 'success'){
        return(
            <div className="center">
            <DirectorioAdmin />
                <h1>No hay alumnos registrados para esta solicitud</h1>
            </div>
        );
    }else{
        return(
            <div className="center">
            <DirectorioAdmin />
                <h1>Cargando... Espere un momento...</h1>
            </div>
        );
    }
 
    }//Fin de Render
}//Fin de Class ListaAlumnos
export default ListaAlumnos;