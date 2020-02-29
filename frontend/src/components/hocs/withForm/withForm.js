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

        // Cambio en alguno de los campos del formulario de tipo input text
        handleInputChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            }, () => this.handleNotifyChanges());
        }

        // Cambio en alguno de los campos del formulario de tipo input checkbox
        handleCheckChange = event => {
            this.setState({
                [event.target.name]: event.target.checked
            }, () => this.handleNotifyChanges());
        }
        
        // Cambio en alguno de los campos del formulario de tipo selector de multiple option
        handleChangeMultiple = event => {
            this.setState({
                [event.target.name]: event.target.value
            }, () => this.handleNotifyChanges());
        };

        // Cambio en un input tipo number
        handleChangeNumber = event => {
            this.setState({
                [event.target.name]: parseFloat(event.target.value)
            }, () => this.handleNotifyChanges());
        }

        // Evento submit
        handleSubmit = event => {
            event.preventDefault();
            this.props.onSubmit(this.state);
        }

        handleNotifyChanges = () => {
            if (this.props.extra && this.props.extra.notifyChanges) {
                this.props.extra.notifyChanges(this.state);
            }
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