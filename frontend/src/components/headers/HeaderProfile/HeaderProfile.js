// NPM Modules
import React from 'react';
// Material UI
// Own components
// Models
// Own modules
// Assets
// CSS
import '../styles.css';


// Header favorites section
export default function HeaderProfile(props) {
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your user profile')}</h1>
            </div>
            <p className='Text'>{props.t('From this section you can modify your profile MORE')}</p>
        </div>
    );
}