// NPM Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
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
 * Remember Form
 */
class Remember extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.login}>
            <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
            <InputForm name='email' type='email' placeholder='type your email' required icon={<PermIdentityIcon/>}/>
            <p className='Login__Help'>enter your email to restart your password</p>
            <div className='Login__Buttons'>
              <Button className='button' type='submit' variant='contained' color='primary'> Restart password </Button>
              <Link className='Login__Link' to='/login'>Go to login</Link>
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

export default withForm(Remember);