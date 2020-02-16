// NPM Modules
import React, { useState, useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ModalConfirm from '../../components/ModalConfirm';
import AdvertList from '../../components/AdvertList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Published adverts section
export default function Published (props) {
    
    // Translate
    const { t } = props;

    // Destructure props
    const { enqueueSnackbar, fetchUserAdverts, setCurrentPage, fetchIterateAdverts } = props;
    const { start, end, totalCount } = props.lastCall;
    const { login } = props.match.params;
    const { currentPage, isFetching } = props.ui;
    const { adverts } = props;

    // Cargo anuncios del usuario solicitado
    useEffect(() => {
        fetchUserAdverts(login)
        .catch(error => enqueueSnackbar(t('Error loading USER adverts ERROR', {user: login, error}), { variant: 'error' }));
    }, []);

    // Paginación sobre la colección de anuncios
    const onFetchIterateAdverts = (direction) => {
        return fetchIterateAdverts(direction)
        .catch(error => enqueueSnackbar(t('Error iterating adverts ERROR', {error}), { variant: 'error' }));
    }

    // Favorito
    const favoriteAdvert = (slug) => {
        props.setFavorite(slug)
        .catch(error => props.enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));
    }

    // Reservado
    const bookAdvert = slug => {
        props.bookAdvert(slug)
        .catch(error => enqueueSnackbar(t('Error setting advert as booked ERROR', {error}), { variant: 'error' }));
    };

    // Vendido
    const sellAdvert = slug => {
        props.sellAdvert(slug)
        .catch(error => enqueueSnackbar(t('Error setting advert as sold ERROR', {error}), { variant: 'error', }));
    };
    
    // Borrar anuncio
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [slug, setSlug] = useState(undefined);
    const deleteAdvertRequest = slug => {
        setSlug(slug)
        setShowModalDelete(true);
    }
    const confirmDeleteAdvert = () => {
        setShowModalDelete(false);
        if (slug) {
            props.deleteAdvert(slug)
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
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container__Fill'>
                <main className='Main__Section'>
                    <AdvertList 
                        type='list' 
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={adverts}
                        showEdit={props.session.login && login === props.session.login}
                        showFavorite={props.session.login && login !== props.session.login}
                        isFetching={isFetching}
                        onBookAdvert={bookAdvert}
                        onSellAdvert={sellAdvert}
                        onDeleteAdvert={deleteAdvertRequest}
                        onFavoriteAdvert={favoriteAdvert}
                        onSetCurrentPage={setCurrentPage}
                        onfetchIterateAdverts={onFetchIterateAdverts}
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
            <Footer session={props.session} onLogout={props.logout}/>
        </React.Fragment>
    );
}