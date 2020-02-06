// NPM Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../../components/InputForm';
import Form from '../../components/Form';
import withForm from '../../components/Form/withForm';
import LoadingSmall from '../../components/LoadingSmall';
// Models
// Own modules
import AuthServices from '../../services/AuthServices';
// Assets
import imageLogo from '../../assets/images/logo2.png';
// CSS
import './styles.css';

/**
 * Request reset Form
 */
class RequestReset extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.requestReset}>
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
   * Handle onSubmit event
   */
  requestReset = async (inputs) => {
    // Campos relevantes del form
    const { email } = {...inputs};
    // Solicito resetear el password al API
    try {
      const user = await AuthServices.resetRequest(email);
      if (user) {
        this.props.enqueueSnackbar('Revise su email para resetear la contraseña.', { variant: 'success', });
        this.props.history.push('/login');
      } else {
        this.props.enqueueSnackbar('Error solicitando reseteo de contraseña.', { variant: 'error', });
      }        
    } catch (error) {
      this.props.enqueueSnackbar(error.message, { variant: 'error', });
    }
  }
}

export default withForm(RequestReset);