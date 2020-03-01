// NPM Modules
import React, { useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// Components
import HeaderChat from '../../components/headers/HeaderChat';
import NoResults from '../../components/utils/NoResults';
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
            <NavBar session={session} onLogout={props.logout}/>
            <Container className='Container Container__Fixed'>
                <main className='Section__Wrapper Section__WrapperChats'>
                    <HeaderChat/>
                    { chats.length > 0 &&
                        <ChatList
                            session={session}
                            chats={chats}
                            isLoading={isFetchingChats}
                            onlineUsers={socketIo.onlineUsers}
                            id={props.match.params.id}
                        />
                    }
                    { !chats.length &&
                        <NoResults text={t('No chats for your user MORE')}/>
                    }
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
            <Footer session={session} onLogout={props.logout} active='Chats'/>
        </React.Fragment>
    );
}

Chats.propTypes = {
    chats: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    socketIo: PropTypes.object.isRequired,
    error: PropTypes.string,
    isFetchingChats: PropTypes.bool,
    t: PropTypes.func.isRequired,
    fetchUserChats: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
}