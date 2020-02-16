// NPM Modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertEditForm from '../../components/AdvertEditForm';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
// Models
import Advert, { EMPTY_ADVERT } from '../../models/Advert';
// Assets
// CSS
import './styles.css';


// Componente de sección editar anuncios
function Edit(props) {

    // Props destructuring
    const { mode, t} = props;
    const { isFetching, isUpdating, isCreating, error } = props.ui;

    // Load inicial
    const [ advert, setAdvert ] = useState();
    useEffect(() => {
        if (mode === 'edit') {
            props.fetchAdvert(props.match.params.slug)
            .then (advert => setAdvert(advert))
            .catch(error  => null);
        } else {
            setAdvert(new Advert(EMPTY_ADVERT))
        }
    }, [mode])

    // Manejador del submit del formulario
    const submitAdvert = (inputs) => {
        // Creo un anuncio con los datos del estado y lo valido
        const newAdvert = new Advert(inputs);
        if (!newAdvert.isValid() || ( !inputs.file && !inputs.photo )) {
            props.enqueueSnackbar(t('Advert data is incomplete'), { variant: 'error' });
        } else {
            // Lanzando operacion al backend
            if (mode === 'create') {
                props.createAdvert(newAdvert)
                .then (res => props.enqueueSnackbar(t('Advert X created', { slug: res.slug}), { variant: 'success' }))
                .catch(error => props.enqueueSnackbar(t('Error creating advert ERROR', {error}), { variant: 'error' }));
            } else {
                props.editAdvert(newAdvert)
                .then (res => props.enqueueSnackbar(t('Advert X updated', {slug: res.slug}), { variant: 'success' }))
                .catch(error => props.enqueueSnackbar(t('Error updating advert ERROR', {error}), { variant: 'error' }));
            }
        } 
    }

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container__Fill'>
                <main className='Main__Section Edit'>
                    { advert &&
                        <AdvertEditForm noValidate 
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