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
* Login Form
* @param {Object} props Component properties
*/
export default function Register(props) {
    
    // Handle onSubmit event
    const createUser = async (inputs) => {
        // Campos relevantes para generar el objeto sesión
        const { name, email, password, password_2 } = {...inputs};
        // Ambos passwords iguales
        if ( password !== password_2 ) {
            return props.enqueueSnackbar('Ambos passwords deben ser iguales', { variant: 'error', });
        }
        // Dispatch del create
        props.createAccount(name, email, password)
        .then(user => {
            props.enqueueSnackbar('Usuario creado. Chequea el mail para activar la cuenta', { variant: 'info', });
            props.history.push('/login');
        })
        .catch(error => {
            props.enqueueSnackbar(error, { variant: 'error', });
        });
    }
    
    // Render
    return (
        <AuthForm 
            form='register'
            isLoading={props.isCreating} 
            onSubmit={createUser} 
        />
    );
}