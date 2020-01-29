// NPM Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../Forms/InputForm';
import Form from '../Forms/Form';
import withForm from '../Forms/Form/withForm';
// Models
// Own modules
import UserServices from '../../services/UserServices';
// Assets
import imageLogo from '../../assets/images/logo2.png';
// CSS
import './styles.css';

/**
 * Login Form
 */
class Register extends Component {

  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      created: false
    }
  }
  
  /**
   * Render
   */
  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.createUser}>
            <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
            <InputForm name='name' type='name' placeholder='type your name' required icon={<PermIdentityIcon/>}/>
            <InputForm name='email' type='email' placeholder='type your email' required icon={<MailOutlineIcon/>}/>
            <InputForm name='password' type='password' placeholder='type your password' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder='repeat your password' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>enter your user information</p>
            <div className='Login__Buttons'>
              <Button className='button' type='submit' variant='contained' color='primary'> Create user </Button>
              <Link className='Login__Link' to='/login'>Go to login</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  /**
   * Handle onSubmit event
   */
  createUser = async (inputs) => {
    // Campos relevantes para generar el objeto sesión
    const { name, email, password, password_2 } = {...inputs};
    // Son todos obligatorios, en caso de no estar no permito continuar
    if ( !name || !email || !password || !password_2 ) {
      this.props.enqueueSnackbar('Rellene todos los campos del formulario', { variant: 'error', });
    } else if ( password !== password_2 ) {
      // TO-DO cambiar para chequeo en tiempo real
      this.props.enqueueSnackbar('Ambos passwords deben ser iguales', { variant: 'error', });
    } else {
      // Creo el usuario
      try {
        const user = await UserServices.create(name, email, password);
        if (user) {
          this.props.enqueueSnackbar('Usuario creado con éxito. Chequea el mail para activar la cuenta', { variant: 'success', });
        } else {
          this.props.enqueueSnackbar('Error creando usuario. Intenteló de nuevo o contacte con el administrador', { variant: 'error', });
        }        
      } catch (error) {
        this.props.enqueueSnackbar(error.message, { variant: 'error', });
      }
    }
  }
}

export default withForm(Register);