// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
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

// Main component
function Home(props) {
  
    // Translate
    const { t } = props;

    // Destructuring de props
    const { start, end, totalCount } = props.lastCall
    const { currentPage, isFetching } = props.ui;
    const { adverts, session, filters, tags } = props;
    const { fetchTags, setCurrentPage, fetchIterateAdverts, enqueueSnackbar, setFilters, setFavorite, searchAdverts, fetchAdverts } = props;

    // On load
    useEffect(() => {        
        fetchTags();
        fetchAdverts()
        .catch (error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }, []);

    // Reservar producto
    const onFavoriteAdvert = (slug) => {
        if (!session.jwt) {
            enqueueSnackbar(t('You need to log in to manage favorites'), { variant: 'error' });
        } else {
            setFavorite(slug)
            .then(res => enqueueSnackbar(t('Advert SLUG ACTION favorites', {slug, action: res.favorite?t('added to'):t('removed from')}), { variant: 'success' }))
            .catch(error => enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));    
        }
    }

    // Gestiona el evento de búsqueda de anuncios
    const onHandleSearchAdverts = (filters) => {
        if (filters) {
            return searchAdverts(filters)
                .catch(error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
        }
        fetchAdverts()
        .catch(error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }

    // Paginación sobre la colección de anuncios
    const onfetchIterateAdverts = (direction) => {
        return fetchIterateAdverts(direction)
        .catch(error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
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
            <Footer session={props.session} onLogout={props.logout}/>
        </React.Fragment>
    );
}

export default withNamespaces()(Home);