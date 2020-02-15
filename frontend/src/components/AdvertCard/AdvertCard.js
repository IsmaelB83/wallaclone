// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../utils/i18n';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// Material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
// Own components
import AdvertChip from '../AdvertChip';
// Own modules
// Models
import Advert, { ADVERT_CONSTANTS } from '../../models/Advert';
// Assets
// CSS
import './styles.css';


/**
 * Functional component to render an advert card
 */
export default function AdvertCard (props) {

    // Props destructuring
    const { slug, name, photo, tags, price, sold, booked, type, favorite, user, createdAt } = props.advert;

    // Render
    return(
        <article id={`adslug_${slug}`} className='AdvertCard'>
            <header className='AdvertCard__Header'>
                <div className='AdvertCard_Chips'>
                    <AdvertChip type='type' value={type}/>
                    { ( sold || booked ) && <AdvertChip type='status' value={sold?ADVERT_CONSTANTS.STATUS.SOLD:ADVERT_CONSTANTS.STATUS.BOOKED}/> } 
                </div>
                <Link to={`advert/${slug}`}><img src={photo} alt='caption'/></Link>
            </header>
            <div className='AdvertCard__Content'>
                <div className='AdvertCard__ContentHeader'>
                    <Link to={`advert/${slug}`} className='AdvertCard__Title'><h2>{name}</h2></Link>
                    <Moment className='AdvertCard__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
                </div>
                <div className='AdvertCard__ContentChips'>
                {   tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/> ) }
                </div>
            </div>
            <div className='AdvertCard__Footer'>
                <p className='AdvertCard__Price'>{price} <span className='AdvertCard__Currency'>€</span></p>
                <div className='AdvertCard__Author'>
                    <Link to={`published/${user.login}`} className='AdvertCard__Link'><p>{user.name}</p></Link>
                </div>
                <div className='AdvertCard__Favorite'>
                    <button className='ButtonTransparent' onClick={props.setFavoriteAdvert}>
                        <FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'Off'}`}/>
                    </button>
                </div>
            </div>
        </article>
    );
}

AdvertCard.propTypes = {
    advert: PropTypes.instanceOf(Advert).isRequired
}