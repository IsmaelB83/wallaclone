// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Assets
import image404 from '../../assets/images/404.png';
// CSS
import './styles.css';
// Assets

/**
* Component para el display de error (functional component)
*/
export default function Error(props) {

    const Error404 = () => 
        <React.Fragment>
            <img src={image404} alt="404 not found..." />
            <h1>Oooppps! The page you are looking for was not found!</h1>
        </React.Fragment>

    const OtherError = () => 
        <React.Fragment>
            <h2>Oooops! Something went wrong: </h2>
            <p>{props.error}</p>
            <h3>Please, reload page. Or contact the admin.</h3>
        </React.Fragment>            

    return (<div className='Error'>{props.type==='404'?Error404():OtherError()}</div>);
}

