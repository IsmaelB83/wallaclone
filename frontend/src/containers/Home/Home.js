// NPM Modules
import React, { Component } from 'react';
import Moment from 'react-moment';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Footer from '../../components/Footer';
// Components
import SearchPanel from '../../components/SearchPanel';
import Paginator from '../../components/Paginator';
import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import Error from '../../components/Error';
// Containers
// Own modules
// Assets
// CSS
import './styles.css';

// Máximos anuncios por página
const MAX_ADVERTS = parseInt(process.env.REACT_APP_MAX_ADVERTS);

/**
 * Main App
 */
export default class Home extends Component {
  
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      favoriteClicked: false
    };
  }

  /**
   * Render
   */
  render() {   
    // Variables para el UI
    const { isFetching, error, currentPage } = this.props.ui;
    // Variables para el paginado
    const numPages = Math.ceil(this.props.adverts.length/MAX_ADVERTS);
    const minAdvert = currentPage * MAX_ADVERTS;
    const maxAdvert = currentPage * parseInt(MAX_ADVERTS) + parseInt(MAX_ADVERTS)

    // Render
    return (
      <React.Fragment>
        <NavBar/>
        <Container className='Container__Fill'>
          <main className='Main__Section'>
            <div className='Home__Results'>
              <SearchPanel tags={this.props.tags} handleAPISearch={this.handleSearch}/>
              <Paginator numPages={numPages} currentPage={currentPage} handleMovePaginator={this.handleMovePaginator}/>
              <p className='Home__Count'>{this.props.adverts.length} resultados cumplen el filtro. {this.props.ui.totalAdvertsReturned} resultados en el store de redux</p>
              <p className='Home__Count'>Last API call <Moment fromNow>{this.props.ui.lastAdvertsUpdated}</Moment></p>
              { this.props.adverts.length > 0 &&
                <AdvertList 
                  type='tiles' 
                  adverts={this.props.adverts.slice(minAdvert, maxAdvert)}
                  showFavorite={this.props.session.email?true:false}
                  onFavoriteAdvert={this.favoriteAdvert}
                />
              }
              { this.props.adverts.length === 0 &&
                <h2 className='Home__Subtitle'>No hay anuncios que cumplan con los criterios de búsqueda</h2>
              }
              <Paginator numPages={numPages} currentPage={currentPage} handleMovePaginator={this.handleMovePaginator}/>
            </div>
            { isFetching && <Loading text={'fetching data'}/> }
            { error &&  <Error error={error}/> }
          </main>
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }

  // Component did mount
  componentDidMount() {
    // API Call only the first time user navigates to the component (i.e. redux-store is empty of advert)
    if (!this.props.adverts.length) {
      this.props.fetchTags();
      this.props.loadAdverts();
    }
  }

  // Reservar producto
  favoriteAdvert = (slug) => {
    this.props.setFavorite(slug, this.props.session.jwt);
    this.setState({favoriteClicked: true});
  }
  
  /**
   * Gestiona el evento de búsqueda de anuncios
   */
  handleSearch = (filters) => {
    if (filters)
      return this.props.searchAdverts(filters);
    this.props.loadAdverts();
  }

  /**
   * Retrocede una página
   */
  handleMovePaginator = increment => {
    // Actualizo la pagina actual
    let { currentPage } = this.props.ui;
    const numPages = Math.ceil(this.props.adverts.length/MAX_ADVERTS);
    currentPage += increment;
    // Actualizo el state sólo si sigue dentro de los limites (realmente este chequeo también lo hace el componete paginator)
    if (increment !== 0 && currentPage >= 0 && currentPage < numPages) {
        this.props.setCurrentPage(currentPage);
    }
  }
}