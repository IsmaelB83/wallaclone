// NPM Modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { Link } from "react-router-dom";
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
                    <div className='Section__Content'>
                        <div className='Content__Title'>
                            <h1 className='Title'>Edita anuncio</h1>
                        </div>
                        <p className='Text'>Edite los datos de su anuncio y pulse en guardar para hacerlos permanentes... </p>
                        <p className='Text'>Desde esta sección no puede modificar las propiedades <b>vendido</b> y <b>reservado</b>. 
                            Para ello puede acudir a la sección <Link to={`/published/${props.session.login}`}>publicados</Link> o
                            al <Link to={`/advert/${advert && advert.slug}`}>detalle</Link> del anuncio.</p>
                    </div>
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