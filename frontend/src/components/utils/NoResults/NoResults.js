// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Assets
import imageNoResults from '../../../assets/images/noresults.png';
// CSS
import './styles.css';
// Assets

// Component to display a loading spinner
export default function NoResults(props) {
    
    return (
        <div className='NoResults'>
            <h2 className='NoResults__Title'>{props.t('No results found')}</h2>
            <img className='NoResults__Image' src={imageNoResults} alt='no results found'/>
            <p className='NoResults__Text'>{props.text}</p>
        </div>
    );
}