// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// Material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
// Own Components
import AdvertChip from '../AdvertChip';
// Own Modules
// Models
import Advert, { ADVERT_CONSTANTS } from '../../models/Advert';
// Components
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default function AdvertDetail(props) {

    // Props destructuring
    const { slug, name, description, photo, tags, price, sold, booked, type, favorite, user, createdAt } = props.advert;

    // Render
    return (
        <article id={`adslug_${slug}`} className='AdvertDetail'>
            <div className='AdvertDetail__Main'>
                <header className='AdvertDetail__Header'>
                    <h1>{name}</h1>
                    <img className='Caption' src={photo} alt='caption'/>
                    { ( sold || booked ) && <AdvertChip type='status' value={sold?ADVERT_CONSTANTS.STATUS.SOLD:ADVERT_CONSTANTS.STATUS.BOOKED}/> } 
                </header>
                <div className='AdvertDetail__Content'>
                    <h3 className='AdvertDetail__Type'>{type==='buy'?'Compro':'Vendo'}</h3>
                    <div className='AdvertDetail__Description'>
                        <p>{description}</p>
                    </div>
                    <div className='AdvertDetail__Tags'>
                    {   tags.map((value,i) => <AdvertChip type='tag' value={value}/>) }
                    </div>
                    <div className='AdvertDetail__Actions'>
                    {   props.showFavorite && 
                        <Button type='button' 
                            variant='contained' 
                            color='secondary' 
                            startIcon={<FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'White'}`}/>} 
                            className='ButtonWallakeep ButtonWallakeep__Green'
                            onClick={props.onSetFavorite}>
                            Favorito
                        </Button>
                    }
                    {   props.showEdit && 
                        <React.Fragment>
                            <Link to={`/advert/edit/${slug}`}>
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
                                    disabled={sold || props.isUpdating} 
                                    onClick={props.onBookAdvert}>
                                    {!booked?'Reservar':'Anular reserva'}
                            </Button>
                            <Button type='button' 
                                    variant='contained' 
                                    className='ButtonWallakeep ButtonWallakeep__Red' 
                                    disabled={props.isUpdating} 
                                    onClick={props.onSellAdvert}>
                                    {!sold?'Vendido':'Anular venta'}
                            </Button>
                        </React.Fragment>
                    }
                    </div>
                </div>
            </div>
            <div className='AdvertDetail__Footer'>
                <div className='AdvertDetail__Price'>
                    <p className='Text'>Precio</p>
                    <p className='Price'>{price} <span>€</span></p>
                </div>
                <Moment className='AdvertDetail__Date' fromNow>{createdAt}</Moment>
            </div>
        </article>
    );
}

AdvertDetail.propTypes = {
  advert: PropTypes.instanceOf(Advert).isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
}