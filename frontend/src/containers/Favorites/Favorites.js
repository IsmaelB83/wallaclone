// NPM Modules
import React, { useState, useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Error from '../../components/Error';
// Own modules
import UserServices from '../../services/UserServices';
// Models
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default function Published (props) {

  // Listado de anuncios
  const [adverts, setAdverts] = useState([]);
  // Variables para el UI
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  // Load adverts
  const { jwt } = props.session;
  useEffect(() => {
    // Update UI
    setIsFetching(true);
    setError('');
    // Call API
    UserServices.getFavorites(jwt)
    .then(result => {
      setAdverts(result);
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(() => {
      setIsFetching(false);
    });
  }, [jwt]);

  // Delete favorite
  const deleteFavorite = (slug) => {
    props.setFavorite(slug, props.session.jwt)
    const i = adverts.findIndex(advert => advert.slug === slug);
    if (i >= 0) {
      const aux = [...adverts.slice(0, i), ...adverts.slice(i + 1)];
      setAdverts(aux);
    }
  }

  // Render
  return (
    <React.Fragment>
        <NavBar/>
        <Container className='Container__Fill'>
          <main className='Main__Section'>
            <div className='Catalog__Results'>
              { adverts.length > 0 && 
                <AdvertList 
                  type='list' 
                  adverts={adverts}
                  showEdit={false}
                  showFavorite={true}
                  onDeleteFavorite={deleteFavorite}
                  history={props.history}
                />
              }
            </div>
            { isFetching && <Loading text={'fetching data'}/> }
            { error &&  <Error error={error}/> }
          </main>
        </Container>
        <Footer/>
      </React.Fragment>
  );
}