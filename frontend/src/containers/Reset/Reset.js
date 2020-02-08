// NPM Modules
import React from 'react';
// Material UI
// Own components
import AuthForm from '../../components/forms/AuthForm';
// Models
// Own modules
// Assets
// CSS


/**
* Reset pasword with token
* @param {Object} props Component properties
*/
export default function Reset(props) {
    
    // Reset de contraseña
    const resetPassword = async (inputs) => {
        const { password, password_2 } = {...inputs};
        if ( password !== password_2 ) {
            return props.enqueueSnackbar('Ambos passwords deben ser iguales', { variant: 'error', });
        } 
        props.resetAccount(props.match.params.token, password)
        .then (user => {
            props.enqueueSnackbar('Password reseteado con exito', { variant: 'success', });
            props.history.push('/login');
        })
        .catch (error => {
            props.enqueueSnackbar(error, { variant: 'error', });
        })
    }
    
    /**
    * Render
    */
    return (
        <AuthForm 
            form='reset'
            isLoading={props.isAuthenticating} 
            onSubmit={resetPassword} 
        />
    );
}