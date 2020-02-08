// NPM Modules
import React, { Component } from 'react';
// Material UI
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Contexto generado por el HOC
export const Context = React.createContext();

/**
* Componente formulario utilizando HOC
*/
const withForm = (WrappedComponent) => {

    /**
     * Formulario genérico
     */
    return class Form extends Component {
        
        // Constructor
        constructor(props) {
            super(props);
            this.state = {}
        }

        // Cambio en alguno de los campos del formulario de tipo input text
        handleInputChange = event => {
            this.setState({ [event.target.name]: event.target.value });
        }

        // Cambio en alguno de los campos del formulario de tipo input checkbox
        handleCheckChange = event => {
            this.setState({ [event.target.name]: event.target.checked });
        }
        
        // Evento submit
        handleSubmit = event => {
            event.preventDefault();
            this.props.onSubmit(this.state);
        }
        
        // Render
        render() {
            return (
                <Context.Provider value={{
                    inputs: this.state, 
                    handleInputChange: this.handleInputChange, 
                    handleCheckChange: this.handleCheckChange 
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