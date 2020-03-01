// Node
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
// Material UI
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// Own
import { ADVERT_CONSTANTS as CONSTANTS } from '../../../models/Advert';
// Assets
// CSS
import './styles.css';


// Functional component to render an advert image with overlay transparency and status
export default function CardImage (props) {

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
            { detail && 
                <React.Fragment>
                    <div className={`CardImage__Overlay CardImage__Overlay--${sold||booked}`}>
                        { (sold || booked) && <span className='CardImage__Bookmark'><BookmarkBorderIcon/>{t(status)}</span> }
                    </div> 
                    <img className='CardImage__Image' src={photo} alt='caption'/>
                </React.Fragment>
            }
            </div>
    )
}

CardImage.propTypes = {
    sold: PropTypes.bool.isRequired,
    booked: PropTypes.bool.isRequired,
    photo: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    detail: PropTypes.bool,
    t: PropTypes.func.isRequired
}