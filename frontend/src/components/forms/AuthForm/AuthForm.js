// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
// Own components
import LoadingSmall from '../../LoadingSmall/LoadingSmall';
import InputForm from '../components/InputForm';
import Form from '../components/Form';
// Models
// Own modules
// Assets
import imageLogo from '../../../assets/images/logo2.png';
// CSS
import './styles.css';

// Dinamic render
const FORM_TYPES = {
    requestReset: RequestResetForm,
    register: RegisterForm,
    reset: ResetForm,
    login: LoginForm
};

/**
* Componente para renderizar cualquiera de los formularios de la sección de autenticación:
*/
export default function AuthForm(props) {
   
    // Call container handler
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
                    { props.isLoading && <LoadingSmall text={'authenticating...'}/> }
                </Form>
            </div>
        </div>
    );
}

/**
 * Login form
 */
function LoginForm() {
    return (
        <React.Fragment>
            <InputForm name='login' type='login' placeholder='type your login' required icon={<PermIdentityIcon/>}/>
            <InputForm name='password' type='password' placeholder='type your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>enter your credentials to login</p>
            <div className='Login__Buttons'>
                <Button className='Button' type='submit' variant='contained' color='primary'> Login </Button>
                <Button className='Button' variant='contained' color='secondary' href='/reset'> Reset password </Button>
                <Link className='Login__Link' to='/register'>Create an account</Link>
            </div>
        </React.Fragment>
    );
}

/**
 * Create new user form
 */
function RegisterForm() {
    return (
        <React.Fragment>
            <InputForm name='login' type='login' placeholder='type your login' required icon={<PermIdentityIcon/>}/>
            <InputForm name='name' type='name' placeholder='type your name' required icon={<FaceIcon/>}/>
            <InputForm name='email' type='email' placeholder='type your email' required icon={<MailOutlineIcon/>} helperText="Utilice una cuenta gmail par evitar problemas de spam"/>
            <InputForm name='password' type='password' placeholder='type your password' autoComplete='on' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder='repeat your password' autoComplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>better use a gmail account to receive our emails</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'> Create user </Button>
                <Link className='Login__Link' to='/login'>Go to login</Link>
            </div>
        </React.Fragment>
    );
}

/**
 * Request reset password form
 */
function RequestResetForm() {
    return (
        <React.Fragment>
            <InputForm name='email' type='email' placeholder='type your email' required icon={<PermIdentityIcon/>}/>
            <p className='Login__Help'>enter your email to restart your password</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'> Send me an email </Button>
                <Link className='Login__Link' to='/login'>Go to login</Link>
            </div>
        </React.Fragment>
    );
}

/**
 * Reset password form
 */
function ResetForm() {
    return (
        <React.Fragment>
            <InputForm name='password' type='password' placeholder='type your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder='repeat your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>enter your new password</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'> Reset password </Button>
                <Link className='Login__Link' to='/login'>Go to login</Link>
            </div>
        </React.Fragment>
    );
}