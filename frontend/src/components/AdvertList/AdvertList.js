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
    const { t } = props;

    // Determina el tipo de Card a renderizar
    const Card = CARD_TYPES[props.type];
    return(
        <section className={`${props.type==='tiles'?'AdvertListTiles':'AdvertListDetail'}`}>
            {   !props.isFetching && props.adverts.length > 0 &&
                props.adverts.map((advert, index) => 
                    <Card   key={index}
                            advert={advert} 
                            showEdit={props.showEdit}
                            showFavorite={props.showFavorite}
                            onBookAdvert={props.onBookAdvert}
                            onSellAdvert={props.onSellAdvert}
                            onDeleteAdvert={props.onDeleteAdvert}
                            onFavoriteAdvert={props.onFavoriteAdvert}
                    />
            )}
            { !props.isFetching && !props.adverts.length && <h2 className='Home__Subtitle'>{t('Sorry, we couldn\'t find any results matching the filter criteria')}</h2> }
            { props.isFetching && <LoadingList text={t('Loading adverts')}/> }
        </section>
);
}

function LoadingList (props) {
    return <div className='LoadingList'>
                <img src={imageSpinner} className='LoadingList__Spinner' alt='spinner'/>
                <h2 className='LoadingList__Text'>{props.text}</h2>
            </div>
}