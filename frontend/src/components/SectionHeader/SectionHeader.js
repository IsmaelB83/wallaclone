// NPM Modules
import React from 'react';
import { Link } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
// Material UI
import Button from '@material-ui/core/Button';
// Own components
// Models
// Own modules
// Assets
// CSS
import './styles.css';

// Dinamic render
const HEADERS = {
    favorites: withNamespaces()(FavoritesHeader),
    published: withNamespaces()(PublishedHeader),
    history: withNamespaces()(HistoryHeader),
};

// Componente para renderizar cualquiera de los section headers
export default function SectionHeader(props) {  
    const Content = HEADERS[props.header];
    return <Content {...props}/>
}

// Header favorites section
function FavoritesHeader(props) {
    return (
        <div className='Section__Content'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your sales')}</h1>
                <p className='Counter'><span>{props.totalCount}</span> {props.t('products')}</p>
            </div>
            <p className='Text'>{props.t('Here you have all the detail regarding all the products you sold/bought in Wallaclone')}</p>
        </div>
    );
}

// Header published section
function PublishedHeader(props) {
    // Identifies if we are looking at the user logged in published section
    const user = props.session.login && props.login === props.session.login;
    return (
        <div className='Section__Content'>
            <div className='Content__Title'>
                { user && <h1 className='Title'>{props.t('Your Products')}</h1> }
                { !user && <h1 className='Title'>{props.t('Products published by')} <i>{props.login}</i></h1> } 
                <p className='Counter'><span>{props.totalCount}</span> {props.t('products')}</p>
            </div>
            {  user &&
                <React.Fragment>
                    <p className='Text'>{props.t('In this section you can manage MORE')}</p>
                    <Button className='Button__AddProduct' variant='contained' color='primary' component={Link} to='/advert/create'>
                        {props.t('Add product')}
                    </Button>
                </React.Fragment>
            }
            { !user &&  <p className='Text'>{props.t('Have a look to all the user MORE')}</p> }
        </div>
    );
}

// Header history section
function HistoryHeader(props) {
    return (
        <div className='Section__Content'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your favorites')}</h1>
                <p className='Counter'><span>{props.totalCount}</span> {props.t('products')}</p>
            </div>
            <p className='Text'>{props.t('Here you can follow up all the products that you have included in your favorites')}</p>
        </div>
    );
}