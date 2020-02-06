// NPM Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../../components/InputForm';
import Form from '../../components/Form';
import withForm from '../../components/Form/withForm';
// Models
// Own modules
import AuthServices from '../../services/AuthServices';
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
          <Form className='Login__Form' onSubmit={this.resetPassword}>
            <img src={imageLogo} className='Login__Logo' alt='nodepop-logo' />
            <InputForm name='password' type='password' placeholder='type your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
            <InputForm name='password_2' type='password' placeholder='repeat your password' autocomplete='on' required icon={<LockOpenIcon/>}/>
            <p className='Login__Help'>enter your new password</p>
            <div className='Login__Buttons'>
              <Button className='button' type='submit' variant='contained' color='primary'> Reset password </Button>
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
  resetPassword = async (inputs) => {
    // Campos relevantes para generar el objeto sesión
    const { password, password_2 } = {...inputs};
    // Son todos obligatorios, en caso de no estar no permito continuar
    if ( password !== password_2 ) {
      this.props.enqueueSnackbar('Ambos passwords deben ser iguales', { variant: 'error', });
    } else {
      // Reseteo el password
      try {
        const user = await AuthServices.reset(this.props.match.params.token, password);
        if (user) {
          this.props.enqueueSnackbar('Password reseteado con exito', { variant: 'success', });
        } else {
          this.props.enqueueSnackbar('Error reseteando password. Intenteló de nuevo o contacte con el administrador', { variant: 'error', });
        }        
      } catch (error) {
        this.props.enqueueSnackbar(error.message, { variant: 'error', });
      } finally {
        this.props.history.push('/login');
      }
    }
  }
}

export default withForm(Register);