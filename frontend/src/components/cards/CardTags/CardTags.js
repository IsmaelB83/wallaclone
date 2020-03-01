// Node
import React from 'react';
import PropTypes from 'prop-types';
// Material
// Own Components
import AdvertChip from '../../adverts/AdvertChip';
// CSS
import './styles.css';

// Functional component to render an advert tags
export default function CardTags (props) {

    const { tags } = props;

    return (
        <div className='CardTags'>
        {   tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/> ) }
        </div>
    )
}

CardTags.propTypes = {
    tags: PropTypes.array.isRequired,
}