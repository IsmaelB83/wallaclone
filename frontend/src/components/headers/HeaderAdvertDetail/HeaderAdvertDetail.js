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
export default function HeaderAdvertDetail(props) {
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Product detail')}</h1>
            </div>
            <p className='Text'>{props.t('In this section you can display MORE')}</p>
            <p className='Text'>{props.t('You can also add it to your favorites MORE')}</p>
        </div>
    );
}