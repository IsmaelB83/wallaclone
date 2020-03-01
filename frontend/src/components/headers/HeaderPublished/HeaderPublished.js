// NPM Modules
import React from 'react';
import { Link } from "react-router-dom";
// Material UI
import Button from '@material-ui/core/Button';
// Own components
// Models
// Own modules
// Assets
// CSS
import '../styles.css';


// Header published section
export default function HeaderPublished(props) {
    // Identifies if we are looking at the user logged in published section
    const user = props.session.login && props.login === props.session.login;
    return (
        <div className='Section__Header'>
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