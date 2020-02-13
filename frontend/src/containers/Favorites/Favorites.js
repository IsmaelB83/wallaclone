// NPM Modules
import React, { useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

/**
* Main App
*/
export default function Published (props) {
    
    // Destructuring index props
    const { enqueueSnackbar, setFavorite, setCurrentPage, fetchFavorites, fetchIterateAdverts} = props;
    const { start, end, totalCount} = props.lastCall;
    const { adverts, session } = props;
    const { currentPage, isFetching } = props.ui;

    // Cargo favoritos del usuario
    useEffect(() => {
        fetchFavorites(session.jwt)
        .then(response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch(error => enqueueSnackbar(`Error cargando favorios de ${session.name}`, { variant: 'error' }));
    }, []);

    // Paginación sobre la colección de anuncios
    const onFetchIterateAdverts = (direction) => {
        return fetchIterateAdverts(direction)
        .then (response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch(error => enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' }));
    }

    // Delete favorite
    const deleteFavorite = slug => {
        setFavorite(slug, props.session.jwt)
        .then(advert => enqueueSnackbar(`Anuncio ${advert.slug} ${advert.favorite?'añadido a':'eliminado de'} favoritos`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Error eliminando favorito ${error}`, { variant: 'error' }));
    }
    
    // Render
    return (
        <React.Fragment>
            <NavBar/>
            <Container className='Container__Fill'>
                <main className='Main__Section'>
                    <AdvertList 
                        type='list' 
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={adverts}
                        showEdit={false}
                        showFavorite={true}
                        isFetching={isFetching}
                        onFavoriteAdvert={deleteFavorite}
                        onSetCurrentPage={setCurrentPage}
                        onfetchIterateAdverts={onFetchIterateAdverts}
                    />
                </main>
            </Container>
            <Footer/>
        </React.Fragment>
    );
}