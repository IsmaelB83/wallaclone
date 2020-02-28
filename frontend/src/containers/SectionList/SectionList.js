// NPM Modules
import React, { useState, useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ModalConfirm from '../../components/modals/ModalConfirm';
import AdvertList from '../../components/adverts/AdvertList';
import SectionHeader from '../../components/SectionHeader';
import Footer from '../../components/layout/Footer';
import NavBar from '../../components/layout/NavBar';
// Own modules
// Models
// Assets
// CSS

// Section with a list of adverts
export default function SectionList (props) {
    
    // Translate
    const { t } = props;

    // Destructure props
    const { enqueueSnackbar, 
            fetchUserAdverts, fetchFavorites, fetchIterateAdverts, fetchSoldHistory, setCurrentPage, 
            setFavorite, bookAdvert, sellAdvert, deleteAdvert, createChat, logout } = props;
    const { start, end, totalCount } = props.lastCall;
    const { currentPage, isFetching } = props.ui;
    const { adverts, session, chats, history, listType } = props;
    const { login } = props.match.params;
    const sessionLogin = props.session.login;

    // Cargo anuncios del usuario solicitado
    useEffect(() => {
        debugger;
        switch (listType) {
            case 'history':
                fetchSoldHistory()
                .catch(error => enqueueSnackbar(t('Error loading USER sold history ERROR', {user: sessionLogin, error}), { variant: 'error' }));
                break;
            case 'favorites':
                fetchFavorites()
                .catch(error => enqueueSnackbar(t('Error loading favorites ERROR', {error}), { variant: 'error' }));
                break;
            case 'published':
                fetchUserAdverts(login)
                .catch(error => enqueueSnackbar(t('Error loading USER adverts ERROR', {user: login, error}), { variant: 'error' }));
                break;
            default:
                break;
        }
    }, [listType, fetchSoldHistory, fetchFavorites, fetchUserAdverts, enqueueSnackbar, login, sessionLogin, t]);

    // Paginación sobre la colección de anuncios
    const fetchIterateAdvertsHandler = (direction) => {
        return fetchIterateAdverts(direction)
        .catch(error => enqueueSnackbar(t('Error iterating adverts ERROR', {error}), { variant: 'error' }));
    }

    // Favorito
    const favoriteAdvertHandler = slug => {
        setFavorite(slug)
        .catch(error => enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));
    }

    // Reservado
    const bookAdvertHandler = slug => {
        bookAdvert(slug)
        .catch(error => enqueueSnackbar(t('Error setting advert as booked ERROR', {error}), { variant: 'error' }));
    };

    // Vendido
    const sellAdvertHandler = slug => {
        sellAdvert(slug)
        .catch(error => enqueueSnackbar(t('Error setting advert as sold ERROR', {error}), { variant: 'error', }));
    };

    // Open chat
    const openChatHandler = slug => {
        // Check first if already have a chat for that advert
        const i = chats.findIndex(c => c.advert.slug === slug);
        if (i < 0 ) {
            createChat(slug)
            .catch (error => enqueueSnackbar(t('Error opening a new chat session ERROR', {error}), { variant: 'error' }));
        } else {
            history.push(`/chats/${chats[i]._id}`);
        }
    }

    // Borrar anuncio
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [slug, setSlug] = useState(undefined);
    const deleteAdvertRequestHandler = slug => {
        setSlug(slug)
        setShowModalDelete(true);
    }
    const confirmDeleteAdvert = () => {
        setShowModalDelete(false);
        if (slug) {
            deleteAdvert(slug)
            .then(res => enqueueSnackbar(t('Advert SLUG deleted', {slug}), { variant: 'success', }))
            .catch(error => enqueueSnackbar(t('Error deleting advert ERROR', {error}), { variant: 'error', }));    
        } else {
            enqueueSnackbar(t('Error identifying advert to be deleted'), { variant: 'error', });    
        }
    };
    const cancelDeleteAdvert = () => {
        setSlug(undefined)
        setShowModalDelete(false);
    };
   
    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={logout}/>
            <Container className='Container'>
                <main className='Main__Section Published'>
                    <SectionHeader header={listType} login={login} session={session} totalCount={totalCount}/>
                    <AdvertList 
                        type='list' 
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={adverts}
                        session={session}
                        isLoading={isFetching}
                        onBookAdvert={bookAdvertHandler}
                        onSellAdvert={sellAdvertHandler}
                        onDeleteAdvert={deleteAdvertRequestHandler}
                        onFavoriteAdvert={favoriteAdvertHandler}
                        onSetCurrentPage={setCurrentPage}
                        onfetchIterateAdverts={fetchIterateAdvertsHandler}
                        onOpenChat={openChatHandler}
                    />
                </main>
                {   showModalDelete && 
                    <ModalConfirm   onConfirm={confirmDeleteAdvert} 
                                    onCancel={cancelDeleteAdvert} 
                                    visible={true} type='warning'
                                    title={t('Are you sure to delete the advert?')}
                    /> 
                }
            </Container>
            <Footer session={session} onLogout={logout} active={listType}/>
        </React.Fragment>
    );
}

