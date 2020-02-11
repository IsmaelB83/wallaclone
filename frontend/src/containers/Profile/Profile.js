// NPM Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material UI
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
// Components
import ModalConfirm from '../../components/ModalConfirm';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
// Models
// Own modules
// Assets
import imagePhoto from '../../assets/images/user.png'
// CSS
import './styles.css';

/**
 * Main App
 */
export default class Profile extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.session.email,
      name: this.props.session.name,
      callUpdate: false,
      showModalDelete: false,
    }
  }

  /**
   * Render
   */
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Container>
            <main className='Main__Section'>
                <form onSubmit={this.handleSubmit} noValidate autoComplete='off' className='Profile__Form'>
                    <div className='Profile_Picture'>
                        <img src={imagePhoto} alt='user_avatar'/>
                    </div>
                    <FormControl fullWidth className='Profile__FormControl'>
                        <InputLabel shrink htmlFor='type'>Nombre</InputLabel>
                        <Input
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        type='text' 
                        required
                        />
                    </FormControl>
                    <FormControl fullWidth className='Profile__FormControl'>
                        <InputLabel shrink htmlFor='type'>Email</InputLabel>
                        <Input
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        type='email' 
                        required
                        />
                    </FormControl>
                    <FormControl fullWidth className='Profile__FormControl'>
                        <InputLabel shrink htmlFor='type'>Old Password</InputLabel>
                        <Input
                        name='password_old'
                        value={this.state.password_old}
                        onChange={this.handleChange}
                        type='password' 
                        required
                        />
                    </FormControl>
                    <FormControl fullWidth className='Profile__FormControl'>
                        <InputLabel shrink htmlFor='type'>New password</InputLabel>
                        <Input  name='password_new_1'
                                value={this.state.password_new_1}
                                onChange={this.handleChange}
                                type='password' 
                                required
                        />
                    </FormControl>
                    <FormControl fullWidth className='Profile__FormControl'>
                        <InputLabel shrink htmlFor='type'>Repeat Password</InputLabel>
                        <Input  name='password_new_2'
                                value={this.state.password_new_2}
                                onChange={this.handleChange}
                                type='password' 
                                required
                        />
                    </FormControl>
                    <div className='Profile__Footer'>
                        <Button type='submit' variant='contained' color='primary' startIcon={<SaveIcon />} className='ButtonWallaclone ButtonWallaclone__Green'>
                        Guardar
                        </Button>
                        <Button type='button' variant='contained' color='secondary' onClick={this.requestDeleteAccount} startIcon={<DeleteIcon />}>
                        Borrar Cuenta
                        </Button>
                    </div>            
                </form>
            </main>
            { this.props.isUpdating && <Loading text={'Actualizando datos de usuario' }/> }
            {   this.state.showModalDelete && 
                <ModalConfirm   onConfirm={this.confirmDeleteAccount} 
                                onCancel={this.cancelDeleteAccount} 
                                visible={true} type='warning'
                                title='¿Está seguro de borrar su cuenta y todos los anuncios relacionados?'
                /> 
            }
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }


  requestDeleteAccount = () => this.setState({showModalDelete: true});
  cancelDeleteAccount = () => this.setState({showModalDelete: false});   
  confirmDeleteAccount = () => {
      this.setState({showModalDelete: false});
      const { jwt, _id } = this.props.session;
      this.props.logout(jwt);
      this.props.deleteAccount(_id, jwt)
      .then(response => {
          this.props.enqueueSnackbar('Su cuenta y todos los anuncios asociados ha sido eliminada', { variant: 'success', });
          this.props.history.push('');
      })
      .catch(error => {
          this.props.enqueueSnackbar(`Error eliminando cuenta ${error}`, { variant: 'error', })
      });
  };
  
  /**
   * Cambio en un input tipo texto
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Manejador del submit del formulario
   */
  handleSubmit = (ev) => {
    ev.preventDefault();
    // Genero sesión y la guardo en LS
    const { email, name, password_old, password_new_1, password_new_2 } = this.state;    
    // Está intentando realizar una cambio de email
    const user = {
      email: email,
      name: name,
    }
    // ¿Está intenando realizar un cambio de contraseña?
    if (password_new_1 || password_new_2) {
      if (password_new_1 !== password_new_2) {
        this.props.enqueueSnackbar('Los password indicados no coinciden.', { variant: 'error' });        
      } else if (!password_old) {
        this.props.enqueueSnackbar('Debe indicar su contraseña actual para poder cambiarla.', { variant: 'error' });        
      } else {
        user['password'] = password_new_1;
      }
    }
    // Dispatch update user
    this.setState({callUpdate: true}, () => {
      this.props.editUser(user, this.props.session.jwt);
    });
  }

  /**
   * Cada vez que se actualiza
   */
  componentDidUpdate() {
    if (this.state.callUpdate && !this.props.isUpdating && !this.props.error) {
      this.props.enqueueSnackbar('Datos de usuario actualizados con éxito', { variant: 'success' });
      this.props.history.push('/');
    } else if (this.state.callUpdate && !this.props.isUpdating && this.props.error) {
      this.props.enqueueSnackbar(this.props.error, { variant: 'error' });        
    }
  }
}

Profile.propTypes = {
  tags: PropTypes.array,
  session: PropTypes.object,
  editSession: PropTypes.func,
  logout: PropTypes.func
}