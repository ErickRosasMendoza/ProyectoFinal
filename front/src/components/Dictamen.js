import React from 'react';
import { Redirect, HashRouter } from 'react-router-dom';
import axios from 'axios';
import HeaderDEyAE from './HeaderDEyAE';
import { Link } from 'react-router-dom';
import DirectorioAlumno from './DirectorioAlumno';

import SubirDictamen from './SubirDictamen';
import VerDatosDictamen from './VerDatosDictamen';
import Cookies from 'universal-cookie';
import Footer from './Footer';

const cookies = new Cookies();

class Dictamen extends React.Component {



    creditosRef = React.createRef();
    dictamenRef = React.createRef();
    dictamenRef = cookies.get('idAlumno');
    fechaRegistroRef = React.createRef();
    fechaRegistroRef = new Date().toLocaleDateString();

    state = {
        idAlumno: cookies.get('idAlumno'),
        statusCreditos: "false",
        dictamen: {},
        status: "null",
        estado: null
    };

    componentWillMount = () =>{
        this.searchDictamen();
    }

    changeState = () => {
        this.setState({
            dictamen: {
                porcentajeCreditos: this.creditosRef.current.value,
                semestre: "SEPTIMO",
                estado: "NUEVO",
                fechaRegistro: this.fechaRegistroRef,
                revisado: null,
                idAlumno: this.state.idAlumno,
                idDictamen: this.state.idAlumno
            }
        });
    }

    searchDictamen = () => {
        axios.get("dictamen/findIdAlumno/" + this.dictamenRef)
        .then(res =>{
            this.setState({
                dictamen: res.data
            });
        })
        .then(res => {
            this.setState({
                estado: this.state.dictamen.estado,
                dictamen:{
                    porcentajeCreditos: null,
                    semestre: "SEPTIMO",
                    estado: "NUEVO",
                    fechaRegistro: null,
                    revisado: null,
                    idAlumno: null,
                    idDictamen: null
                }
            });
        });
    }//Fin de search Dictamen

    saveDictamen = async (e) => {
        this.changeState();
        alert(this.state.idAlumno)
        if(this.state.dictamen.porcentajeCreditos && this.state.dictamen.porcentajeCreditos != null && this.state.dictamen.porcentajeCreditos != undefined){
         await axios.post("dictamen/save", this.state.dictamen)
            .then(res => {
                this.setState(
                    {
                        statusCreditos: "true"
                    }
                );
               
            })
        }else{
            this.setState(
                {
                    statusCreditos: "false"
                }
            );
        }//Fin de else % de Creditos
    }//Fin de funcion saveDictamen()
    render() {
       
            
        if (this.state.statusCreditos === "true") {
            window.location.reload();
       
        }
         
        
     
        return (
            <div className="center">
            <HeaderDEyAE />
                <DirectorioAlumno />
                        <div id="sidebar" className="dictamenLeft">
                            <div>
                                <label htmlFor="creditos" className="text_login">Porcentaje de Creditos</label>
                                <input type="text" className="input_login" name="creditos" placeholder="Ingresa el % de creditos sin decimales" ref={this.creditosRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusCreditos){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa tu porcentaje de creditos sin decimales!</a>
                                        );
                                     
                                        default:
                                            break;
                                    }
                                })()}       
                            </div>
                            <br/>
                            
         
                                        <button className="btn" onClick = {this.saveDictamen}>Aceptar</button>
     
                          </div>
                   {/**     <SubirDictamen/>
                       <VerDatosDictamen/>
                       */}
            </div>
        );
                        
    }
}
export default Dictamen;
