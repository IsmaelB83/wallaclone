// NPM Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      surname: this.props.session.surname, 
      callUpdate: false,
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
            <div className='Section__Title'>
              <h2>Perfil de usuario</h2>
            </div>
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
                <InputLabel shrink htmlFor='type'>Apellido</InputLabel>
                <Input
                  name='surname'
                  value={this.state.surname}
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
                <Input
                  name='password_new_1'
                  value={this.state.password_new_1}
                  onChange={this.handleChange}
                  type='password' 
                  required
                />
              </FormControl>
              <FormControl fullWidth className='Profile__FormControl'>
                <InputLabel shrink htmlFor='type'>Repeat Password</InputLabel>
                <Input
                  name='password_new_2'
                  value={this.state.password_new_2}
                  onChange={this.handleChange}
                  type='password' 
                  required
                />
              </FormControl>
              <div className='Profile__Footer'>
                <Button type='submit' variant='contained' color='primary' startIcon={<SaveIcon />} className='ButtonWallakeep ButtonWallakeep__Green'>
                  Guardar
                </Button>
                <Button type='button' variant='contained' color='secondary' onClick={this.handleReset} startIcon={<DeleteIcon />} to='/login' component={Link}>
                  Borrar Cuenta
                </Button>
              </div>            
            </form>
          </main>
          { this.props.isUpdating && <Loading text={'Actualizando datos de usuario' }/> }
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }

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
    const { email, name, surname, password_old, password_new_1, password_new_2 } = this.state;    
    // Está intentando realizar una cambio de email
    const user = {
      email: email,
      name: name,
      surname: surname
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
      this.props.editUser(user);
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

  /**
   * Borra datos de sesión y desconecta
   */
  deleteAccount = () => {
    this.props.logout();
  }
}

Profile.propTypes = {
  tags: PropTypes.array,
  session: PropTypes.object,
  editSession: PropTypes.func,
  logout: PropTypes.func
}