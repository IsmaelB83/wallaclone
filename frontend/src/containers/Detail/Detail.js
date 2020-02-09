// NPM Modules
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Material UI
import Container from '@material-ui/core/Container';
// Own Modules
// Models
import Advert from '../../models/Advert'
// Components
import AdvertDetail from '../../components/AdvertDetail';
import ModalConfirm from '../../components/ModalConfirm';
import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Error from '../../components/Error';
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default function Detail(props) {

    // Propiedades del index
    const { fetchAdvert, enqueueSnackbar } = props;
    const { slug } = props.match.params;

    // Load advert from API
    const [error, setError] = useState();
    const [advert, setAdvert] = useState(Advert.emptyAdvert());
    useEffect(() => {
        fetchAdvert(slug)
        .then ((advert) => setAdvert(new Advert(advert)))
        .catch((error) => setError(error));
    }, [slug, enqueueSnackbar, fetchAdvert]);

    // Marcar como vendido un anuncio
    const setSellAdvert = () => {
        props.sellAdvert(advert.slug, props.session.jwt)
        .then (ad => setAdvert({...advert, sold: ad.sold}))
        .catch(error => enqueueSnackbar(`Error vendiendo anuncio ${error}`, { variant: 'error' }));
    }

    // Marcar como reservado un anuncio
    const setBookAdvert = () => {
        props.bookAdvert(advert.slug, props.session.jwt)
        .then (ad => setAdvert({...advert, booked: ad.booked}))
        .catch(error => enqueueSnackbar(`Error marcando reservado ${error}`, { variant: 'error' }));
    }

    // Marcar como favorito un anuncio  
    const setFavoriteAdvert = () => {
        props.setFavorite(advert.slug, props.session.jwt)
        .then (ad => setAdvert({...advert, favorite: ad.favorite}))
        .catch(error=> enqueueSnackbar(`Error añadiendo a favorito ${error}`, { variant: 'error' }));
    }

    // Borrar anuncio
    const [showModalDelete, setShowModalDelete] = useState(false);
    const deleteAdvertRequest = () => {
        setShowModalDelete(true);
    }
    const confirmDeleteAdvert = () => {
        setShowModalDelete(false);
        if (slug) {
            props.deleteAdvert(slug, props.session.jwt)
            .then(advert => {
                enqueueSnackbar(`Anuncio '${advert.slug}' eliminado`, { variant: 'success', })  
                props.history.push('/');
            })
            .catch(error => enqueueSnackbar(`Error eliminando anuncio ${error}`, { variant: 'error', }));    
        } else {
            enqueueSnackbar('Error. No se ha identificado el anuncio a eliminar', { variant: 'error', });    
        }
    };
    const cancelDeleteAdvert = () => {
        setShowModalDelete(false);
    };

    // Render
    return (
        <React.Fragment>
            <NavBar/>
                <Container>
                    <main className='Main__Section'>
                        <AdvertDetail
                            advert={advert}
                            showEdit={advert.user && props.session._id === advert.user._id}
                            showFavorite={advert.user && props.session._id !== advert.user_id}
                            onSellAdvert={setSellAdvert}
                            onBookAdvert={setBookAdvert}
                            onFavoriteAdvert={setFavoriteAdvert}
                            onDeleteAdvert={deleteAdvertRequest}
                        />
                        { props.isFetching && <Loading text={'fetching advert'}/> }
                        { error &&  <Error error={error}/> }
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

AdvertDetail.propTypes = {
    session: PropTypes.object,
    isUpdating: PropTypes.bool,
    error: PropTypes.string,
}