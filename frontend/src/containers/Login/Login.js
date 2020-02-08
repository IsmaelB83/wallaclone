// NPM Modules
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../../components/InputForm';
import Form from '../../components/Form';
import LoadingSmall from '../../components/LoadingSmall';
// Models
// Own modules
import LocalStorage from '../../utils/Storage';
// Assets
import imageLogo from '../../assets/images/logo2.png';
// CSS
import './styles.css';

/**
* Login Form
*/
export default function Login(props) {
    
    // Props destructuring
    const { login, loginWithToken, activateAccount, enqueueSnackbar } = props;
    const { token } = props.match.params;
    const { push } = props.history;
    
    // Dispatch login
    useEffect(() => {
        let session = LocalStorage.readLocalStorage();
        if (!token && session && session.jwt) {
            //login('ismaelbernal83@gmail.com', '12345678')
            loginWithToken(session.jwt)
            .then(response => {
                enqueueSnackbar('Login automático desde local storage', { variant: 'success', })
                push('/')
            })
            .catch (error => {
                enqueueSnackbar(error, { variant: 'error', })
            });
        }
    }, [login, loginWithToken, push, enqueueSnackbar, token]);

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
        .then(response => props.history.push('/'))
        .catch(error => enqueueSnackbar(error, { variant: 'error', }));
    }
    
    // Render
    return (
        <div className='Login'>
            <div className='Login__Wrapper'>
                <Form className='Login__Form' onSubmit={submitLogin}>
                    <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
                    <InputForm name='email' type='email' placeholder='type your email' required icon={<MailOutlineIcon/>}/>
                    <InputForm name='password' type='password' placeholder='type your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
                    <p className='Login__Help'>enter your credentials to login</p>
                    <div className='Login__Buttons'>
                        <Button className='button' type='submit' variant='contained' color='primary'> Login </Button>
                        <Button className='button' variant='contained' color='secondary' onClick={() => props.history.push('/reset')}> Remember password</Button>
                        <Link className='Login__Link' to='/register'>Create an account</Link>
                    </div>
                    { props.isAuthenticating && <LoadingSmall text={'authenticating...'}/> }
                </Form>
            </div>
        </div>
    );
}