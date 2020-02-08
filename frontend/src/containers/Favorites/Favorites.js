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
  const { fetchFavorites } = props;
  useEffect(() => {
    // Update UI
    setIsFetching(true);
    setError('');
    // Call API
    fetchFavorites(jwt)
    .then(result => {
      setIsFetching(false);
      setAdverts(result);
    })
    .catch(error => {
      setIsFetching(false);
      setError(error);
    })
  }, [jwt, fetchFavorites]);

  // Delete favorite
  const deleteFavorite = (slug) => {
    props.setFavorite(slug, props.session.jwt)
    .then(() => {
      const i = adverts.findIndex(advert => advert.slug === slug);
      if (i >= 0) {
        const aux = [...adverts.slice(0, i), ...adverts.slice(i + 1)];
        setAdverts(aux);
      }  
    })
    .catch(error => setError(error));
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