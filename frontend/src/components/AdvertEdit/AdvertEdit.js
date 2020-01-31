// NPM Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Material UI
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Components
import NavBar from '../NavBar';
import Footer from '../Footer';
import Loading from '../Loading';
import Error from '../Error';
// Models
import Advert from '../../models/Advert';
// Assets
import imagePhoto from '../../assets/images/photo.png'
// CSS
import './styles.css';

/**
 * Main App
 */
export default class AdvertEdit extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.state = {
      photoTemp: '',
      openModal: false,   
      submit: false,
    }
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // En caso de ser una modificación cargo el anuncio a editar (para tener la versión más actualizada posible desde el backend)
    if (this.props.mode === 'edit' && this.props.match.params) {
      const id = this.props.match.params.id;
      this.props.loadAdvert(id);
    } else {
      this.props.clearAdvert();
    }
  }

  componentDidUpdate() {
    const { mode } = this.props;
    // Para solucionar el caso en el que estando ya en editar, el usuario navega a crear. Al estar ambas opciones en el mismo componente, el flujo
    // de react no pasa por el component did mount, y en ese caso el formulario aun estando en opción crear, mostraría los datos del anterior anuncio.
    // Con este if, y llamando al clear del store, consigo vaciar el anuncio del store, y con ello del form.
    if (mode === 'create' && this.props.advert._id !== '') {
      this.props.clearAdvert();
    }
    // Si se ha intentado guardar los cambios, y la operación ha concluido
    if (this.state.submit && this.props.ui.isUpdating === false) {
      if (!this.props.ui.error) {
        this.props.enqueueSnackbar(`OK. Anuncio ${mode === 'edit' ? 'editado':'creado'} con exito.`, { variant: 'success' });
        this.props.history.push('/');
      }
      else if (this.props.ui.error)
        this.props.enqueueSnackbar(`Error ${mode === 'edit' ? 'editando':'creando'} anuncio: ${this.props.ui.error}`, { variant: 'error' });
      // Evento reportado  
      this.setState({submit: false});
    }
  }

  /**
   * Render
   */
  render() {
    const { isUpdating, isFetching, error } = this.props.ui;
    const { mode } = this.props;
    return (
      <React.Fragment>
        <NavBar/>
        <Container>
          <main className='Main__Section'>
            <div className='Section__Title'>
              <h2>{mode === 'edit' ? 'Editar anuncio' : 'Crear nuevo anuncio' }</h2>
            </div>
            { this.props.advert &&
            <form onSubmit={this.handleSubmit} noValidate autoComplete='off' className='AdvertEdit__Form'>
              <button type='button' className='AdvertEdit_Picture' onClick={this.handleSwitchOpen}>
                <img src={this.props.advert.photo || imagePhoto} alt='dummy_photo'/>
              </button>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <InputLabel shrink htmlFor='type'>Nombre</InputLabel>
                <Input
                  name='name'
                  value={this.props.advert.name}
                  onChange={this.handleChange('name')}
                  type='text' 
                  required
                />
              </FormControl>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <InputLabel shrink htmlFor='type'>Tipo</InputLabel>
                <Select
                  name= 'type'
                  onChange={this.handleChange('type')}
                  className='SearchPanel__Type'
                  value={this.props.advert.type}
                  displayEmpty
                >
                  <MenuItem key='buy' value='buy'><Chip size='small' label='buy' className='Ad__Tag Ad__Tag--small Ad__Tag--buy'/></MenuItem>
                  <MenuItem key='sell' value='sell'><Chip size='small' label='sell' className='Ad__Tag Ad__Tag--small Ad__Tag--sell'/></MenuItem>                  
                </Select>
              </FormControl>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <InputLabel shrink htmlFor='tags'>Tags</InputLabel>
                <Select
                  multiple
                  name='tags'
                  value={this.props.advert.tags || ''}
                  onChange={this.handleChangeMultiple}
                  renderValue={() =>
                      <div> 
                        { this.props.advert.tags.map(value => 
                            <Chip key={value} size='small' label={value} className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}/> 
                        )}
                      </div>
                  }
                >
                  {
                    this.props.tags && 
                    this.props.tags.map((value, key) => {
                      return  <MenuItem key={key} value={value}>
                                <Chip key={key}
                                      size='small'
                                      label={value}
                                      className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                                />
                              </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <InputLabel htmlFor='price'>Price</InputLabel>
                <Input
                  name='price'
                  type='number'
                  value={this.props.advert.price}
                  onChange={this.handleChangeNumber('price')}
                  endAdornment={<InputAdornment position='start'>€</InputAdornment>}
                />
              </FormControl>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <TextField
                  name='description'
                  label='Descripción'
                  value={this.props.advert.description}
                  onChange={this.handleChange('description')}
                  multiline
                  rows={2}
                  helperText='Introduce una descripción para el anuncio'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl> 
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <FormControlLabel
                  control={ <Checkbox checked={this.props.advert.booked} onChange={this.handleChange('booked')} value="booked" /> }
                  label="Reservado"
                />
              </FormControl>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <FormControlLabel
                  control={ <Checkbox checked={this.props.advert.sold} onChange={this.handleChange('sold')} value="sold" /> }
                  label="Vendido"
                />
              </FormControl>
              <div className='AdvertEdit__Footer'>
                <Button type='submit' variant='contained' startIcon={<SaveIcon />} className='ButtonWallakeep ButtonWallakeep__Green'>
                  Guardar
                </Button>
                <Button type='button' variant='contained' color='secondary' startIcon={<CancelIcon />} onClick={this.handleReset} component={Link} to='/'>
                  Cancel
                </Button>
              </div>            
            </form>
            }
          </main>
          <Dialog open={this.state.openModal} className='AdvertEdit__Modal'>
            <DialogTitle className='Modal_Title'>
              URL de la imagen
            </DialogTitle>
            <DialogContent className='Modal__Content'>
              <DialogContentText>
                La API de nodepop no admite carga de imagenes locales por el momento. Por favor, indique la URL a la imagen que desea añadir al anuncio
              </DialogContentText>
              <TextField
                autoFocus
                name='photoTemp'
                value={this.state.photoTemp}
                onChange={(ev)=>{this.setState({photoTemp: ev.target.value})}}
                margin='dense'
                label='URL Imagen'
                type='text'
                fullWidth
              />
            </DialogContent>
            <DialogActions className='Modal__Actions'>
              <Button onClick={this.handleChangePhoto} variant='contained' startIcon={<CheckIcon />} className='ButtonWallakeep ButtonWallakeep__Green'>
                Aceptar
              </Button>
              <Button onClick={this.handleSwitchOpen} variant='contained' startIcon={<CancelIcon />} color='secondary'>
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
          { isFetching && <Loading text={'fetching advert'}/> }
          { isUpdating && <Loading text={mode === 'edit' ? 'Editando anuncio' : 'Creando anuncio' }/> }
          { error &&  <Error error={error}/> }
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }

  /**
   * Cambio en un input tipo texto
   */
  handleChange = field => event => {
    const aux = this.props.advert;
    aux[field] = event.target.value
    this.setState({
      advert: aux
    });
  }

  /**
   * Cambio en un input tipo number
   */
  handleChangeNumber = field => event => {
    const aux = this.props.advert;
    aux[field] = parseFloat(event.target.value);
    if (aux[field]) {
      this.setState({
        advert: aux
      }); 
    }
  }

  /**
   * Selectores de tipo multiple choice
   */
  handleChangeMultiple = event => {
    // Obtengo el estado, actualizo los tags seleccionados
    const aux = this.props.advert;
    aux.tags = event.target.value;
    // Actualizo el estado
    this.setState({advert: aux})
  };

  /**
   * Manejador del submit del formulario
   */
  handleSubmit = (ev) => {
    const { mode } = this.props;
    ev.preventDefault();
    // Creo un anuncio con los datos del estado si es válido
    const advert = new Advert(this.props.advert);
    if (advert.isValid()) {
      this.setState({submit: true});
      if (mode === 'create')
        this.props.editAdvert(advert, this.props.session.jwt);
      else
        this.props.editAdvert(advert, this.props.session.jwt);
    } else {
      // El anuncio no es completo. Error
      this.props.enqueueSnackbar('Los datos del anuncio no están completos', { variant: 'error' });
    }
  }

  /**
   * Handle open modal
   */
  handleSwitchOpen = () => {
    this.setState({
      photoTemp: this.props.advert.photo,
      openModal: !this.state.openModal
    });
  }

  /**
   * Hanle close modal
   */
  handleChangePhoto = () => {
    // Actualizo la imagen y cierro el modal
    if (this.state.photoTemp) {
      const aux = this.props.advert;
      aux.photo = this.state.photoTemp;
      this.setState({
        advert: aux,
        openModal: false
      }); 
    } else {
      this.props.enqueueSnackbar('Debe indicar una URL a una imagen primero', { variant: 'error' });
    }
  }

  renderValue = () => {
    if (this.props.advert.tags) {
      return (
        <div> 
        { this.props.advert.tags.map(value => 
          <Chip key={value} size='small' label={value} className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}/> 
        )}
        </div>
      );        
    }
    return <div></div>;
  }
}

AdvertEdit.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
}