// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
// Own components
import LoadingSmall from '../LoadingSmall/LoadingSmall';
import InputForm from '../forms/InputForm';
import Form from '../forms/Form';
// Models
// Own modules
// Assets
import imageLogo from '../../assets/images/logo2.png';
// CSS
import './styles.css';

// Dinamic render
const FORM_TYPES = {
    requestReset: withNamespaces()(RequestResetForm),
    register: withNamespaces()(RegisterForm),
    reset: withNamespaces()(ResetForm),
    login: withNamespaces()(LoginForm)
};

// Componente para renderizar cualquiera de los formularios de la sección de autenticación:
function AuthForm(props) {
   
    const { t } = props;
    const submit = (inputs) => props.onSubmit(inputs);

    // Render
    const Content = FORM_TYPES[props.form];
    return (
        <div className='Login'>
            <div className='Login__Wrapper'>
                <Form className='Login__Form' onSubmit={submit}>
                    <Link to='/'>
                        <div className='Login__ImageWrapper'>
                            <img src={imageLogo} className='Login__Logo' alt='wallaclone-logo' />
                        </div>
                    </Link>
                    <Content/>
                    { props.isLoading && <LoadingSmall text={t('authenticating...')}/> }
                </Form>
            </div>
        </div>
    );
}

// Login form
function LoginForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='login' type='login' placeholder={t('type your login')} required icon={<PermIdentityIcon/>}/>
            <InputForm name='password' type='password' placeholder={t('type your password')} autocomplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>{t('enter your credentials to login')}</p>
            <div className='Login__Buttons'>
                <Button className='Button' type='submit' variant='contained' color='primary'> {t('Login')} </Button>
                <Button className='Button' variant='contained' color='secondary' component={Link} to='/reset'> {t('Reset password')} </Button>
                <Link className='Login__Link' to='/register'>{t('Create an account')}</Link>
            </div>
        </React.Fragment>
    );
}

// Create new user form
function RegisterForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='login' type='text' placeholder={t('type your login')} required icon={<PermIdentityIcon/>}/>
            <InputForm name='name' type='text' placeholder={t('type your name')} required icon={<FaceIcon/>}/>
            <InputForm name='email' type='email' placeholder={t('type your email')} required icon={<MailOutlineIcon/>} />
            <InputForm name='password' type='password' placeholder={t('type your password')} autoComplete='on' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder={t('repeat your password')} autoComplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>{t('better use a gmail account to receive our emails')}</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'>{t('Create user')}</Button>
                <Link className='Login__Link' to='/login'>{t('Go to login')}</Link>
            </div>
        </React.Fragment>
    );
}

// Request reset password form
function RequestResetForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='email' type='email' placeholder={t('type your email')} required icon={<PermIdentityIcon/>}/>
            <p className='Login__Help'>{t('enter your email to restart your password')}</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'>{t('Send me an email')}</Button>
                <Link className='Login__Link' to='/login'>{t('Go to login')}</Link>
            </div>
        </React.Fragment>
    );
}

// Reset password form
function ResetForm(props) {
    const { t } = props;
    return (
        <React.Fragment>
            <InputForm name='password' type='password' placeholder={t('type your password')} autocomplete='on' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder={t('repeat your password')} autocomplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>{t('enter your new password')}</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'>{t('Reset password')}</Button>
                <Link className='Login__Link' to='/login'>{t('Go to login')}</Link>
            </div>
        </React.Fragment>
    );
}

export default withNamespaces()(AuthForm);