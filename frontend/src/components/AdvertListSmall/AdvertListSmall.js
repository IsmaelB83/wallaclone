// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
// Components
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
export default function AdvertListSmall (props) {
    
    return(
        <section className='AdvertListSmall'>        
        { props.adverts.map((advert, index) => 
            <AdvertCardSmall    key={advert._id} 
                                _id={advert._id} 
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
            />
        )}
        </section>
    );
}

AdvertListSmall.propTypes = {
    adverts: PropTypes.arrayOf(Advert),
}