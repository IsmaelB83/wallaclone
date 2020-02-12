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

/**
* Main App
*/
export default function Published (props) {
    
    // Destructure props
    const { enqueueSnackbar, fetchUserAdverts, setCurrentPage, fetchIterateAdverts } = props;
    const { start, end, totalCount } = props.lastCall;
    const { member } = props.match.params;
    const { currentPage, isFetching } = props.ui;
    const { jwt } = props.session;
    const { adverts, session } = props;

    // Cargo anuncios del usuario solicitado
    useEffect(() => {
        fetchUserAdverts(member)
        .then(response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch(error => enqueueSnackbar(`Error cargando anuncios de ${member}`, { variant: 'error' }));
    }, []);

    // Paginación sobre la colección de anuncios
    const onFetchIterateAdverts = (direction) => {
        return fetchIterateAdverts(direction)
        .then (response => enqueueSnackbar(`Resultados ${response.start + 1} a ${response.end + 1} cargados del total de ${response.totalCount}.`, { variant: 'info' }))
        .catch(error =>{
            debugger;
            enqueueSnackbar(`Error obteniendo anuncios ${error}`, { variant: 'error' })
        } );
    }

    // Reservar producto
    const favoriteAdvert = (slug) => {
        props.setFavorite(slug, jwt)
        .then(advert => {
            const newAdverts = adverts.map(ad => {
                if (ad._id === advert._id) ad.favorite = advert.favorite;
                return ad;
            })
            props.enqueueSnackbar(`Anuncio ${advert.slug} ${advert.favorite?'añadido a':'eliminado de'} favoritos`, { variant: 'success' })
        })
        .catch(error => props.enqueueSnackbar(`Error marcando favorito ${error}`, { variant: 'error' }));
    }

    // Marcar como reservado
    const bookAdvert = slug => {
        props.bookAdvert(slug, jwt)
        .then(advert => enqueueSnackbar(`Anuncio ${advert.slug} marcado como ${advert.booked?'reservado':'disponible'}`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Error reservando anuncio ${error}`, { variant: 'error' }));
    };

    // Marcar como reservado
    const sellAdvert = slug => {
        props.sellAdvert(slug, jwt)
        .then(advert => enqueueSnackbar(`Anuncio ${advert.slug} marcado como ${advert.booked?'vendido':'disponible'}`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Error vendiendo anuncio ${error}`, { variant: 'error', }));
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
            props.deleteAdvert(slug, jwt)
            .then(advert => enqueueSnackbar(`Anuncio '${advert.slug}' eliminado`, { variant: 'success', }))
            .catch(error => enqueueSnackbar(`Error eliminando anuncio ${error}`, { variant: 'error', }));    
        } else {
            enqueueSnackbar('Error. No se ha identificado el anuncio a eliminar', { variant: 'error', });    
        }
    };
    const cancelDeleteAdvert = () => {
        setSlug(undefined)
        setShowModalDelete(false);
    };
   
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
                        showEdit={props.session._id && member === props.session._id}
                        showFavorite={props.session._id && member !== props.session._id}
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
                                    title='¿Está seguro de borrar el anuncio?'
                    /> 
                }
            </Container>
            <Footer/>
        </React.Fragment>
    );
}