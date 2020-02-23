// NPM Modules
import React, { useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// Components
import ChatList from '../../components/chat/ChatList';
import Footer from '../../components/layout/Footer';
import NavBar from '../../components/layout/NavBar';
import Error from '../../components/error/Error';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Chat adverts section
export default function Chats (props) {
    
    // Destructure props
    const { fetchUserChats, enqueueSnackbar, t } = props;
    const { chats, session, socketIo } = props;
    const { isFetchingChats, error } = props.ui;

    // Cargo chats del usuario autenticado
    useEffect(() => {
        fetchUserChats()
        .catch (error => enqueueSnackbar(t('Error loading chats ERROR', {error}), { variant: 'error' }));
    }, [fetchUserChats, enqueueSnackbar, t]);

    // Render
    return (
        <React.Fragment>
            <NavBar session={props.session} onLogout={props.logout}/>
            <Container className='Container Container--OverflowY Chats'>
                <main className='Main__Section Chat'>
                    <div className='Section__Content'>
                        <div className='Content__Title'>
                            <h1 className='Title'>{t('Your chats')}</h1>
                        </div>
                        <p className='Text'>{t('In this section you can manage all the conversations you have with other members of Wallaclone')}</p>
                    </div>
                    <ChatList
                        session={session}
                        chats={chats}
                        isLoading={isFetchingChats}
                        onlineUsers={socketIo.onlineUsers}
                        id={props.match.params.id}
                    />
                </main>
                { props.error && <Error error={error}/>}
                { !socketIo.online && 
                    <div className='Chat__Reconnect'>
                        <h2 className='Home__Subtitle'>{t('We are having problems while connecting to the chat server')}</h2>
                        <Button className='Chat__ReconnectButton' variant='contained' color='primary'
                                onClick={()=>props.connectSocket(session.login)}>
                                {t('Reconnect')}
                        </Button>
                    </div>
                }
            </Container>
            <Footer session={props.session} onLogout={props.logout} active='Chats'/>
        </React.Fragment>
    );
}