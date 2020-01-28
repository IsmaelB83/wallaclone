// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Assets
import imageSpinner from '../../assets/images/spinner.gif';
// CSS
import './styles.css';
// Assets

/**
* Component para el footer (functional component)
*/
export default function Loading(props) {
    
    return (
        <div className='LoadingSmall'>
            <img src={imageSpinner} className='LoadingSmall__Spinner' alt='spinner'/>
            <h2 className='LoadingSmall__Text'>{props.text}</h2>
        </div>
    );
}