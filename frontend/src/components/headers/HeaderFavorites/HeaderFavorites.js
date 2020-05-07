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
export default function HeaderFavorites(props) {
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your favorites')}</h1>
                <p className='Counter'><span>{props.totalCount}</span> {props.t('products')}</p>
            </div>
            <p className='Text'>{props.t('Here you have all the detail regarding all the products you sold/bought in Wallaclone')}</p>
        </div>
    );
}