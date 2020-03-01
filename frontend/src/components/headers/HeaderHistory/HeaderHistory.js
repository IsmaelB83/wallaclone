// NPM Modules
import React from 'react';
// Material UI
// Own components
// Models
// Own modules
// Assets
// CSS
import '../styles.css';


// Header history section
export default function HeaderHistory(props) {
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your favorites')}</h1>
                <p className='Counter'><span>{props.totalCount}</span> {props.t('products')}</p>
            </div>
            <p className='Text'>{props.t('Here you can follow up all the products that you have included in your favorites')}</p>
        </div>
    );
}