// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
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
 * Login Form
 */
export default function Register(props) {
 
  // Handle onSubmit event
  const createUser = async (inputs) => {
    // Campos relevantes para generar el objeto sesión
    const { name, email, password, password_2 } = {...inputs};
    // Ambos passwords iguales
    if ( password !== password_2 ) {
      return props.enqueueSnackbar('Ambos passwords deben ser iguales', { variant: 'error', });
    }
    // Dispatch del create
    props.createAccount(name, email, password)
    .then(user => {
        props.enqueueSnackbar('Usuario creado. Chequea el mail para activar la cuenta', { variant: 'success', });
        props.history.push('/login');
    })
    .catch(error => {
        props.enqueueSnackbar(error, { variant: 'error', });
    });
  }

  /**
   * Render
   */
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={createUser}>
            <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
            <InputForm name='name' type='name' placeholder='type your name' required icon={<PermIdentityIcon/>}/>
            <InputForm name='email' type='email' placeholder='type your email' required icon={<MailOutlineIcon/>} helperText="Utilice una cuenta gmail par evitar problemas de spam"/>
            <InputForm name='password' type='password' placeholder='type your password' autoComplete='on' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder='repeat your password' autoComplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>better use a gmail account to receive our emails</p>
            <div className='Login__Buttons'>
                <Button className='button' type='submit' variant='contained' color='primary'> Create user </Button>
                <Link className='Login__Link' to='/login'>Go to login</Link>
            </div>
          </Form>
          { props.isCreating && <LoadingSmall text={'creando nuevo usuario...'}/> }
        </div>
      </div>
    );
}