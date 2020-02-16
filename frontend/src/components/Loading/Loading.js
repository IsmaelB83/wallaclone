// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Assets
import imageSpinner from '../../assets/images/spinner.gif';
// CSS
import './styles.css';
// Assets

// Component to display a loading panel
export default function Loading(props) {
    
    return (
        <div className='Loading'>
            <img src={imageSpinner} className='Loading__Spinner' alt='spinner'/>
            <h2 className='Loading__Text'>{props.text}</h2>
        </div>
    );
}