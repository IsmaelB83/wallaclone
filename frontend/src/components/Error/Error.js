// NPM Modules
import React from 'react';
import { withNamespaces } from 'react-i18next';
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
function Error(props) {

    const { t } = props;
    
    const Error404 = () => 
        <React.Fragment>
            <img src={image404} alt="404" />
            <h1>{t('Oooppps! The page you are looking for was not found!')}</h1>
        </React.Fragment>

    const OtherError = () => 
        <React.Fragment>
            <h2>{t('Oooops! Something went wrong!')} </h2>
            <p>{props.error}</p>
            <h3>{t('Please, reload page. Or contact the admin.')}</h3>
        </React.Fragment>            

    return (<div className='Error'>{props.type==='404'?Error404():OtherError()}</div>);
}

export default withNamespaces()(Error);