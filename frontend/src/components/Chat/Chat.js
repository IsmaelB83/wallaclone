// Node
import React, { useContext } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
// Material
import SendIcon from '@material-ui/icons/Send';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// Own components
import CardAvatar from '../cards/CardAvatar/CardAvatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// Own modules
import { Context } from '../withWebSocketChat/';

// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
function Chat(props) {

    // Destructure props
    const { chat, user, t } = props;

    let a = moment();

    // Contexto de interacción con server de chat
    const chatContext = useContext(Context);

    // Advert Owner
    let owner = user;
    let online = false;
    if (chat.users.length > 0) {
        owner = user._id === chat.users[0]._id ? chat.users[1] : chat.users[0];
        online = chatContext.online.indexOf(owner.login) >= 0 ? true : false;
    }

    // Render
    return (
        <section className='Chat'>
            <div className='Chat__User'>
                <KeyboardBackspaceIcon className='Chat__ClickBack' onClick={props.onClickBack}/>
                <CardAvatar size='large' avatar={owner.avatar} login={owner.login} name={owner.name} />
                <span className={`Chat__Status ${online?'Chat__Status--online':''}`}><FiberManualRecordIcon/>{online?'online':'offline'}</span>
            </div>
            <div className='Chat__Messages'>
            {   chat.messages && 
                chat.messages.map((message, index) => {
                    const b = moment(message.date);
                    const days = b.diff(a, 'days');
                    a = moment(message.date);
                    return  <React.Fragment key={index}>
                                { days > 0 && <Moment className='ChatMessage__ChangeDay' format='dddd, Do MMM'>{message.date}</Moment> }
                                <p className={`ChatMessage ChatMessage--${message.user===user._id?'mine':''}`}>{ message.text }
                                    <Moment className='ChatMessage__Time' format='LT'>{message.date}</Moment>
                                </p>
                            </React.Fragment>
                })
            }
            </div>
            <div className='Chat__Input'>
                <input 
                    id='filter_name'
                    name='name'
                    type='text' 
                    autoComplete='off'
                    placeholder={t('Write a message...')}
                />
                <SendIcon className='InputSearch__Icon InputSearch__Icon--end'/>
            </div>
        </section>
    )
}

export default Chat;

