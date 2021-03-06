import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo2 from '../assets/images/ipnLogo.png'
import Slider from './Slider';
import Cookies from 'universal-cookie';
import axios from 'axios';

import md5 from 'md5';
import validator from 'validator';

const cookies = new Cookies();

class CrearAlumno extends React.Component {


    
    tipoUsuarioRef = React.createRef();
    contraseñaRef = React.createRef();
    emailRef = React.createRef();
    confirmarContraseñaRef = React.createRef();
//refs para guardar el state
    email2Ref = React.createRef();
    email2Ref = "true";
    contraseñaRef2 = React.createRef();
    contraseñaRef2 = "true"; 

    state = {
        



        confirmarContraseña: false,
        idUsuario: cookies.get('idUsuario'),
       
        statusContraseña: true,

                 
        
        usuario: {
            contraseña:"false"
        },
      
       contraseñaLength:false,
       status: null,
       
        emailExistente: false,
   
    };

    changeState =  () => {
        
        this.setState({
            confirmarContraseña: this.confirmarContraseñaRef.current.value,
            usuario:{
                contraseña:this.contraseñaRef.current.value
            },
        })
        
        if( this.state.confirmarContraseña != undefined){
            console.log(this.state.confirmarContraseña+ "confirmar contraseña state") 
            console.log(this.state.usuario.contraseña+ " contraseña state")  
        }
        if(this.state.usuario.contraseña.length <= 5 ||this.state.usuario.contraseña.length>= 10  ){
            this.setState({
                contraseñaLength: false
            })
           
          }
          else{
            this.setState({
                contraseñaLength: true
            })
          }
     
    }
    
    changeEmail = async() =>{
        await this.setState({
            usuario:{
                email:this.emailRef.current.value,
                contraseña:"false"
            },
            emailExistente:false
        })

        if(this.state.usuario.email == undefined){
            this.email2Ref =  this.email2Ref;
        }
        else{
            this.email2Ref = this.state.usuario.email;
        }
        
        if(this.email2Ref) {
           
            console.log("dentro del if del ChangeEmail")
        }
        else{
                this.email2Ref = "false";
        }
    }


    changePassword=()=>{
        this.setState({
            usuario:{
                contraseña:this.contraseñaRef.current.value
            },
           
        })
        
        if(this.state.usuario.contraseña ==undefined){
            this.contraseñaRef2 =  this.contraseñaRef2;
        }
        else{
            this.contraseñaRef2 = this.state.usuario.contraseña;
        }
    }

    saveAlumno =  () => {

        this.changePassword();
        
       if(this.email2Ref != "false" ){
          if(this.email2Ref ){

                 var validacion = validator.isEmail(this.email2Ref)
                 if(validacion == false){
                 this.email2Ref = "false";
                  }
            if(this.contraseñaRef2 ){
                if(this.state.confirmarContraseña){
                    if(this.contraseñaRef2 == this.state.confirmarContraseña && this.state.contraseñaLength ==true){
                        axios.get(this.url + "usuario/findByEmail/" + this.email2Ref)
                        .then(res =>{
                            this.setState({
                                emailExistente: true,
                               
                            }); 
                        })
                        .catch(error =>{
                            this.setState({
                                emailExistente: false
                            })
                        })
                        .then(res => {      
                                
                            if(this.state.emailExistente == false){
                                this.setState({
                                        usuario:{
                                        email: this.email2Ref,
                                        contraseña: md5(this.contraseñaRef2),
                                        tipoUsuario: "false"
                                    }
                                })
                                
                                    axios.post("usuario/save", this.state.usuario)
                                    .then(res =>{
                                        this.setState({
                                            status: "true"
                                        });
                                    });
    
                            }else{
                                this.setState({
                                    emailExistente: true,
                                   
                                });
                            }//Fin de else Email Existe 
                        })                          ////////////
                    }else{
                        this.setState({
                           
                            statusContraseña: false,
                            
                        });
                    }//Fin de else comparando contraseñas
                }else{
                    this.setState({
                        confirmarContraseña: "false",
                      
                    });
                }   //Fin de else confirmar contraseña
            }else{
               this.contraseñaRef2 = "false";
            }  
         } else{

            this.setState({
                emailExistente: true,
               
            });
            this.email2Ref = "false";
         }
         //Fin de else contraseña
        }else{
            this.email2Ref = "false";
          
        }   //Fin de else email
    
    }   //fin de saveAlumno

    render() {
        // if(this.state.status === 'true'){
        //     return <Redirect to = "/IniciarSesion"></Redirect>
        // }

        return (
            <div className = "center">
                    <Slider
                        title="Registrarse"
                        size="slider-small"
                    />
		            <Link to = {'./IniciarSesion'} className= "registrarse">Iniciar Sesión</Link>
                        <div id="sidebar" className="registroAlumno">
                        <div>     
                            <img src={logo2} id="logo2" alt="politecnico" />
                            <br/> <br/> 
                            <a className = "text-logo"><strong>Departamento de Extensión</strong></a>
                            <a className = "text-logo"><strong>y Apoyos Educativos</strong></a>
                            </div>
                            <div className = "input-border">
                            <br/> <br/> <br/>
                                <label htmlFor="email" className="text_login">Email</label>
                                <input type="email" className="input_login"  name="email" ref={this.emailRef} placeholder="Ingresa quí tu correo electrónico" onChange={this.changeEmail}/> 
                                {(() => {
                                switch(this.email2Ref){   
                                    case "false":
                                    return (
                                    <a className="warning">¡Ingresa un correo electronico valido!</a>
                                    );
                             
                                }
                            })()}
   
                            {(() => {
                                switch(this.state.emailExistente){   
                                    case true:
                                    return (
                                    <a className="warning">¡Este correo ya fue registrado!</a>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                            </div>
                            <div>
                                <label htmlFor="contraseña" className="text_login">Contraseña</label>
                                <input type="password" className="input_login" name="contarseña" ref={this.contraseñaRef} placeholder="Ingresa aquí tu contraseña" onChange={this.changeState}/>
                                {(() => {
                                switch(this.state.contraseñaLength){   
                                    case false:
                                    return (
                                    <a className="warning">¡Ingresa una contraseña entre 6 y 10 caracteres!</a>
                                    );
                                   
                                    default:
                                        break;
                                }   
                                })()}
                            </div>
                            <div>
                                <label htmlFor="contraseñaConfirm" className="text_login">Confirma Contraseña</label>
                                <input type="password" className="input_login" name="contraseñaConfirm" ref={this.confirmarContraseñaRef} placeholder="Confirma aquí tu contraseña" onChange={this.changeState}/>
                                {(() => {
                                switch(this.state.statusContraseña){   
                                    case false:
                                    return (
                                    <a className="warning">¡Verifica tu Contraseña!</a>
                                    );
                                
                                    default:
                                        break;
                                }   
                                })()}
                            </div>
                            
                            <br/>
                            
                            <button  className = "btn" onClick = {this.saveAlumno}>Aceptar</button>
                            
                        </div>
                        
                        
		    </div>
            
            
        );
    }
}
export default CrearAlumno;

