// NPM Modules
import React from 'react';
import Moment from 'react-moment';
import { withNamespaces } from 'react-i18next';
// Material UI
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DoneAllIcon from '@material-ui/icons/DoneAll';
// Components
// Own modules
import i18n from '../../../utils/i18n';
// Models
import { ADVERT_CONSTANTS as CONSTANTS } from '../../../models/Advert';
// Assets
// CSS
import './styles.css';


// Component to render a Chat panel
function CardChat(props) {

    const { t } = props;
    const status = props.sold?CONSTANTS.STATUS.SOLD:CONSTANTS.STATUS.BOOKED

    return (
        <article className='CardChat'>
            <figure className='CardChat__Figure'>
                <img className='CardChat__Img' src={props.thumbnail}></img>
                { (props.sold || props.booked) && <span className='CardChat__Type'><BookmarkBorderIcon/>{t(status)}</span> }
            </figure>
            <figcaption className='CardChat__Body'>
                <div className='CardChat__User'>
                    <p>{props.user.name}</p>
                    <Moment className='AdvertDetail__Date' locale={i18n.language} format='MMM Do YYYY'>{props.createdAt}</Moment>
                </div>
                <h3 className='CardChat__Title'>{`${props.name.substring(0,20)}${props.name.length>20?'...':''}`}</h3>
                <p className='CardChat__LastChat'><DoneAllIcon/>Esto es la ultima conversacion</p>    
            </figcaption>
        </article>
    );
}

export default withNamespaces()(CardChat)