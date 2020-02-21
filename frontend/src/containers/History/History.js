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
export default function History (props) {
    
    // Translate
    const { t } = props;

    // Destructure props
    const { enqueueSnackbar, fetchSoldHistory, setCurrentPage } = props;
    const { start, end, totalCount } = props.lastCall;
    const { currentPage, isFetching } = props.ui;
    const { adverts, session } = props;

    // Cargo anuncios del usuario solicitado
    useEffect(() => {
        fetchSoldHistory()
        .catch(error => enqueueSnackbar(t('Error loading USER sold history ERROR', {user: session.login, error}), { variant: 'error' }));
    }, [enqueueSnackbar, fetchSoldHistory, session, t]);

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
            <NavBar session={session} onLogout={props.logout}/>
            <Container className='Container'>
                <main className='Main__Section'>
                    <div className='Section__Content'>
                        <div className='Content__Title'>
                            <h1 className='Title'>Tus ventas</h1>
                            <p className='Counter'><span>{totalCount}</span> {t('products')}</p>
                        </div>
                        <p className='Text'>Aquí puedes hacer seguimiento de todo el histórico de ventas en tu usuario...</p>
                    </div>
                    <AdvertList 
                        type='list' 
                        start={start}
                        end={end}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        adverts={adverts}
                        session={session}
                        isLoading={isFetching}
                        onSellAdvert={sellAdvert}
                        onDeleteAdvert={deleteAdvertRequest}
                        onSetCurrentPage={setCurrentPage}
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
            <Footer session={session} onLogout={props.logout} active='History'/>
        </React.Fragment>
    );
}