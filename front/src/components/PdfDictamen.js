import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { PDFReader  } from 'reactjs-pdf-view';


class PdfDictamen extends React.Component {

  state = {
    docDictamen: "",
    status: null
  };
    componentWillMount = () => {
        const { match: { params } } = this.props;
        var doc = params.doc;
        this.setState({
                docDictamen: doc,
                status: "true"
        })
    }
    render(){
        return(
            <div>
            <PDFReader 
               url ={"docDictamen/getDoc/" + this.state.docDictamen}
              showAllPage="true"
            >
            </PDFReader >
          
          </div>
        );
    }
}
export default PdfDictamen;