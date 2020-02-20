// NPM Modules
import React from 'react';
// Material UI
// Own Components
import { CardListActions, CardTileActions } from '../cards';
// Own modules
// Models
// Asset
import imageSpinner from '../../assets/images/spinner.gif';
// CSS
import './styles.css';

// Dinamic render
const CARD_TYPES = {
    tiles: CardTileActions,
    list: CardListActions
};

// Component to display an advert list (tiles o list mode)
export default function AdvertList (props) {
    
    // Translate
    const { onBookAdvert, onSellAdvert, onDeleteAdvert, onFavoriteAdvert } = props;
    const { session, adverts, type, text, isFetching, t } = props;

    // Determina el tipo de Card a renderizar
    const Card = CARD_TYPES[type];
    return(
        <section className={`${type==='tiles'?'AdvertListTiles':'AdvertListDetail'}`}>
            {   !isFetching && adverts.length > 0 &&
                adverts.map((advert, index) => 
                    <Card   key={index}
                            advert={advert} 
                            isLogin={session._id !== undefined}
                            isMyAdvert={session._id === advert.user._id }
                            onBookAdvert={onBookAdvert}
                            onSellAdvert={onSellAdvert}
                            onDeleteAdvert={onDeleteAdvert}
                            onFavoriteAdvert={onFavoriteAdvert}
                    />
            )}
            { !isFetching && !adverts.length && <h2 className='Home__Subtitle'>{t('Sorry, we couldn\'t find any results matching the filter criteria')}</h2> }
            { isFetching && <LoadingList text={t('Loading adverts')}/> }
        </section>
);
}

function LoadingList (props) {
    return <div className='LoadingList'>
                <img src={imageSpinner} className='LoadingList__Spinner' alt='spinner'/>
                <h2 className='LoadingList__Text'>{props.text}</h2>
            </div>
}