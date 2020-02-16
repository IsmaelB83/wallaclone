// NPM Modules
import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import i18n from '../../utils/i18n';
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// Own Components
import AdvertChip from '../AdvertChip';
// Own Modules
// Models
import Advert, { ADVERT_CONSTANTS } from '../../models/Advert';
// Components
// Assets
// CSS
import './styles.css';

// Component to display an advert
export default function AdvertDetail(props) {

    // Translate
    const { t } = props;

    // Props destructuring
    const { slug, name, description, photo, tags, price, sold, booked, type, favorite, createdAt, user } = props.advert;

    // Chip
    const renderStatus = () => <AdvertChip type='status' value={sold?ADVERT_CONSTANTS.STATUS.SOLD:ADVERT_CONSTANTS.STATUS.BOOKED}/>
    const renderTags = () => tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/>);
    
    // Render
    return (
        <article id={`adslug_${slug}`} className='AdvertDetail'>
            <div className='AdvertDetail__Photo'>
                { ( sold || booked ) && <span className='AdvertDetail__Photo--overlay'>{renderStatus()}</span> }
                <img src={photo} alt='photo'/>
            </div>
            <div className='AdvertDetail__Content'>
                <AdvertChip type='type' value={type}/>
                <div>
                    <h1 className='AdvertDetail__Title'>{name}</h1>
                    <Moment className='AdvertDetail__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
                </div>
                <p className='AdvertDetail__Description'>{description}</p>
                <div className='AdvertDetail__Tags'>{renderTags()}</div>
                <div className='AdvertDetail__Footer'>
                    <div className='AdvertDetail__AuthorAvatar'>
                        <Link to={`/published/${user.login}`} className=''>
                            <div>
                                <Avatar className='Avatar' alt='avatar' src={user && user.avatar}/>
                                <span className='AdvertDetail__Author'>{user && user.name}</span>
                            </div>
                        </Link>
                    </div>
                    <p className='AdvertDetail__Price'>{price} <span>€</span></p>
                </div>
            </div>
            <div className='AdvertDetail__Buttons'>
                {   props.showFavorite && 
                    <Button startIcon={<FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'White'}`}/>} 
                            className='ButtonWc ButtonWc__Green Span2'
                            onClick={props.setFavoriteAdvert}>
                        {t('Favorite')}
                    </Button>
                }
                {   props.showEdit && 
                    <React.Fragment>
                        <Button className='ButtonWc ButtonWc__Green Span2'
                                startIcon={<EditIcon />} 
                                component={Link} 
                                to={`/advert/edit/${slug}`}>
                                {t('Edit')}
                        </Button>
                        <Button className='ButtonWc ButtonWc__Green' 
                                onClick={props.setBookAdvert}
                                startIcon={<BookmarkBorderOutlinedIcon/>}>
                                {t('Book')}
                        </Button>
                        <Button className='ButtonWc ButtonWc__Green' 
                                onClick={props.setSellAdvert}
                                startIcon={<AttachMoneyOutlinedIcon/>}>
                                {t('Sold')}
                        </Button>
                        <Button className='ButtonWc ButtonWc__Red Span2' 
                                disabled={props.isUpdating} 
                                onClick={props.setDeleteAdvert}
                                startIcon={<DeleteOutlineOutlinedIcon/>}>
                                {t('Delete')}
                        </Button>
                    </React.Fragment>
                }
                
            </div>
        </article>
    );
}

AdvertDetail.propTypes = {
  advert: PropTypes.instanceOf(Advert).isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
}