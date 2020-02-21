// NPM Modules
import React from 'react';
import Moment from 'react-moment';
import { withNamespaces } from 'react-i18next';
// Material UI
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import DoneIcon from '@material-ui/icons/Done';
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

    // Destructure props
    const { id, active, chat, owner } = props;
    const { onChatSelected, t } = props;
    const status = chat.advert.sold?CONSTANTS.STATUS.SOLD:CONSTANTS.STATUS.BOOKED

    const clickHandler = () => onChatSelected(id);

    return (
        <article className={`CardChat ${active?'CardChat--active':''}`} onClick={clickHandler}>
            <figure className='CardChat__Figure'>
                <img className='CardChat__Img' src={chat.advert.thumbnail} alt='thumbnail'></img>
                { (chat.advert.sold || chat.advert.booked) && <span className='CardChat__Type'><BookmarkBorderIcon/>{t(status)}</span> }
            </figure>
            <figcaption className='CardChat__Body'>
                <div className='CardChat__User'>
                    <p>{owner.name}</p>
                    <Moment className='AdvertDetail__Date' locale={i18n.language} format='MMM Do YYYY'>{chat.createdAt}</Moment>
                </div>
                <h3 className='CardChat__Title'>{`${chat.advert.name.substring(0,20)}${chat.advert.name.length>20?'...':''}`}</h3>
                <p className='CardChat__LastChat'>
                    <DoneAllIcon/>{t('All messages read')}
                </p>    
            </figcaption>
        </article>
    );
}

export default withNamespaces()(CardChat)