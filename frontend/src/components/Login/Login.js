// NPM Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../Forms/InputForm';
import Form from '../Forms/Form';
import withForm from '../Forms/Form/withForm';
import LoadingSmall from '../LoadingSmall';
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
class Login extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.login}>
            <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
            <InputForm name='email' type='email' placeholder='type your email' required icon={<MailOutlineIcon/>}/>
            <InputForm name='password' type='password' placeholder='type your password' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>enter your credentials to login</p>
            <div className='Login__Buttons'>
              <Button className='button' type='submit' variant='contained' color='primary'> Login </Button>
              <Button className='button' variant='contained' color='secondary' onClick={() => this.props.history.push('/remember')}> Remember password</Button>
              <Link className='Login__Link' to='/register'>Create an account</Link>
            </div>
            { this.props.isFetching && <LoadingSmall text={'authenticating...'}/> }
          </Form>
        </div>
      </div>
    );
  }

  /**
   * Did mount
   */
  componentDidUpdate() {
    // Notificaciones
    if (this.props.error) {
      this.props.enqueueSnackbar(this.props.error, { variant: 'error', });
    } else if (this.props.session) {
      // Si el login ha sido exitoso
      LocalStorage.saveLocalStorage(this.props.session);
      this.props.history.push('/');
    }
  }

  /**
   * Handle onSubmit event
   */
  login = (inputs) => {
    // Campos relevantes para generar el objeto sesión
    const { email, password } = {...inputs};
    // Son todos obligatorios, en caso de no estar no permito continuar
    if (!email || !password) {
      this.props.enqueueSnackbar('Rellene todos los campos del formulario', { variant: 'error', });
      return;
    }
    // Intento login en la API
    this.props.login(email, password);
   
  }
}

export default withForm(Login);