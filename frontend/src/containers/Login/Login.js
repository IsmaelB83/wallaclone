// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
// Own components
import AuthForm from '../../components/AuthForm';
// Models
// Own modules
import LocalStorage from '../../utils/Storage';
// Assets

// Login
function Login(props) {
    
    // Translate
    const { t } = props;
    // Props destructuring
    const { login, loginWithToken, activateAccount, enqueueSnackbar } = props;
    const { token } = props.match.params;
    const { push } = props.history;
    
    // Dispatch login
    useEffect(() => {
        let session = LocalStorage.readLocalStorage();
        if (!token && session && session.jwt) {
            loginWithToken(session.jwt)
            .then(res => enqueueSnackbar(t('Login OK with token. Redirecting home...'), { variant: 'info', }))
            .catch (error => enqueueSnackbar(error, { variant: 'error', }));
        }
    }, [login, loginWithToken, push, enqueueSnackbar, token, t]);

    // Dispatch activate account
    useEffect(() => {
        if (token) {
            activateAccount(token)
            .then(result => enqueueSnackbar(result.data.description, { variant: 'success', }))
            .catch(error => enqueueSnackbar(error, { variant: 'error', }))
        }
    }, [token, activateAccount, enqueueSnackbar]);
    
    // Dispatch login action
    const submitLogin = (inputs) => {
        const { login, password } = inputs;
        props.login(login, password)
        .then(res => enqueueSnackbar(t('Login OK. Redirecting home...'), { variant: 'info', }))
        .catch(error => enqueueSnackbar(error, { variant: 'error', }));
    }
    
    // Render
    return (
        <AuthForm 
            form='login'
            isLoading={props.isAuthenticating} 
            onSubmit={submitLogin}
        />
    );
}

export default withNamespaces()(Login);