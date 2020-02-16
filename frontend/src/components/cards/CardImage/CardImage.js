// Node
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { withNamespaces } from 'react-i18next';
// Own
import { ADVERT_CONSTANTS as CONSTANTS } from '../../../models/Advert';
// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
function CardImage (props) {

    const { sold, booked, thumbnail, slug, t } = props;
    const status = sold?CONSTANTS.STATUS.SOLD:CONSTANTS.STATUS.BOOKED

    return (
        <div className='CardImage'>
            <Link className='CardImage__Link' to={`/advert/${slug}`}>
                <div className={`CardImage__Overlay CardImage__Overlay--${sold||booked}`}>
                    { (sold || booked) && <span className='CardImage__Bookmark'><BookmarkBorderIcon/>{t(status)}</span> }
                </div> 
                <img className='CardImage__Image' src={thumbnail} alt='caption'/>
            </Link>
        </div>
    )
}

CardImage.propTypes = {
    sold: PropTypes.string.isRequired,
    booked: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
}

export default withNamespaces()(CardImage);