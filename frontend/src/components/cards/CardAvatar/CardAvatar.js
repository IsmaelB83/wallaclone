// Node
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
// Material
import Avatar from '@material-ui/core/Avatar';
// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
function CardAvatar (props) {

    const { login, avatar, name } = props;

    return (
        <Link to={`/published/${login}`} className='CardAvatar'>
            <div>
                <Avatar className='Avatar' alt='avatar' src={avatar}/>
                <span>{name}</span>
            </div>
        </Link>
    )
}

CardAvatar.propTypes = {
    login: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default CardAvatar;