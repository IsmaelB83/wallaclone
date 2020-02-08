// NPM Modules
import React, { Component } from 'react';
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
        if (!this.props.adverts.length) {
            this.props.fetchTags();
            this.props.loadAdverts();
        }
    }

    // Reservar producto
    favoriteAdvert = (slug) => {
        this.props.setFavorite(slug, this.props.session.jwt)
        .then(advert => this.props.enqueueSnackbar(`Anuncio ${advert.slug} añadido a favoritos`, { variant: 'success' }))
        .catch(error => this.props.enqueueSnackbar(`Error marcando favorito ${error}`, { variant: 'error' }));
    }

    // Gestiona el evento de búsqueda de anuncios
    handleSearch = (filters) => {
        if (filters)
        return this.props.searchAdverts(filters);
        this.props.loadAdverts();
    }

    // Retrocede una página
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