// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// Material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
// Own Modules
// Models
// Components
// Assets
import imgReserved from '../../assets/images/reserved.png'
import imgSold from '../../assets/images/sold.png'
// CSS
import './styles.css';

/**
 * Main App
 */
export default function AdvertDetail(props) {

  // Render
  return (
        <article id={`adslug_${props.slug}`} className='AdvertDetail'>
            <div className='AdvertDetail__Main'>
                <header className='AdvertDetail__Header'>
                    <h1>{props.name}</h1>
                    <img className='Caption' src={props.photo} alt='caption'/>
                    { !props.sold && props.booked && <img src={imgReserved} className='AdvertCard__Status' alt='reserved'/> }
                    { props.sold && <img src={imgSold} className='AdvertCard__Status' alt='sold'/> }
                </header>
                <div className='AdvertDetail__Content'>
                    <h3 className='AdvertDetail__Type'>{props.type==='buy'?'Compro':'Vendo'}</h3>
                    <div className='AdvertDetail__Description'>
                        <p>{props.description}</p>
                    </div>
                    <div className='AdvertDetail__Tags'>
                    {   props.tags.map((value,i) => {
                            return  <Chip
                                        key={i}
                                        size="small"
                                        label={value}
                                        className={`Ad__Tag Ad__Tag--${value}`}
                                    />
                        })
                    }
                    </div>
                    <div className='AdvertDetail__Actions'>
                    {   props.showFavorite && 
                        <Button type='button' 
                            variant='contained' 
                            color='secondary' 
                            startIcon={<FavoriteIcon className={`FavoriteIcon FavoriteIcon--${props.favorite?'On':'White'}`}/>} 
                            className='ButtonWallakeep ButtonWallakeep__Green'
                            onClick={props.onSetFavorite}>
                            Favorito
                        </Button>
                    }
                    {   props.showEdit && 
                        <React.Fragment>
                            <Link to={`/advert/edit/${props.slug}`}>
                                <Button type='button' 
                                        variant='contained' 
                                        color='secondary' 
                                        startIcon={<EditIcon />} 
                                        className='ButtonWallakeep ButtonWallakeep__Green'>
                                        Editar
                                </Button>
                            </Link>
                            <Button type='button' 
                                    variant='contained' 
                                    className='ButtonWallakeep ButtonWallakeep__Blue' 
                                    disabled={props.sold || props.isUpdating} 
                                    onClick={props.onBookAdvert}>
                                    {!props.booked?'Reservar':'Anular reserva'}
                            </Button>
                            <Button type='button' 
                                    variant='contained' 
                                    className='ButtonWallakeep ButtonWallakeep__Red' 
                                    disabled={props.isUpdating} 
                                    onClick={props.onSellAdvert}>
                                    {!props.sold?'Vendido':'Anular venta'}
                            </Button>
                        </React.Fragment>
                    }
                    </div>
                </div>
            </div>
            <div className='AdvertDetail__Footer'>
                <div className='AdvertDetail__Price'>
                    <p className='Text'>Precio</p>
                    <p className='Price'>{props.price} <span>€</span></p>
                </div>
                <Moment className='AdvertDetail__Date' fromNow>{props.createdAt}</Moment>
            </div>
        </article>
  );
}

AdvertDetail.propTypes = {
  advert: PropTypes.object,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
}