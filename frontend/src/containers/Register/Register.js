// NPM Modules
import React from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
// Own components
import AuthForm from '../../components/AuthForm';
// Models
// Own modules
// Assets
// CSS

// Register form
function Register(props) {
    
    // Translate
    const { t } = props;

    // Handle onSubmit event
    const createUser = async (inputs) => {
        // Campos relevantes para generar el objeto sesión
        const { login, name, email, password, password_2 } = {...inputs};
        // Ambos passwords iguales
        if ( password !== password_2 ) {
            return props.enqueueSnackbar(t('Error. Both passwords should match'), { variant: 'error', });
        }
        // Dispatch del create
        props.createAccount(login, name, email, password)
        .then(user => props.enqueueSnackbar(t('Account created. Check your email to activate it'), { variant: 'info', }))
        .catch(error => props.enqueueSnackbar(error, { variant: 'error', }));
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

export default withNamespaces()(Register);