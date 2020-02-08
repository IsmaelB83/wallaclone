// NPM Modules
import React, { useEffect } from 'react';
// Material UI
// Own components
import AuthForm from '../../components/forms/AuthForm';
// Models
// Own modules
import LocalStorage from '../../utils/Storage';
// Assets

/**
 * Login Section
 * @param {Object} props Component properties
 */
export default function Login(props) {
    
    // Props destructuring
    const { login, loginWithToken, activateAccount, enqueueSnackbar, fetchAdverts } = props;
    const { token } = props.match.params;
    const { push } = props.history;
    
    // Dispatch login
    useEffect(() => {
        let session = LocalStorage.readLocalStorage();
        if (!token && session && session.jwt) {
            login('ismaelbernal83@gmail.com', '12345678')
            //loginWithToken(session.jwt)
            .then(response => {
                enqueueSnackbar('Login automático con token. Redirigiendo al home', { variant: 'success', })
                push('/')
            })
            .catch (error => {
                enqueueSnackbar(error, { variant: 'error', })
            });
        }
    }, [login, loginWithToken, push, enqueueSnackbar, token, fetchAdverts]);

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
        const { email, password } = inputs;
        props.login(email, password)
        .then(response => {
            enqueueSnackbar('Login correcto. Redirigiendo al home.', { variant: 'success', })
            props.history.push('/')
        })
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