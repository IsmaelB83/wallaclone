// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumIcon from '@material-ui/icons/Forum';
// Own components
// Own modules
// Models
// Assets
// CSS
import './styles.css';


// Functional component to render small link (button style) with just an icon in it
export default function ButtonIcon (props) {

    const { icon, active, disabled, onClick } = props;

    return(
        <button className={`ButtonIcon ${classButton(icon, active)} ${disabled?'ButtonIcon--disabled':''}`} onClick={onClick}>
            {iconButton(icon)}
        </button>
    );
}

ButtonIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired, 
}

// Icon
function iconButton(icon) {
    switch (icon) {
        case 'chat':        return <ForumIcon/>;
        case 'favorite':    return <FavoriteIcon/>;
        case 'book':        return <BookmarkBorderOutlinedIcon/>
        case 'sell':        return <AttachMoneyOutlinedIcon/>
        case 'edit':        return <EditOutlinedIcon/>
        case 'delete':      return <DeleteOutlineOutlinedIcon/>
        default:            break;
    }
}

// Classes
function classButton(icon, active) {
    switch (icon) {
        case 'chat':        return `ButtonIcon__Chat`;
        case 'favorite':    return `ButtonIcon__Favorite ButtonIcon__Favorite--${active?'On':'Off'}`;
        case 'book':        return `ButtonIcon__ToBlue ButtonIcon--${active?'On':'Off'}`;
        case 'sell':        return `ButtonIcon__ToRed ButtonIcon--${active?'On':'Off'}`;
        case 'edit':        return `ButtonIcon__ToGreen`;
        case 'delete':      return `ButtonIcon__ToGray`;
        default:            break;
    }
}