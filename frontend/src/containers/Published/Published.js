// NPM Modules
import React, { useState } from 'react';
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
    const { jwt } = props.session;
    const { enqueueSnackbar, buying, selling } = props;
    
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
                        <div className='Catalog__ResultsSelling'>
                            <p className='Catalog__Count'>{selling.length} anuncios en venta.</p>
                            <AdvertList 
                                type='list' 
                                edit={true} 
                                adverts={selling} 
                                showEdit={true}
                                showFavorite={false}
                                onBookAdvert={bookAdvert}
                                onSellAdvert={sellAdvert}
                                onDeleteAdvert={deleteAdvertRequest}
                                history={props.history}
                            />
                        </div>
                        <div className='Catalog__ResultsBuying'>
                            <p className='Catalog__Count'>{buying.length} anuncios en búsqueda.</p>
                            <AdvertList 
                                type='list' 
                                edit={true} 
                                adverts={buying} 
                                showEdit={true}
                                showFavorite={false}
                                onBookAdvert={bookAdvert}
                                onSellAdvert={sellAdvert}
                                onDeleteAdvert={deleteAdvertRequest}
                                history={props.history}
                            />
                        </div>
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