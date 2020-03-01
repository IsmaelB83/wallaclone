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
export default function HeaderAdvertEdit(props) {

    const { t, mode } = props;
    const title = mode === 'edit' ? t('Edit Product') : t('New Product');
    const text_1 = mode === 'edit' ? t('Edit the product details and MORE') : t('Create the product details and MORE');
    const text_2 = mode === 'edit' ? t('You cant modify the favorites MORE') : t('From now on go to publish MORE');

    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{title}</h1> 
            </div>
            <p className='Text'>{text_1}</p>
            <p className='Text'>{text_2}</p>
        </div>
    );
}