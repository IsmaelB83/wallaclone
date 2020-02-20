// Node
import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
// Material
// Own components
import CardAvatar from '../cards/CardAvatar/CardAvatar';
// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
function CardConversation (props) {

    let a = moment('01-01-1900');

    return (
        <section className='ChatPanel__Chat'>
            <div className='ChatPanel__User'>
                <CardAvatar size='large' avatar={props.user.avatar} name={props.user.name}/>
            </div>
            <div className='ChatPanel__Messages'>
            {   props.messages && 
                props.messages.map((message, index) => {
                    const b = moment(message.date);
                    const days = b.diff(a, 'days');
                    a = moment(message.date);
                    return  <React.Fragment>
                                { days > 0 && <Moment className='ChatMessage__ChangeDay' format='dddd, Do MMM'>{message.date}</Moment> }
                                <p className={`ChatMessage ChatMessage--${message.isMine?'mine':''}`}>{ message.message }
                                    <Moment className='ChatMessage__Time' format='LT'>{message.date}</Moment>
                                </p>
                            </React.Fragment>
                })
            }
            </div>
        </section>
    )
}

export default CardConversation;

