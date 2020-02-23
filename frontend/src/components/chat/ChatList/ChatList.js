// NPM Modules
import React, { useState, useEffect } from 'react';
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

    // Load chat from chats
    const loadChat = index => {
        const chat = chats[index];
        let user = chat.users[0];
        if (user._id === session._id) {
            user = chat.users[1];
        }
        setUser(user);
        setOnline(onlineUsers.indexOf(user.login) >= 0)
        setCurrentChat(index);
    }

    // On chat selected hide/show chat list (mobile first)
    const onChatSelected = index => { 
        setCollapsed();
        hideShowChatList();
        loadChat(index);
    }
    
    // Carga del chat
    useEffect(() => {
        let i = currentChat;
        if (!currentChat && id) {
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
    }, [chats, onlineUsers, currentChat, session, id])

    // Render
    return (
        <div className={`ChatList ChatList__Hide--${collapsed}`}>
            <aside className='ChatList__Menu'>
                {   !isLoading && chats.length > 0 && chats.map((chat, index) => {
                        // Owner
                        const owner = chat.users[0].login === props.session.login ? chat.users[1]:chat.users[0];
                        // Chat session
                        return <ChatTitle 
                                    key={index}
                                    index={index}
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
                <Chat 
                    id={chats[currentChat]._id}
                    session={session}
                    user={user}
                    online={online}
                    messages={chats[currentChat].messages}
                    name={chats[currentChat].advert.name}
                    onClickBack={hideShowChatList}
                />
            </main>
        </div>
    );
}