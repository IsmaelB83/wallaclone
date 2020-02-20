// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Assets
import image404 from '../../assets/images/404.png';
import imageError from '../../assets/images/warning.png';
// CSS
import './styles.css';
// Assets


// Component para el display de error (functional component)
export default function Error(props) {

    const { t } = props;
    
    const Error404 = () => 
        <div className='Error'>
            <img className='Error404' src={image404} alt="404" />
            <h1>{t('Oooppps! The page you are looking for was not found!')}</h1>
        </div>

    const OtherError = () => 
        <div className='Error'>
            <img src={imageError} alt="error" />
            <h2>{t('Oooops! Something went wrong!')} </h2>
            <p>{props.error}</p>
            <h3>{t('Please, reload page. Or contact the admin.')}</h3>
        </div>            

    return (<div className='Error'>{props.type==='404'?Error404():OtherError()}</div>);
}