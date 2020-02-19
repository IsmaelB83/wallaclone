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
import CardImage from '../cards/CardImage/CardImage';
// Own Modules
// Models
// Components
// Assets
// CSS
import './styles.css';

// Component to display an advert
export default function AdvertDetail(props) {

    // Props destructuring
    const { slug, name, description, photo, tags, price, sold, booked, type, favorite, createdAt, user } = props.advert;
    const { t } = props;

    // Chip
    const renderTags = () => tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/>);

    // Render
    return (
        <article id={`adslug_${slug}`} className='AdvertDetail'>
            <div className='AdvertDetail__Photo'>
                <CardImage slug={slug} sold={sold} booked={booked} photo={photo} detail={true}/>
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
                                <Avatar className='Avatar' alt='avatar' src={user.avatar}/>
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
                                to={`/advert/edit/${slug}`}
                                disabled={booked || sold}>
                                {t('Edit')}
                        </Button>
                        <Button className='ButtonWc ButtonWc__Green' 
                                onClick={props.setBookAdvert}
                                startIcon={<BookmarkBorderOutlinedIcon/>}
                                disabled={sold}>
                                {t('Book')}
                        </Button>
                        <Button className='ButtonWc ButtonWc__Green' 
                                onClick={props.setSellAdvert}
                                startIcon={<AttachMoneyOutlinedIcon/>}>
                                {t('Sold')}
                        </Button>
                        <Button className='ButtonWc ButtonWc__Red Span2' 
                                onClick={props.setDeleteAdvert}
                                startIcon={<DeleteOutlineOutlinedIcon/>}
                                disabled={sold}>
                                {t('Delete')}
                        </Button>
                    </React.Fragment>
                }
                
            </div>
        </article>
    );
}

AdvertDetail.propTypes = {
  advert: PropTypes.instanceOf(Object).isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
}