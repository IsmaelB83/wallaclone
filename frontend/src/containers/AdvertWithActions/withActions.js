// NPM Modules
import React, { Component } from 'react';
// Material UI
// Own modules
// Models
// Assets
// CSS

// Contexto generado por el HOC
export const Context = React.createContext();

/**
 * HOC para retornar un anuncio con las acciones asociadas
 * @param {Component} WrappedComponent Componente de tipo card de anuncio
 */
const withActions = (WrappedComponent) => {

    /**
     * Advert con acciones
     */
    return function Advert(props) {
        
        return (
                <Context.Provider value={{
                    inputs: this.state, 
                    handleInputChange: this.handleInputChange, 
                    handleCheckChange: this.handleCheckChange 
                }}>
                    <WrappedComponent {...this.props}/>
                </Context.Provider>
        );
    }
};

export default withActions;
