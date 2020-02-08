// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../../components/InputForm';
import Form from '../../components/Form';
import LoadingSmall from '../../components/LoadingSmall';
// Models
// Own modules
// Assets
import imageLogo from '../../assets/images/logo2.png';
// CSS
import './styles.css';

/**
* Request reset Form
*/
export default function RequestReset(props) {
    
    // Handle onSubmit event
    const requestReset = async (inputs) => {
        const { email } = {...inputs};
        props.requestResetAccount(email)
        .then(user => {
            props.enqueueSnackbar('Revise su email para resetear la contraseña.', { variant: 'success', });
            props.history.push('/login');
        })
        .catch(error => {
            props.enqueueSnackbar(error, { variant: 'error', })
        })
    }
    
    // Render
    return (
        <div className='Login'>
            <div className='Login__Wrapper'>
                <Form className='Login__Form' onSubmit={requestReset}>
                    <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
                    <InputForm name='email' type='email' placeholder='type your email' required icon={<PermIdentityIcon/>}/>
                    <p className='Login__Help'>enter your email to restart your password</p>
                    <div className='Login__Buttons'>
                        <Button className='button' type='submit' variant='contained' color='primary'> Restart password </Button>
                        <Link className='Login__Link' to='/login'>Go to login</Link>
                    </div>
                </Form>
                { props.isAuthenticating && <LoadingSmall text={'solicitando reseteo...'}/> }
            </div>
        </div>
    );
}