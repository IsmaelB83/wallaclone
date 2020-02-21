// NPM Modules
import React, { useState, useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ChatPanel from '../../components/ChatPanel';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import Error from '../../components/Error';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Chat adverts section
export default function Chat (props) {
    
    // Destructure props
    const { fetchUserChats, fetchChat, enqueueSnackbar, t } = props;
    const { chats } = props;
    const { isFetching, isFetchingDetail, error } = props.ui

    // Cargo chats del usuario autenticado
    useEffect(() => {
        fetchUserChats()
        .catch (error => enqueueSnackbar(t('Error loading chats ERROR', {error}), { variant: 'error' }));
    }, [fetchUserChats, enqueueSnackbar, t]);

    // Change chat
    const [currentChat, setCurrentChat] = useState(undefined);
    const [selectedChat, setSelectedChat] = useState(0);
    const selectedChatHandler = id => {
        fetchChat(id)
        .then(chat => setCurrentChat(chat))
        .catch (error => enqueueSnackbar(t('Error loading chat conversation ERROR', {error}), { variant: 'error' }));
    }

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
                        <p className='Text'>Aquí puedes gestionar las conversaciones que tienes abiertas con otros miembros de Wallapop, y así llegar a acuerdos de compra/venta con ellos...</p>
                    </div>
                    <ChatPanel
                        chats={chats}
                        currentChat={currentChat}
                        isLoading={isFetching}
                        isLoadingChat={isFetchingDetail}
                        onSelectedChat={selectedChatHandler}
                    />
                </main>
                { props.error && <Error error={error}/>}
            </Container>
            <Footer session={props.session} onLogout={props.logout} active='Chats'/>
        </React.Fragment>
    );
}