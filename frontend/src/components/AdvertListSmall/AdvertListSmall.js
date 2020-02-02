// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
// Components
import AdvertCardSmall from '../AdvertCardSmall';
// Own modules
// Models
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
                                price={advert.price}
                                type={advert.type} 
                                photo={advert.photo} 
                                tags={advert.tags} 
                                createdAt={advert.createdAt}
                                updatedAt={advert.updatedAt}
                                booked={advert.booked}
                                sold={advert.sold}
                                user={advert.user}
                                history={props.history}
            />
        )}
        </section>
    );
}

AdvertListSmall.propTypes = {
    adverts: PropTypes.arrayOf(Object),
}