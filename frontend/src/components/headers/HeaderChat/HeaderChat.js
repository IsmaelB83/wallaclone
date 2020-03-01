// NPM Modules
import React from 'react';
// Material UI
// Own components
// Models
// Own modules
// Assets
// CSS
import '../styles.css';
import './styles.css';


// Header favorites section
export default function HeaderChat(props) {
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your chats')}</h1>
            </div>
            <p className='Text'>{props.t('In this section you can manage all the conversations you have with other members of Wallaclone')}</p>
        </div>
    );
}