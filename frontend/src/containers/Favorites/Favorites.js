// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Published section
function Favorites (props) {
    
    // Translate
    const { t } = props;

    // Destructuring index props
    const { enqueueSnackbar, setFavorite, setCurrentPage, fetchFavorites } = props;
    const { start, end, totalCount} = props.lastCall;
    const { adverts } = props;
    const { currentPage, isFetching } = props.ui;

    // Cargo favoritos del usuario
    useEffect(() => {
        fetchFavorites()
        .catch(error => enqueueSnackbar(t('Error loading favorites ERROR', {error}), { variant: 'error' }));
    }, []);

    // Delete favorite
    const deleteFavorite = slug => {
        setFavorite(slug)
        .catch(error => enqueueSnackbar(t('Error adding advert to favorite ERROR', {error}), { variant: 'error' }));
    }
    
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
                        showEdit={false}
                        showFavorite={true}
                        isFetching={isFetching}
                        onFavoriteAdvert={deleteFavorite}
                        onSetCurrentPage={setCurrentPage}
                    />
                </main>
            </Container>
            <Footer session={props.session} onLogout={props.logout}/>
        </React.Fragment>
    );
}

export default withNamespaces()(Favorites);