// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
// Own components
import LoadingSmall from '../../components/LoadingSmall';
import InputForm from '../../components/InputForm';
import Form from '../../components/Form';
// Models
// Own modules
// Assets
import imageLogo from '../../assets/images/logo2.png';
// CSS
import './styles.css';


/**
* Reset pasword with token
*/
export default function Reset(props) {
    
    // Reset de contraseña
    const resetPassword = async (inputs) => {
        const { password, password_2 } = {...inputs};
        if ( password !== password_2 ) {
            return props.enqueueSnackbar('Ambos passwords deben ser iguales', { variant: 'error', });
        } 
        props.resetAccount(props.match.params.token, password)
        .then (user => {
            props.enqueueSnackbar('Password reseteado con exito', { variant: 'success', });
            props.history.push('/login');
        })
        .catch (error => {
            props.enqueueSnackbar(error, { variant: 'error', });
        })
    }
    
    /**
    * Render
    */
    return (
        <div className='Login'>
            <div className='Login__Wrapper'>
                <Form className='Login__Form' onSubmit={resetPassword}>
                    <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
                    <InputForm name='password' type='password' placeholder='type your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
                    <InputForm name='password_2' type='password' placeholder='repeat your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
                    <p className='Login__Help'>enter your new password</p>
                    <div className='Login__Buttons'>
                        <Button className='button' type='submit' variant='contained' color='primary'> Reset password </Button>
                        <Link className='Login__Link' to='/login'>Go to login</Link>
                    </div>
                </Form>
                { props.isAuthenticating && <LoadingSmall text={'actualizando contraseña...'}/> }
            </div>
        </div>
    );
}