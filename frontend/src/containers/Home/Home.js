// NPM Modules
import React, { useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Footer from '../../components/Footer';
// Components
import SearchPanel from '../../components/SearchPanel';
import NavBar from '../../components/NavBar';
// Containers
// Own modules
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default function Home(props) {
  
    // Destructuring de props
    const { start, end, totalCount } = props.lastCall
    const { currentPage, isFetching } = props.ui;
    const { adverts, session, filters, tags } = props;
    const { fetchTags, setCurrentPage, fetchIterateAdverts, enqueueSnackbar, setFilters, setFavorite, searchAdverts, fetchAdverts } = props;

    // On load
    useEffect(() => {        
        fetchTags();
        fetchAdverts()
        .then (response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch (error => enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
    }, []);

    // Reservar producto
    const onFavoriteAdvert = (slug) => {
        if (! session.jwt) {
            enqueueSnackbar('Necesita hacer login para añadir a favoritos', { variant: 'info' });
            props.history.push('/login');
            return;
        }
        setFavorite(slug, session.jwt)
        .then(advert => enqueueSnackbar(`Anuncio ${advert.slug} ${advert.favorite?'añadido a':'eliminado de'} favoritos`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Error marcando favorito ${error}`, { variant: 'error' }));
    }

    // Gestiona el evento de búsqueda de anuncios
    const onHandleSearchAdverts = (filters) => {
        if (filters) {
            return searchAdverts(filters)
            .then (response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
            .catch(error => enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
        }
        fetchAdverts()
        .then (response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch(error => enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
    }

    // Paginación sobre la colección de anuncios
    const onfetchIterateAdverts = (direction) => {
        return fetchIterateAdverts(direction)
        .then (response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch(error => enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
    }

    // Render
    return (
        <React.Fragment>
            <NavBar/>
            <Container className='Container__Fill'>
            <main className='Main__Section'>
                <div className='Home__Results'>
                <SearchPanel tags={tags} onSearchAdverts={onHandleSearchAdverts} onSetFilters={setFilters} filters={filters} />
                    <AdvertList 
                        type='tiles' 
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={adverts}
                        showFavorite={session.email?true:false}
                        isFetching={isFetching}
                        onFavoriteAdvert={onFavoriteAdvert}
                        onSetCurrentPage={setCurrentPage}
                        onfetchIterateAdverts={onfetchIterateAdverts}
                    />
                </div>
            </main>
            </Container>
            <Footer/>
        </React.Fragment>
    );
}