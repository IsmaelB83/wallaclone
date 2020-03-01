// NPM Modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Material UI
// Components
import Chat from '../Chat';
import ChatTitle from '../ChatTitle';
import Loading from '../../utils/Loading';
// Own modules
// Models
import { EMPTY_USER } from '../../../models/User';
// Assets
// CSS
import './styles.css';


// Component to render a Chat panel
export default function ChatList(props) {

    // Destructure props
    const { chats, onlineUsers, session, isLoading, id, t } = props;

    // State
    const [ online, setOnline ] = useState(false);
    const [ user, setUser ] = useState(EMPTY_USER);
    const [ collapsed, setCollapsed ] = useState(true);
    const [ currentChat, setCurrentChat ] = useState(0);

    // Used in small devices
    const hideShowChatList = () => { setCollapsed(!collapsed); }

    // On chat selected hide/show chat list (mobile first) then change
    const onChatSelected = id => { 
        setCollapsed();
        hideShowChatList();
        props.history.push(`/chats/${id}`);
    }
    
    // Carga del chat
    useEffect(() => {
        if (chats && chats.length > 0) {
            let i = 0;
            if (id) {
                const index = chats.findIndex(c => c._id === id);
                i = index >= 0 ? index : 0;
            }
            const chat = chats[i];
            let user = chat.users[0];
            if (user._id === session._id) {
                user = chat.users[1];
            }
            setUser(user);
            setOnline(onlineUsers.indexOf(user.login) >= 0)
            setCurrentChat(i);   
        }
    }, [chats, onlineUsers, currentChat, session, id])

    // Render
    return (
        <div className={`ChatList ChatList__Hide--${collapsed}`}>
        { chats.length > 0 && 
            <React.Fragment>
                <aside className='ChatList__Menu'>
                {   !isLoading && chats.map((chat, index) => {
                        // Owner
                        const owner = chat.users[0].login === props.session.login ? chat.users[1]:chat.users[0];
                        // Chat session
                        return <ChatTitle 
                                    key={index}
                                    chat={chat}
                                    owner={owner}
                                    active={chats[currentChat]._id === chat._id}
                                    onChatSelected={onChatSelected}
                                />
                    })
                }
                { isLoading && <Loading text={t('Loading chats')}/> }
                </aside>
                <main className='ChatList__Main'>
                { chats[currentChat] &&
                    <Chat 
                        id={chats[currentChat]._id}
                        session={session}
                        user={user}
                        online={online}
                        messages={chats[currentChat].messages}
                        name={chats[currentChat].advert.name}
                        onClickBack={hideShowChatList}
                    />
                }
                </main>
            </React.Fragment>
        }
        { !chats.length && 
            <h2 className='Home__Subtitle'>{t('Sorry, we couldn\'t find any chat for your user name')}</h2>
        }
        </div>
    );
}

ChatList.propTypes = {
    chats: PropTypes.array.isRequired,
    onlineUsers: PropTypes.array,
    session: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    id: PropTypes.string,
    t: PropTypes.func.isRequired,
}