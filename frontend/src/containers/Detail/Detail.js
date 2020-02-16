// NPM Modules
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
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
function Detail(props) {

    // Translate 
    const { t } = props;

    // Propiedades del index
    const { fetchAdvert, enqueueSnackbar } = props;
    const { slug } = props.match.params;

    // Load advert from API
    const [error, setError] = useState();
    const [advert, setAdvert] = useState();
    useEffect(() => {
        fetchAdvert(slug)
        .then ((advert) => setAdvert(advert))
        .catch((error) => setError(error));
    }, [slug, enqueueSnackbar, fetchAdvert]);

    // Marcar como vendido un anuncio
    const setSellAdvert = () => {
        props.sellAdvert(advert.slug)
        .then (ad => setAdvert({...advert, sold: ad.sold, booked: ad.booked,}))
        .catch(error => enqueueSnackbar(t('Error setting advert as sold ERROR', {error}), { variant: 'error' }));
    }

    // Marcar como reservado un anuncio
    const setBookAdvert = () => {
        props.bookAdvert(advert.slug)
        .then (ad => setAdvert({...advert, booked: ad.booked, sold: ad.sold}))
        .catch(error => enqueueSnackbar(t('Error setting advert as booked ERROR', {error}), { variant: 'error' }));
    }

    // Marcar como favorito un anuncio  
    const setFavoriteAdvert = () => {
        props.setFavorite(advert.slug)
        .then (ad => setAdvert({...advert, favorite: ad.favorite}))
        .catch(error=> enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));
    }

    // Borrar anuncio
    const [showModalDelete, setShowModalDelete] = useState(false);
    const deleteAdvertRequest = () => {
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
        setShowModalDelete(false);
    };

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container__Fill'>
                <main className='Main__Section Detail'>
                    { advert && 
                        <AdvertDetail
                            advert={advert}
                            showEdit={advert.user && props.session._id === advert.user._id}
                            showFavorite={advert.user && props.session._id !== advert.user_id}
                            onSellAdvert={setSellAdvert}
                            onBookAdvert={setBookAdvert}
                            onFavoriteAdvert={setFavoriteAdvert}
                            onDeleteAdvert={deleteAdvertRequest}
                        />
                    }
                    { props.isFetching && <Loading text={t('Loading advert')}/> }
                    { error &&  <Error error={error}/> }
                
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

AdvertDetail.propTypes = {
    isUpdating: PropTypes.bool,
    error: PropTypes.string,
}

export default withNamespaces()(Detail);