import React from 'react';
import logo from '../assets/images/esimelogo.png';
import logo2 from '../assets/images/ipnLogo.png'

class HeaderDEyAE extends React.Component{
//{/*<div><img src={logo} id="logo" alt="esime" /><img src={logo2} id="logo2" alt="politecnico" /></div>*/}
    render(){
        return(
            <div className="jumbotron text-center">
            <h2>Departamento de Extensión y Apoyos Educativos</h2>
			<h3>ESIME Zacatenco</h3>
            </div>	
        );//Fin de Return
    }//Fin de Render
}//Fin de Class ErickComponente

export default HeaderDEyAE;