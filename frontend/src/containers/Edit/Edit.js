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
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Components
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
// Models
import Advert from '../../models/Advert';
// Assets
import imagePhoto from '../../assets/images/photo.png'
// CSS
import './styles.css';

/**
 * Main App
 */
export default class Edit extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props)
    this.inputFile = React.createRef();
    this.state = {
      photoTemp: '',
      advert: Advert.emptyAdvert()
    }
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // Lo primero es obtener el anuncio del API (versión más actual que la que tengo en el store)
    if (this.props.mode === 'edit') {
      // Cargando anuncio
      this.setState({
        isFetching: true,
        error: ''
      }, () => {
        this.props.fetchAdvert(this.props.match.params.slug)
        .then (advert => this.setState({isFetching: false, error: '', advert: advert}))
        .catch(error  => this.setState({isFetching: false, error: error, advert: Advert.emptyAdvert}));
      });
    }
  }

  /**
   * Cuando el componente se actualiza
   */
  componentDidUpdate() {
    // En caso de que el usuario pase de editar directamente a crear
    if (this.props.mode === 'create' && this.state.advert._id !== '') {
      this.setState({advert: Advert.emptyAdvert()});
    }
  }

  /**
   * Open input file
   */
  openInputFile = () => {
    this.inputFile.current.click();
  }
  
  /**
   * Hanle close modal
   */
  changeInputFile = (ev) => {
    // Actualizo la imagen y cierro el modal
    ev.stopPropagation();
    ev.preventDefault();
    const aux = this.state.advert;
    aux.file = ev.target.files[0];
    // Update state advert
    this.setState({
      advert: aux,
      photoTemp: URL.createObjectURL(aux.file)
    });
  }

  /**
   * Render
   */
  render() {
    const { mode } = this.props;
    const { advert } = this.state;
    return (
      <React.Fragment>
        <NavBar/>
        <Container>
          <main className='Main__Section'>
            <form onSubmit={this.handleSubmit} noValidate autoComplete='off' className='AdvertEdit__Form'>
              <input type='file' id='file' ref={this.inputFile} style={{display: 'none'}} onChange={this.changeInputFile} />
              <button type='button' className='AdvertEdit_Picture' onClick={this.openInputFile}>
                <img src={advert.photo || this.state.photoTemp || imagePhoto} alt='dummy_photo'/>
              </button>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <InputLabel shrink htmlFor='type'>Nombre</InputLabel>
                <Input
                  name='name'
                  value={advert.name}
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
                  value={advert.type}
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
                  value={advert.tags || ''}
                  onChange={this.handleChangeMultiple}
                  renderValue={() =>
                      <div> 
                        { advert.tags.map(value => 
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
                  value={advert.price}
                  onChange={this.handleChangeNumber('price')}
                  endAdornment={<InputAdornment position='start'>€</InputAdornment>}
                />
              </FormControl>
              <FormControl fullWidth className='AdvertEdit__FormControl'>
                <TextField
                  name='description'
                  label='Descripción'
                  value={advert.description}
                  onChange={this.handleChange('description')}
                  multiline
                  rows={2}
                  helperText='Introduce una descripción para el anuncio'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl> 
              { mode === 'edit' && 
                  <React.Fragment>
                    <FormControl fullWidth className='AdvertEdit__FormControl'>
                      <FormControlLabel
                        control={ <Checkbox checked={advert.booked} onChange={this.handleCheck('booked')} value='booked' /> }
                        label='Reservado'
                      />
                    </FormControl>
                    <FormControl fullWidth className='AdvertEdit__FormControl'>
                      <FormControlLabel
                        control={ <Checkbox checked={advert.sold} onChange={this.handleCheck('sold')} value='sold' /> }
                        label='Vendido'
                      />
                    </FormControl>
                  </React.Fragment>
              }
              <div className='AdvertEdit__Footer'>
                <Button type='submit' variant='contained' startIcon={<SaveIcon />} className='ButtonWallakeep ButtonWallakeep__Green'>
                  Guardar
                </Button>
                <Button type='button' variant='contained' color='secondary' startIcon={<CancelIcon />} onClick={this.handleReset} component={Link} to='/'>
                  Cancel
                </Button>
              </div>            
            </form>
          </main>
          { this.state.isFetching && <Loading text={'fetching advert'}/> }
          { this.state.isUpdating && <Loading text={mode === 'edit' ? 'Editando anuncio' : 'Creando anuncio' }/> }
          { this.state.error &&  <Error error={this.state.error}/> }
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }

  /**
   * Cambio en un input tipo texto
   */
  handleChange = field => event => {
    const aux = this.state.advert;
    aux[field] = event.target.value
    this.setState({
      advert: aux
    });
  }

  /**
   * Cambio en un input tipo check
   */
  handleCheck = field => event => {
    const aux = this.state.advert;
    aux[field] = event.target.checked
    this.setState({
      advert: aux
    });
  }

  /**
   * Cambio en un input tipo number
   */
  handleChangeNumber = field => event => {
    const aux = this.state.advert;
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
    const aux = this.state.advert;
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
    const advert = new Advert(this.state.advert);
    advert.file = this.state.advert.file;
    if (mode === 'create') {
      advert.photo = advert.file.name;
      advert.thumbnail = advert.file.name;
    }
    // Si los datos son completos continuo con la operación
    if (!advert.isValid()) {
      this.props.enqueueSnackbar('Los datos del anuncio no están completos', { variant: 'error' });
    } else {
        // Lanzando operacion al backend
        this.setState({
          isUpdating: true,
          error: ''
        }, () => {
          if (mode === 'create') {
            // Create
            this.props.createAdvert(advert, this.props.session.jwt)
            .then (() => {
              this.props.enqueueSnackbar('Anuncio creado con éxito', { variant: 'success' });
              this.setState({advert: Advert.emptyAdvert()}, () => {
                this.props.history.push('/');
              })
            })
            .catch(error => this.setState({isUpdating: false, error: error}));
          } else {
            // Edit
            this.props.editAdvert(advert, this.props.session.jwt)
            .then (() => {
              this.props.enqueueSnackbar('Anuncio editado con éxito', { variant: 'success' });
              this.props.history.push('/');
            })
            .catch(error  => this.setState({isUpdating: false, error: error}));
          }    
        });
    } 
  }

  renderValue = () => {
    if (this.state.advert.tags) {
      return (
        <div> 
        { this.state.advert.tags.map(value => 
          <Chip key={value} size='small' label={value} className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}/> 
        )}
        </div>
      );        
    }
    return <div></div>;
  }
}

Edit.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
}