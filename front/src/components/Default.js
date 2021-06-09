import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import Cookies from 'universal-cookie';
import axios from 'axios';

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
