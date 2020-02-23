// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
// Own components
// Own modules
// Models
import { ADVERT_CONSTANTS } from '../../../models/Advert';
// Assets
// CSS
import './styles.css';

const IconsType = {};
IconsType[ADVERT_CONSTANTS.TYPE.ALL] = DonutLargeIcon;
IconsType[ADVERT_CONSTANTS.TYPE.SELL] = LocalOfferIcon;
IconsType[ADVERT_CONSTANTS.TYPE.BUY] = SearchIcon;
IconsType[ADVERT_CONSTANTS.STATUS.BOOKED] = BookmarkBorderIcon;
IconsType[ADVERT_CONSTANTS.STATUS.SOLD] = AttachMoneyIcon;

// Render advert status type
export default function AdvertChip (props) {
    const Icon = IconsType[props.value];
    return <Chip className={`AdvertChip AdvertChip__${props.type} AdvertChip__${props.type}--${props.value}`}
                 size='small' 
                 label={props.t(props.value)}
                 icon={Icon!==undefined?<Icon/>:undefined}
            />
}

AdvertChip.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}