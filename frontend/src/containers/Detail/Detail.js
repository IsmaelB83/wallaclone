// NPM Modules
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Material UI
import Container from '@material-ui/core/Container';
// Own Modules
// Models
import Advert from '../../models/Advert'
// Components
import AdvertDetail from '../../components/AdvertDetail';
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
export default function Detail(props) {

  // Propiedades del index
  const { fetchAdvert, enqueueSnackbar } = props;
  const { slug } = props.match.params;

  // Load advert from API
  const [error, setError] = useState();
  const [advert, setAdvert] = useState(Advert.emptyAdvert());
  useEffect(() => {
    fetchAdvert(slug)
    .then ((advert) => {
      setAdvert(advert);
    })
    .catch((error)=>{
      setError(error)
    });
  }, [slug, enqueueSnackbar, fetchAdvert]);

  // Marcar como vendido un anuncio
  const sellAdvert = () => {
    props.sellAdvert(advert.slug, props.session.jwt)
    .then (() => {
      setAdvert({...advert, sold: !advert.sold});
    })
    .catch(()=>{
      enqueueSnackbar('Error marcando anuncio como vendido', { variant: 'error' });
    });
  }
  
  // Marcar como reservado un anuncio
  const bookAdvert = () => {
    props.bookAdvert(advert.slug, props.session.jwt)
    .then (() => {
      setAdvert({...advert, booked: !advert.booked});
    })
    .catch(()=>{
      enqueueSnackbar('Error marcando anuncio como reservado', { variant: 'error' });
    });
  }
  
  // Marcar como favorito un anuncio  
  const setFavorite = () => {
    props.setFavorite(advert.slug, props.session.jwt)
    .then (() => {
      setAdvert({...advert, favorite: !advert.favorite});
    })
    .catch(()=>{
      enqueueSnackbar('Error marcando anuncio como favorito', { variant: 'error' });
    });
  }

  // Render
  return (
    <React.Fragment>
      <NavBar/>
      <Container>
        <main className='Main__Section'>
          { advert._id && 
            <AdvertDetail
              slug={advert.slug}
              name={advert.name} 
              description={advert.description}
              price={advert.price}
              type={advert.type} 
              photo={advert.photo} 
              tags={advert.tags} 
              createdAt={advert.createdAt}
              updatedAt={advert.updatedAt}
              booked={advert.booked}
              sold={advert.sold}
              user={advert.user}
              favorite={advert.favorite}
              showEdit={props.session._id === advert.user._id}
              showFavorite={props.session._id && props.session._id !== advert.user_id}
              onSellAdvert={sellAdvert}
              onBookAdvert={bookAdvert}
              onSetFavorite={setFavorite}
            >
            </AdvertDetail>
          }
            { props.isFetching && <Loading text={'fetching advert'}/> }
            { error &&  <Error error={error}/> }
        </main>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}

AdvertDetail.propTypes = {
  session: PropTypes.object,
  isUpdating: PropTypes.bool,
  error: PropTypes.string,
}