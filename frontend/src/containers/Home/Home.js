// NPM Modules
import React, { Component } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Footer from '../../components/Footer';
// Components
import SearchPanel from '../../components/SearchPanel';
import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import Error from '../../components/Error';
// Containers
// Own modules
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default class Home extends Component {
  
  /**
   * Render
   */
  render() { 
        
    // Destructuring de props
    const { isFetching, error, currentPage } = this.props.ui;
    const { start, end, totalCount } = this.props.filters;


    // Render
    return (
        <React.Fragment>
            <NavBar/>
            <Container className='Container__Fill'>
            <main className='Main__Section'>
                <div className='Home__Results'>
                <SearchPanel tags={this.props.tags} onSearchAdverts={this.handleSearchAdverts} onSetFilters={this.props.setFilters} filters={this.props.filters} />             
                { this.props.adverts.length &&
                    <AdvertList 
                        type='tiles' 
                        itemsPerPage={parseInt(process.env.REACT_APP_MAX_ADVERTS_TILE)}
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={this.props.adverts}
                        showFavorite={this.props.session.email?true:false}
                        onSetCurrentPage={this.props.setCurrentPage}
                        onFavoriteAdvert={this.favoriteAdvert}
                    />
                }
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
            this.handleSearchAdverts();
        }
    }

    // Reservar producto
    favoriteAdvert = (slug) => {
        if (! this.props.session.jwt) {
            this.props.enqueueSnackbar('Necesita hacer login para añadir a favoritos', { variant: 'info' });
            this.props.history.push('/login');
            return;
        }
        this.props.setFavorite(slug, this.props.session.jwt)
        .then(advert => this.props.enqueueSnackbar(`Anuncio ${advert.slug} ${advert.favorite?'añadido a':'eliminado de'} favoritos`, { variant: 'success' }))
        .catch(error => this.props.enqueueSnackbar(`Error marcando favorito ${error}`, { variant: 'error' }));
    }

    // Gestiona el evento de búsqueda de anuncios
    handleSearchAdverts = (filters) => {
        // Search
        if (filters) {
            return this.props.searchAdverts(filters)
            .then (response => this.props.enqueueSnackbar(`Cargados ${response.adverts.length} de un total de ${response.apiCount}`, { variant: 'info' }))
            .catch(error => this.props.enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
        }
        // No filters
        this.props.fetchAdverts()
        .then (response => this.props.enqueueSnackbar(`Cargados ${response.adverts.length} de un total de ${response.apiCount}`, { variant: 'info' }))
        .catch (error => this.props.enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
    }
}