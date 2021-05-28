import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


class Default extends React.Component {



  componentDidMount= () =>{

    }

    componentWillMount=()=>{

    }
    render() {
      if (cookies.get('tipoUsuario') === 'true') {
        return <Redirect to="/admin/MisDatosAdmin"></Redirect>
      }else{
        return <Redirect to="/user/MisDatosAlumno"></Redirect>
      }
    }
}
export default Default;
