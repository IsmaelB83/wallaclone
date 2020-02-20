// NPM Modules
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Chat adverts section
export default function Chat (props) {
    
    // Translate
    const { t } = props;

    // Destructure props

    // Cargo anuncios del usuario solicitado
    useEffect(() => {
        props.fetchAdverts();
    }, []);

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
                        adverts={props.adverts}
                    />
                </main>
            </Container>
            <Footer session={props.session} onLogout={props.logout} active='Chats'/>
        </React.Fragment>
    );
}