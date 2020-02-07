// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// Material UI
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';
// Own modules
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Assets
import imgBuy from '../../assets/images/buy.png';
import imgSell from '../../assets/images/sell.png';
import imgReserved from '../../assets/images/reserved.png'
import imgSold from '../../assets/images/sold.png'
// CSS
import './styles.css';

/**
 * Functional component to render an advert card
 */
export default function AdvertCard (props) {

    // Render
    return(
        <article id={`adslug_${props.slug}`} className='AdvertCard'>
            <header className='AdvertCard__Header'>
                <img src={`${props.type==='buy'?imgBuy:imgSell}`} alt='avatar' />
                <div className='AdvertCard__HeaderTitle'>
                    <Link to={`/advert/display/${props.slug}`} className='AdvertCard__Link'><h2>{props.name}</h2></Link>
                    <Moment className='AdvertCard__Date' fromNow>{props.createdAt}</Moment>
                </div>
            </header>
            <div className='AdvertCard__Media'>
                <Link to={`/advert/display/${props.slug}`} className='AdvertCard__Link'>
                    <img src={props.photo} alt='caption'/>
                </Link>
                { props.booked && <img src={imgReserved} className='AdvertCard__Status' alt='reserved'/> }
                { props.sold && <img src={imgSold} className='AdvertCard__Status' alt='sold'/> }
                <p className='AdvertCard__Price'>
                    {props.price} 
                    <span className='AdvertCard__Currency'>€</span>
                </p>
                <p>Autor: {props.user.name}</p>
            </div>
            <div className='AdvertCard__Footer'>
                <div className='Ad__Tags'>
                    {   props.tags && 
                        props.tags.map((value,i) => {
                            return  <Chip
                                        key={i}
                                        size="small"
                                        label={value}
                                        className={`Ad__Tag Ad__Tag--${value}`}
                                    />
                        })
                    }
                </div>
                {   props.showFavorite && 
                    <button className='ButtonTransparent' onClick={()=>props.onFavoriteAdvert(props.slug)}>
                        { props.favorite && <FavoriteIcon className='FavoriteIcon FavoriteIcon--On'/> }
                        { !props.favorite && <FavoriteBorderIcon className='FavoriteIcon FavoriteIcon--Off'/> }
                    </button>
                }
            </div>
        </article>
    );
}

AdvertCard.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf([ADVERT_CONSTANTS.TYPE.BUY, ADVERT_CONSTANTS.TYPE.SELL]).isRequired,
}