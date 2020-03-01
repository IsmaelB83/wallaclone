// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
// Own Components
import NoResults from '../../utils/NoResults';
import CardList from '../../cards/CardList';
import CardTile from '../../cards/CardTile';
import Loading from '../../utils/Loading';
// Own modules
// Models
// Asset
// CSS
import './styles.css';

// Dinamic render
const CARD_TYPES = {
    tiles: CardTile,
    list: CardList
};

// Component to display an advert list (tiles o list mode)
export default function AdvertList (props) {
    
    // Translate
    const { onBookAdvert, onSellAdvert, onDeleteAdvert, onFavoriteAdvert, onOpenChat, onEditAdvert, t } = props;
    const { session, adverts, type, isLoading } = props;

    // Type of card to render
    const Card = CARD_TYPES[type];
    return(
        <section className={`${type==='tiles'?'AdvertListTiles':'AdvertListDetail'}`}>
            {   !isLoading && 
                adverts.length > 0 &&
                adverts.map((advert, index) => 
                    <Card   key={index}
                            advert={advert} 
                            isLogin={session._id !== undefined}
                            isMyAdvert={session._id === advert.user._id }
                            onBookAdvert={onBookAdvert}
                            onSellAdvert={onSellAdvert}
                            onDeleteAdvert={onDeleteAdvert}
                            onFavoriteAdvert={onFavoriteAdvert}
                            onOpenChat={onOpenChat}
                            onEditAdvert={onEditAdvert}
                    />
            )}
            { !isLoading && !adverts.length && <NoResults text={t('Sorry, we couldn\'t find any results matching the filter criteria')}/> }
            { isLoading && <Loading text={t('Loading adverts')}/> }
        </section>
    );
}

AdvertList.propTypes = {
    session: PropTypes.object,
    adverts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    onBookAdvert: PropTypes.func, 
    onSellAdvert: PropTypes.func, 
    onDeleteAdvert: PropTypes.func, 
    onFavoriteAdvert: PropTypes.func, 
    onOpenChat: PropTypes.func, 
    onEditAdvert: PropTypes.func,
    t: PropTypes.func.isRequired,
}