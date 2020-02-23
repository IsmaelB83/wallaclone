// Node
import React, { useState, useEffect } from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import Moment from 'react-moment';
import moment from 'moment';
// Material
import SendIcon from '@material-ui/icons/Send';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
// Own components
import CardAvatar from '../../cards/CardAvatar';
// Own modules
import SocketIo from '../../../socketio';
// Models
import { CHAT_CONSTANTS } from '../../../models/Chat';
// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
function Chat(props) {

    // Destructure props
    const { id, user, session, messages, online, name, t } = props;

    // State hook
    const [input, setInput] = useState('');

    // Key down event handler
    const keyDownEventHandler = ev => {
        if(ev.which === 13 && !ev.shiftKey && input) {
            sentMessageEventHandler();
        }
    }

    // On load confirm peer in case id haven't done it yet
    useEffect(() => {
        const data = {
            chatId: id,
            user: user.login,
        }
        SocketIo.confirmChatRead(data);
    }, [id, session, user])

    // Sent message to chat server
    const sentMessageEventHandler = () => {
        if (input) {
            const data = {
                chatId: id,
                date: new Date(),
                senderLogin: session.login,
                senderId: session._id,
                receiverLogin: user.login,
                receiverId: user._id,
                text: input
            }
            SocketIo.sendMessage(data)
            setInput('');
        } 
    }

    function diffInDays(start, end) {
        const startAux = moment(start).clone().startOf('day');
        const endAux = moment(end).clone().startOf('day');
        return endAux.diff(startAux, 'days');
     }

    // Change date in message list
    let a = moment();
    
    // Render
    return (
        <section className='Chat'>
            <div className='Chat__User'>
                <KeyboardBackspaceIcon className='Chat__ClickBack' onClick={props.onClickBack}/>
                <CardAvatar avatar={user.avatar} login={user.login} name={user.name} />
                <span className={`Chat__Status ${online?'Chat__Status--online':''}`}><FiberManualRecordIcon/>{online?'online':'offline'}</span>
            </div>
            <div className='Chat__Name'>
                <p>{name}</p>
            </div>
            <ScrollableFeed className='Chat__Messages' forceScroll={true}>
            {   messages.map((message, index) => {
                    const days = diffInDays(a, message.date);
                    a = moment(message.date);
                    return  <React.Fragment key={index}>
                                { (days > 0 || index === 0) && <Moment className='ChatMessage__ChangeDay' format='dddd, D MMM'>{message.date}</Moment> }
                                <div className={`ChatMessage ChatMessage--${message.user===session._id?'mine':''}`}>
                                    <p className='Text'>{message.text}
                                    <Moment className='Time' format='LT'>{message.date}</Moment>
                                    { message.status === CHAT_CONSTANTS.STATUS.WAIT && <QueryBuilderIcon className='Icon'/> }
                                    { message.status === CHAT_CONSTANTS.STATUS.SENT && <DoneIcon className='Icon Icon__Green'/> }
                                    { !message.status && <DoneAllIcon className='Icon Icon__Green'/> }
                                    </p>
                                </div>
                            </React.Fragment>
                })
            }
            </ScrollableFeed>
            <div className='Chat__Input'>
                <input 
                    id='filter_name'
                    name='name'
                    type='text' 
                    value={input}
                    onChange={ev=>setInput(ev.target.value)}
                    autoComplete='off'
                    placeholder={t('Write a message...')}
                    onKeyDown={keyDownEventHandler}
                />
                <SendIcon className='InputSearch__Icon InputSearch__Icon--end' onClick={sentMessageEventHandler}/>
            </div>
        </section>
    )
}

export default Chat;

