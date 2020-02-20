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

    const { sold, booked, photo, slug, detail, t } = props;
    const status = sold?CONSTANTS.STATUS.SOLD:CONSTANTS.STATUS.BOOKED

    return (
        <div className='CardImage'>
            { !detail &&
                <Link className='CardImage__Link' to={`/advert/${slug}`}>
                    <div className={`CardImage__Overlay CardImage__Overlay--${sold||booked}`}>
                        { (sold || booked) && <span className='CardImage__Bookmark'><BookmarkBorderIcon/>{t(status)}</span> }
                    </div> 
                    <img className='CardImage__Image' src={photo} alt='caption'/>
                </Link>
            }
            { detail && <img className='CardImage__Image' src={photo} alt='caption'/> }
            </div>
    )
}

CardImage.propTypes = {
    sold: PropTypes.bool.isRequired,
    booked: PropTypes.bool.isRequired,
    photo: PropTypes.string.isRequired,
}

export default withNamespaces()(CardImage);