// NPM Modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertForm from '../../components/forms/AdvertForm';
import HeaderAdvertEdit from '../../components/headers/HeaderAdvertEdit';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
import Loading from '../../components/utils/Loading';
import Error from '../../components/error/Error';
// Models
import Advert, { EMPTY_ADVERT } from '../../models/Advert';
// Assets
// CSS
import './styles.css';


// Componente de sección editar anuncios
function Edit(props) {

    // Props destructuring
    const { enqueueSnackbar, fetchAdvert, mode, t} = props;
    const { slug } = props.match.params;
    const { isFetching, isUpdating, isCreating, error } = props.ui;

    // Load inicial
    const [ advert, setAdvert ] = useState();
    useEffect(() => {
        if (mode === 'edit') {
            fetchAdvert(slug)
            .then (advert => setAdvert(advert))
            .catch(error  => enqueueSnackbar(t('Error fetching advert ERROR', {error}), { variant: 'error' }));
        } else {
            setAdvert(new Advert(EMPTY_ADVERT))
        }
    }, [fetchAdvert, slug, mode, enqueueSnackbar, t])

    // Manejador del submit del formulario
    const submitAdvert = (inputs) => {
        // Creo un anuncio con los datos del estado y lo valido
        const newAdvert = new Advert(inputs);
        if (!newAdvert.isValid() || ( !inputs.file && !inputs.photo )) {
            enqueueSnackbar(t('Advert data is incomplete'), { variant: 'error' });
        } else {
            // Lanzando operacion al backend
            if (mode === 'create') {
                props.createAdvert(newAdvert)
                .then (res => enqueueSnackbar(t('Advert X created', { slug: res.slug}), { variant: 'success' }))
                .catch(error => enqueueSnackbar(t('Error creating advert ERROR', {error}), { variant: 'error' }));
            } else {
                props.editAdvert(newAdvert)
                .then (res => enqueueSnackbar(t('Advert X updated', {slug: res.slug}), { variant: 'success' }))
                .catch(error => enqueueSnackbar(t('Error updating advert ERROR', {error}), { variant: 'error' }));
            }
        } 
    }

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container'>
                <main className='Section__Wrapper Edit'>
                    <HeaderAdvertEdit mode={mode}/>
                    { advert &&
                        <AdvertForm noValidate 
                                    autoComplete='off' 
                                    className='Profile__Form'
                                    advert={advert}
                                    onSubmit={submitAdvert}
                                    tags={props.tags}
                        />
                    }
                    { isFetching && <Loading text={'fetching advert'}/> }
                    { ( isUpdating || isCreating ) && <Loading text={mode === 'edit' ? t('Trying to edit advert...') : t('Trying to create advert...') }/> }
                    { error && <Error error={error}/> }
                </main>
            </Container>
            <Footer session={props.session} onLogout={props.logout}/>
        </React.Fragment>
    );
}

Edit.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
}

export default withNamespaces()(Edit);