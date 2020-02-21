// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
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

// Published section
function Favorites (props) {
    
    // Translate
    const { t } = props;

    // Destructuring index props
    const { enqueueSnackbar, setFavorite, setCurrentPage, fetchFavorites, logout, createChat } = props;
    const { start, end, totalCount} = props.lastCall;
    const { session, adverts, chats } = props;
    const { currentPage, isFetching } = props.ui;

    // Cargo favoritos del usuario
    useEffect(() => {
        fetchFavorites()
        .catch(error => enqueueSnackbar(t('Error loading favorites ERROR', {error}), { variant: 'error' }));
    }, [fetchFavorites, enqueueSnackbar, t]);

    // Open chat
    const openChat = slug => {
        // Check first if already have a chat for that advert
        const i = chats.findIndex(c => c.advert.slug === slug);
        if (i < 0 ) {
            createChat(slug)
            .catch (error => enqueueSnackbar(t('Error opening a new chat session ERROR', {error}), { variant: 'error' }));
        } else {
            props.history.push(`/chats/${chats[i]._id}`);
        }
    }

    // Delete favorite
    const deleteFavorite = slug => {
        setFavorite(slug)
        .catch(error => enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));
    }
    
    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={logout}/>
            <Container className='Container'>
                <main className='Main__Section'>
                    <div className='Section__Content'>
                        <div className='Content__Title'>
                            <h1 className='Title'>Tus favoritos</h1>
                            <p className='Counter'><span>{totalCount}</span> {t('products')}</p>
                        </div>
                        <p className='Text'>Aquí puedes hacer seguimiento de todos los anuncios que has añadido a tus favoritos...</p>
                    </div>
                    <AdvertList 
                        type='list' 
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={adverts}
                        session={session}
                        isLoading={isFetching}
                        onFavoriteAdvert={deleteFavorite}
                        onSetCurrentPage={setCurrentPage}
                        onOpenChat={openChat}
                    />
                </main>
            </Container>
            <Footer session={session} onLogout={props.logout} active='Favorites'/>
        </React.Fragment>
    );
}

export default withNamespaces()(Favorites);