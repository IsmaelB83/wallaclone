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
* Request reset Form
* @param {Object} props Component properties
*/
export default function RequestReset(props) {
    
    // Handle onSubmit event
    const requestReset = async (inputs) => {
        const { email } = {...inputs};
        props.requestResetAccount(email)
        .then(user => {
            props.enqueueSnackbar('Revise su email para resetear la contraseña.', { variant: 'info', });
            props.history.push('/login');
        })
        .catch(error => {
            props.enqueueSnackbar(error, { variant: 'error', })
        })
    }
    
    // Render
    return (
        <AuthForm 
            form='requestReset'
            isLoading={props.isAuthenticating} 
            onSubmit={requestReset} 
        />
    );
}