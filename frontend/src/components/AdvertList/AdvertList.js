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

/**
 * Functional component to render an advert card
 */
export default function AdvertList (props) {
    
    return(
        <section className={`${props.type==='tiles'?'AdvertListTiles':'AdvertListDetail'}`}>
        { props.adverts.map((advert, index) => 
            <React.Fragment>
            { props.type==='tiles' &&
                <AdvertCard key={advert._id} 
                            id={advert._id}
                            slug={advert.slug}
                            name={advert.name} 
                            description={advert.description}
                            price={advert.price}
                            type={advert.type} 
                            photo={advert.photo} 
                            tags={advert.tags} 
                            createdAt={advert.createdAt}
                            booked={advert.booked}
                            sold={advert.sold}
                            user={advert.user}
                            favorite={advert.favorite}
                            history={props.history}
                            edit={props.edit}
                />
            }
            { props.type==='list' &&
                <AdvertCardSmall    key={advert._id} 
                                    id={advert._id}
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
                                    history={props.history}
                                    edit={props.edit}
                                    onDeleteFavorite={props.onDeleteFavorite}
                />
            }
            </React.Fragment>
        )}
        </section>
    );
}

AdvertCard.propTypes = {
    adverts: PropTypes.arrayOf(Advert),
}