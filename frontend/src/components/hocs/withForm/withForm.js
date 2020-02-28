// NPM Modules
import React, { Component } from 'react';
// Material UI
// Own modules
// Models
// Assets
// CSS

// Contexto generado por el HOC
export const Context = React.createContext();

// Componente formulario genérico utilizando HOC
const withForm = (WrappedComponent) => {

    /**
     * Formulario genérico
     */
    return class Form extends Component {
        
        // Constructor
        constructor(props) {
            super(props);
            this.state = {...props.initial}
        }

        // Update state
        updateState = inputs => {
            this.setState({...inputs})
        }

        // Cambio en alguno de los campos del formulario de tipo input text
        handleInputChange = event => {
            this.setState({[event.target.name]: event.target.value});
        }

        // Cambio en alguno de los campos del formulario de tipo input checkbox
        handleCheckChange = event => {
            this.setState({[event.target.name]: event.target.checked});
        }
        
        // Cambio en alguno de los campos del formulario de tipo selector de multiple option
        handleChangeMultiple = event => {
            this.setState({[event.target.name]: event.target.value});
        };

        // Cambio en un input tipo number
        handleChangeNumber = event => {
            this.setState({[event.target.name]: parseFloat(event.target.value)});
        }

        // Evento submit
        handleSubmit = event => {
            event.preventDefault();
            this.props.onSubmit(this.state);
        }

        // Reset fields
        resetInputs = initial => this.setState({...initial});
       
        // Render
        render() {
            return (
                <Context.Provider value={{
                    inputs: this.state, 
                    handleInputChange: this.handleInputChange, 
                    handleCheckChange: this.handleCheckChange,
                    handleChangeMultiple: this.handleChangeMultiple, 
                    handleChangeNumber: this.handleChangeNumber
                }}>
                    <WrappedComponent 
                        {...this.props}
                        onSubmit={this.handleSubmit}
                    />
                </Context.Provider>
            )
        }
    }
};

export default withForm;