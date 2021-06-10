import React from 'react';
import axios from 'axios';
import { Redirect,Link } from 'react-router-dom';
import md5 from 'md5';

class RecuperacionContraseña extends React.Component{

    cambioRef = React.createRef();



    state = {
        usuario:{},
        recuperar:{},
        contraseña: null,
        statusContraseña: null,
        status: null,
        email: "",
        clase:this.props.className
    }
    /* HAY QUE ACTIVAR EL ID Y EMAIL DEL STATE*/
    changeState = () =>{
        this.setState({
            recuperar:{
                idUsuario:95,
                // idUsuario: this.props.id,
                email:"fer@gmail.com",
                //email: this.state.usuario.email,
                password: "p4SS"+this.props.id+"dEYAe",
                
            }
        });
        
    }//Fin de changeState
  componentWillMount = () =>{
    this.getUsuario();
    this.setState({
        contraseña: "true"
    });
    console.log(this.props.className)
  }
    getUsuario = () =>{
        axios.get("usuario/find/"+this.props.id)
        .then(res =>{
            this.setState({
                usuario: res.data,
            });
        });
    }//Fin de getUsuario()
    
    updateContraseña = () =>{
        this.changeState();
        console.log("update contraseña ")
        if(this.cambioRef.current.value === "SI"){
            console.log("passwoed" + this.state.recuperar.password)
            console.log("passwoed" + this.state.recuperar.idUsuario)
            try{
                axios.post("usuario/reset", this.state.recuperar)
                .then(res =>{
                    this.setState({
                        status: true,
                        statusContraseña: "true"
                    });
                });
            }
            finally{
                this.setState({
                    statusContraseña: "false"
                })
            }

           
        }else{
            this.setState({
                statusContraseña: "false"
            })
        }
    }//Fin de updateContraseña

    render() {
        const {cancel} = this.props
        if(this.state.status === true){
            return(
                <div className="center">
                <div id="sidebar" className={ this.props.className}>
                <br/><br/>
                <strong>Se restableció la contraseña con éxito</strong>
                </div>
                </div>
                
            );
        }
        else{
            return (
                
                <div className="center">
                <div id="sidebar" className={ this.props.className}>
                
                <br/>
                                                <strong>¿RESTABLECER CONTRASEÑA?</strong>
                                                <br/>  
                                                <select name="actualizar" ref={this.cambioRef} onChange={this.changeState}>
                                                    <option value="NO">NO</option>
                                                    <option value="SI">SI</option>
                                                    </select>
                                                <br/> 
                                                {(() => {
                                                switch(this.state.statusContraseña){   
                                                    case "false":
                                                    return (
                                                    <a className="warning_search">¡Seleccione "SI" para restablecer la contraseña!</a>
                                                    );
                                                    break;
                                                    default:
                                                        break;
                                                }
                                                })()}<br/>
                                                <strong>Email:</strong> {this.state.usuario.email}
                                                <br/> <br/>
                                                <strong>Nueva Contraseña:</strong> p4SS{this.props.id}dEYAe

                                                <br/><br/>
                                                
                                                <button className="btn" onClick={this.updateContraseña}>ACEPTAR</button>
                                                <button  className ="btnCancel" onClick={cancel} >Cancelar</button>
                                                
                                                
                                                
                </div>
                </div>
                
            );
                                            }
    }//Fin de Render
}//Fin de Class Recuperacion Contraseña
export default RecuperacionContraseña;