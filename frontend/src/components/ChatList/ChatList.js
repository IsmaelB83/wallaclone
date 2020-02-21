// NPM Modules
import React, { useState } from 'react';
// Material UI
// Components
import Loading from '../Loading';
import CardChat from '../cards/CardChat/CardChat';
import Chat from '../Chat';
// Own modules
// Models
// Assets
// CSS
import './styles.css';


// Component to render a Chat panel
export default function ChatList(props) {

    // Destructure props
    const { chats, currentChat, isLoading, isLoadingDetail, t } = props;

    // On chat selected hide/show chat list (mobile first)
    const onChatSelected = id => { 
        setCollapsed();
        props.onChatSelected(id) 
        hideShowChatList();
    }

    // Used in small devices
    const [collapsed, setCollapsed] = useState(true);
    const hideShowChatList = () => { setCollapsed(!collapsed); }

    // Render
    return (
        <div className={`ChatList ChatList__Hide--${collapsed}`}>
            <aside className='ChatList__Menu'>
                {   !isLoading && chats.length > 0 && chats.map((chat, index) => {
                        // Owner
                        const owner = chat.users[0].login === props.session.login ? chat.users[1]:chat.users[0];
                        // Chat session
                        return <CardChat 
                                    key={index}
                                    id={chat._id}
                                    chat={chat}
                                    owner={owner}
                                    active={currentChat._id === chat._id}
                                    onChatSelected={onChatSelected}
                                />
                    })
                }
                { isLoading && <Loading text={t('Loading chats')}/> }
            </aside>
            <main className='ChatList__Main'>
                { !isLoadingDetail &&
                    // Conversation for selected chat
                    <Chat 
                        user={props.session}
                        chat={currentChat}
                        onClickBack={hideShowChatList}
                    />
                }
            </main>
        </div>
    );
}