// NPM Modules
import React, { useState, useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertList from '../../components/AdvertList';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Error from '../Error';
// Own modules
import AdvertServices from '../../services/AdvertServices';
import { getAdvertsByType } from '../../store/selectors';
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default function Published (props) {

  // Listado de anuncios
  const [selling, setSelling] = useState([]);
  const [buying, setBuying] = useState([]);
  // Variables para el UI
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  // Load adverts
  const { _id } = props.session;
  useEffect(() => {
    // Update UI
    setIsFetching(true);
    setError('');
    // Call API
    AdvertServices.getAdvertsByUser(_id)
    .then(adverts => {
      // Set Adverts
      setSelling(getAdvertsByType(adverts, ADVERT_CONSTANTS.TYPE.SELL));
      setBuying(getAdvertsByType(adverts, ADVERT_CONSTANTS.TYPE.BUY));
    })
    .catch(error => {
      setError(error.message);
    })
    .finally(() => {
      setIsFetching(false);
    });
  }, [_id]);

  // Render
  return (
    <React.Fragment>
        <NavBar/>
        <Container className='Container__Fill'>
          <main className='Main__Section'>
            <div className='Catalog__Results'>
              { selling.length > 0 &&
                <div className='Catalog__ResultsSelling'>
                  <p className='Catalog__Count'>{selling.length} anuncios en venta.</p>
                  <AdvertList type='list' edit={true} adverts={selling} history={props.history}/>
                </div>
              }
              { buying.length > 0 &&
                <div className='Catalog__ResultsBuying'>
                  <p className='Catalog__Count'>{buying.length} anuncios en búsqueda.</p>
                  <AdvertList type='list' edit={true} adverts={buying} history={props.history}/>
                </div>
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