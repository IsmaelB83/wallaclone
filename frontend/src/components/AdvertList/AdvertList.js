// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
// Components
import AdvertCard from '../AdvertCard';
import AdvertCardSmall from '../AdvertCardSmall';
// Own modules
// Models
import Advert from '../../models/Advert';
// Assets
// CSS
import './styles.css';

// Dinamic render
const CARD_TYPES = {
    tiles: AdvertCard,
    list: AdvertCardSmall
};

/**
 * Functional component to render an advert card
 */
export default function AdvertList (props) {
    
    // Determina el tipo de Card a renderizar
    const Card = CARD_TYPES[props.type];
    return(
        <section className={`${props.type==='tiles'?'AdvertListTiles':'AdvertListDetail'}`}>
            {   props.adverts.map((advert, index) => 
                    <Card   key={index}
                            advert={advert} 
                            history={props.history}
                            showEdit={props.showEdit}
                            showFavorite={props.showFavorite}
                            showDeleteFavorite={props.showDeleteFavorite}
                            onBookAdvert={props.onBookAdvert}
                            onSellAdvert={props.onSellAdvert}
                            onDeleteAdvert={props.onDeleteAdvert}
                            onFavoriteAdvert={props.onFavoriteAdvert}
                    />
            )}
            { !props.adverts.length && <h2 className='Home__Subtitle'>No hay anuncios que cumplan con los criterios de búsqueda</h2> }
        </section>
);
}

AdvertCard.propTypes = {
    adverts: PropTypes.arrayOf(Advert) 
}

AdvertCardSmall.propTypes = { 
    adverts: PropTypes.arrayOf(Advert) 
}

