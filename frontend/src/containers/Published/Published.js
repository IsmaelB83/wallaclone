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
    const { enqueueSnackbar, fetchUserAdverts, published } = props;
    const { member } = props.match.params;
    const { _id, jwt } = props.session;
    
    // Seteo de anuncios inicia);
    const [adverts, setAdverts] = useState([]);
    useEffect(() => {
        if (member === _id) {
            setAdverts(published);
        } else {
            // Other user adverts
            fetchUserAdverts(member)
            .then(adverts => setAdverts(adverts))
            .catch(error => enqueueSnackbar(`Error cargando anuncios de ${_id}`, { variant: 'error' }));
        }
    }, [_id, member, fetchUserAdverts, enqueueSnackbar, published]);

    // Reservar producto
    const favoriteAdvert = (slug) => {
        props.setFavorite(slug, jwt)
        .then(advert => {
            const newAdverts = adverts.map(ad => {
                if (ad._id === advert._id) ad.favorite = advert.favorite;
                return ad;
            })
            setAdverts(newAdverts);
            props.enqueueSnackbar(`Anuncio ${advert.slug} añadido a favoritos`, { variant: 'success' })
        })
        .catch(error => props.enqueueSnackbar(`Error marcando favorito ${error}`, { variant: 'error' }));
    }

    // Marcar como reservado
    const bookAdvert = slug => {
        props.bookAdvert(slug, jwt)
        .then(advert => enqueueSnackbar(`Anuncio '${advert.slug}' reservado`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Error reservando anuncio ${error}`, { variant: 'error' }));
    };

    // Marcar como reservado
    const sellAdvert = slug => {
        props.sellAdvert(slug, jwt)
        .then(advert => enqueueSnackbar(`Anuncio '${advert.slug}' vendido`, { variant: 'success', }))
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

    // Modal Delete
    
    // Render
    return (
        <React.Fragment>
            <NavBar/>
                <Container className='Container__Fill'>
                <main className='Main__Section'>
                    <div className='Catalog__Results'>
                        <AdvertList 
                            type='list' 
                            adverts={adverts} 
                            showEdit={props.session._id && member === props.session._id}
                            showFavorite={props.session._id && member !== props.session._id}
                            onBookAdvert={bookAdvert}
                            onSellAdvert={sellAdvert}
                            onDeleteAdvert={deleteAdvertRequest}
                            onFavoriteAdvert={favoriteAdvert}
                            history={props.history}
                        />
                    </div>
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