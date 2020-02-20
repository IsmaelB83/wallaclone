// NPM Modules
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import CardChat from '../cards/CardChat/CardChat';
import ChatConversation from '../ChatConversation/ChatConversation';
// Own modules
// Models
// Assets
// CSS
import './styles.css';


// Component to render a Chat panel
export default function ChatPanel(props) {
    return (
        <main className='ChatPanel'>
            <aside className='ChatPanel__Menu'>
            {   props.adverts.map((advert, index) => 
                    <CardChat 
                        name={advert.name} 
                        description={advert.description}
                        thumbnail={advert.thumbnail}
                        user={advert.user}
                        booked={advert.booked}
                        sold={advert.sold}
                        createdAt={advert.createdAt}
                    />
                )
            }
            </aside>
            { props.adverts.length > 0 &&
                <ChatConversation 
                    user={props.adverts[0].user} 
                    messages={[
                        {message: `Hola buenas tardes`, isMine: true, date: new Date(`01-01-2019 21:12`)},
                        {message: `¿Tienes disponibles aún los libros del Fallout 4?`, isMine: true, date: new Date(`01-01-2019 23:12`)},
                        {message: `Hola Antonio,
                        Siguen disponibles si. Lo que pasa que por lo poco que pido no me voy a desplazar. Sería para recoger en las tablas (barrio al norte de Madrid). ¿Te cuadraría?
                        Muchas gracias`, date: new Date(`01-02-2019 08:12`)},
                        {message: `Hola. Sí, en principio no habría problema. Mañana mismo voy a Madrid capital. ¿Sería posible quedar mañana?`, isMine: true, date: new Date(`01-02-2019 08:13`)},
                        {message: `Si me dices una dirección exacta, quedamos allí a una hora que acordemos si no te parece mal.`, date: new Date(`01-02-2019 14:12`)},
                        {message: `Mañana estoy de vacaciones así que puedo sin problema.`, isMine: true, date: new Date(`03-01-2019 14:13`)},
                        {message: `Calle castiello de Jaca 18`, isMine: true, date: new Date(`03-01-2019 22:12`)},
                        {message: `OK. Estupendo. Hoy estaré en Madrid (bajo desde Villalba) desde las 12h a hacer varias cosas. Si te parece bien, cuando termine te escribo y me paso por allí con el coche un momento`, isMine: true, date: new Date(`03-01-2019 23:12`)},
                    ]}
                />
            } 
        </main>
    );
}