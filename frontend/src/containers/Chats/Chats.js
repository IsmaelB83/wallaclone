// NPM Modules
import React, { useState, useEffect, useContext } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ChatList from '../../components/ChatList';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Error from '../../components/Error';
// Own modules
import { Context } from '../../components/withWebSocketChat';
// Models
import { EMPTY_CHAT } from '../../models/Chat';
// Assets
// CSS
import './styles.css';

// Chat adverts section
export default function Chats (props) {
    
    // Destructure props
    const { fetchUserChats, fetchChat, enqueueSnackbar, t } = props;
    const { chats, session } = props;
    const { isFetching, isFetchingDetail, error } = props.ui;
    const { id } = props.match.params;

    // Contexto de interacción con server de chat
    const chatContext = useContext(Context);

    // Change chat
    const [currentChat, setCurrentChat] = useState(EMPTY_CHAT);
    const selectedChatHandler = id => {
        fetchChat(id)
        .then(chat => setCurrentChat(chat))
        .catch (error => enqueueSnackbar(t('Error loading chat conversation ERROR', {error}), { variant: 'error' }));
    }

    // Cargo chats del usuario autenticado
    useEffect(() => {
        fetchUserChats()
        .then(chats => {
            if(chats.length > 0) {
                let i = 0;
                if (id) i = chats.findIndex(c => c._id === id);
                fetchChat(chats[i>=0?i:0]._id)
                .then(chat => {
                    setCurrentChat(chat)
                })
                .catch (error => enqueueSnackbar(t('Error loading chat conversation ERROR', {error}), { variant: 'error' }));
            }
        })
        .catch (error => enqueueSnackbar(t('Error loading chats ERROR', {error}), { variant: 'error' }));
    }, [fetchUserChats, fetchChat, setCurrentChat, enqueueSnackbar, id, t]);

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container Container--OverflowY'>
                <main className='Main__Section Chat'>
                    <div className='Section__Content'>
                        <div className='Content__Title'>
                            <h1 className='Title'>Tus conversaciones</h1>
                        </div>
                        <p className='Text'>Aquí puedes gestionar las conversaciones que tienes abiertas con otros miembros de Wallaclone, y así llegar a acuerdos de compra/venta con ellos...</p>
                    </div>
                    <ChatList
                        session={session}
                        chats={chats}
                        currentChat={currentChat}
                        isLoading={isFetching}
                        isLoadingChat={isFetchingDetail}
                        onChatSelected={selectedChatHandler}
                    />
                </main>
                { props.error && <Error error={error}/>}
            </Container>
            <Footer session={props.session} onLogout={props.logout} active='Chats'/>
        </React.Fragment>
    );
}