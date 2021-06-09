import React, { Component } from 'react';
import axios from 'axios';


class BorrarAlumno extends React.Component {


    state = {
        statusDoc: null,
        statusLista: null,
        idAlumno: this.props.id
      };


    


        delete = () => {
            axios.delete("alumno/delete/" + this.state.idAlumno)
            .then(res => {
                this.setState({
                    statusLista: "true"
                });
            });
        }

    render(){

        if(this.state.statusDoc === "true" && this.state.statusLista === "true"){
            window.location.reload();
        }

        return(
            <button  id="btn_delete" onClick={this.delete}>Eliminar</button>
        )
    
    }
}
export default BorrarAlumno;