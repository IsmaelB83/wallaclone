// NPM Modules
import React from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
// Own components
import AuthForm from '../../components/forms/AuthForm';
// Models
// Own modules
// Assets
// CSS


// Reset password section
function Reset(props) {
    
    // Translate
    const { t } = props;

    // Reset de contraseña
    const resetPassword = async (inputs) => {
        const { password, password_2 } = {...inputs};
        if ( password !== password_2 ) {
            return props.enqueueSnackbar(t("Error. Both passwords should match"), { variant: 'error', });
        } 
        props.resetAccount(props.match.params.token, password)
        .then (user => props.enqueueSnackbar(t('Password reset successfully'), { variant: 'success', }))
        .catch (error => props.enqueueSnackbar(error, { variant: 'error', }));
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

export default withNamespaces()(Reset);