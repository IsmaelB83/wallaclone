// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/adverts/AdvertList';
import SearchForm from '../../components/forms/SearchForm';
import Footer from '../../components/layout/Footer';
import NavBar from '../../components/layout/NavBar';
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
    const { adverts, session, filters, tags, chats } = props;
    const { fetchTags, setCurrentPage, fetchIterateAdverts, enqueueSnackbar, setFilters, resetFilters, setFavorite, searchAdverts, fetchAdverts } = props;

    // On load
    useEffect(() => {        
        fetchTags();
        fetchAdverts()
        .catch (error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }, [fetchTags, fetchAdverts, enqueueSnackbar, t]);

    // Reservar producto
    const favoriteAdvert = (slug) => {
        if (!session.jwt) {
            enqueueSnackbar(t('You need to log in to manage favorites'), { variant: 'error' });
        } else {
            setFavorite(slug)
            .then(res => enqueueSnackbar(t('Advert SLUG ACTION favorites', {slug, action: res.favorite?t('added to'):t('removed from')}), { variant: 'success' }))
            .catch(error => enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));    
        }
    }

    // Open chat
    const openChat = slug => {
        // Check first if already have a chat for that advert
        const i = chats.findIndex(c => c.advert.slug === slug);
        if (i < 0 ) {
            props.createChat(slug)
            .catch (error => enqueueSnackbar(t('Error opening a new chat session ERROR', {error}), { variant: 'error' }));
        } else {
            props.history.push(`/chats/${chats[i]._id}`);
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
    const iterateAdverts = (direction) => {
        return fetchIterateAdverts(direction)
        .catch(error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container'>
                <main className='Main__Section'>
                    <div className='Home__Results'>
                        <SearchForm 
                            tags={tags} 
                            onSearchAdverts={onHandleSearchAdverts} 
                            onSetFilters={setFilters} 
                            onResetFilters={resetFilters} 
                            filters={filters} 
                        />
                        <AdvertList 
                            type='tiles' 
                            start={start}
                            end={end}
                            totalCount={totalCount}
                            currentPage={currentPage}
                            adverts={adverts}
                            session={session}
                            isLoading={isFetching}
                            onFavoriteAdvert={favoriteAdvert}
                            onSetCurrentPage={setCurrentPage}
                            onfetchIterateAdverts={iterateAdverts}
                            onOpenChat={openChat}
                        />
                    </div>
                </main>
            </Container>
            <Footer session={props.session} onLogout={props.logout} active='Home'/>
        </React.Fragment>
    );
}

export default withNamespaces()(Home);