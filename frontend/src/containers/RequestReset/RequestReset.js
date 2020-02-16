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


// Request reset passworf section
function RequestReset(props) {
    
    // Translate
    const { t } = props;

    // Handle onSubmit event
    const requestReset = async (inputs) => {
        const { email } = {...inputs};
        props.requestResetAccount(email)
        .then(user => props.enqueueSnackbar(t('Check your email to reset password'), { variant: 'info', }))
        .catch(error => props.enqueueSnackbar(error, { variant: 'error', }));
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

export default withNamespaces()(RequestReset);