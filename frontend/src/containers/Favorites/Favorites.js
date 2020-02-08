// NPM Modules
import React from 'react';
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

/**
* Main App
*/
export default function Published (props) {
    
    // Destructuring index props
    const { enqueueSnackbar, setFavorite, favorites} = props;
    
    // Delete favorite
    const deleteFavorite = slug => {
        setFavorite(slug, props.session.jwt)
        .then(advert => enqueueSnackbar(`Anuncio ${advert.slug} eliminado de favoritos`, { variant: 'success' }))
        .catch(error => enqueueSnackbar(`Error eliminando favorito ${error}`, { variant: 'error' }));
    }
    
    // Render
    return (
        <React.Fragment>
            <NavBar/>
            <Container className='Container__Fill'>
                <main className='Main__Section'>
                    <div className='Catalog__Results'>
                        <AdvertList 
                            type='list' 
                            adverts={favorites}
                            showEdit={false}
                            showFavorite={true}
                            onDeleteFavorite={deleteFavorite}
                            history={props.history}
                            />
                    </div>
                </main>
            </Container>
            <Footer/>
        </React.Fragment>
        );
    }