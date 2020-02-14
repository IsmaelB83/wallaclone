// NPM Modules
import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { withNamespaces } from 'react-i18next';
import i18n from '../../utils/i18n';
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
// Own Components
import AdvertChip from '../AdvertChip';
// Own Modules
// Models
import Advert, { ADVERT_CONSTANTS } from '../../models/Advert';
// Components
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
function AdvertDetail(props) {

    // Translate
    const { t } = props;

    // Props destructuring
    const { slug, name, description, photo, tags, price, sold, booked, type, favorite, createdAt, user } = props.advert;

    // Render
    return (
        <article id={`adslug_${slug}`} className='AdvertDetail'>
            <div className='AdvertDetail__Main'>
                <header className='AdvertDetail__Header'>
                    <img className='Caption' src={photo} alt='caption'/>
                    <div className='AdvertDetail__Chips'>
                        { ( sold || booked ) && <AdvertChip type='status' value={sold?ADVERT_CONSTANTS.STATUS.SOLD:ADVERT_CONSTANTS.STATUS.BOOKED}/> } 
                        { <AdvertChip type='type' value={type}/> }
                    </div>
                </header>
                <div className='AdvertDetail__Content'>
                    <h1>{name}</h1>
                    <h3 className='AdvertDetail__Author'>{user && user.name}</h3>
                    <div className='AdvertDetail__Description'>
                        <p>{description}</p>
                    </div>
                    <div className='AdvertDetail__Tags'>
                    {   tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/>) }
                    </div>
                </div>
            </div>
            <div className='AdvertDetail__Actions'>
            {   props.showFavorite && 
                <Button type='button' 
                    variant='contained' 
                    color='secondary' 
                    startIcon={<FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'White'}`}/>} 
                    className='ButtonWallaclone ButtonWallaclone__Green'
                    onClick={props.setFavoriteAdvert}>
                    {t('Favorite')}
                </Button>
            }
            {   props.showEdit && 
                <React.Fragment>
                    <Button type='button' 
                            variant='contained' 
                            className='ButtonWallaclone ButtonWallaclone__Green'
                            startIcon={<EditIcon />} 
                            component={Link} 
                            to={`/advert/edit/${slug}`}>
                            {t('Edit')}
                    </Button>
                    <Button type='button' 
                            variant='contained' 
                            className='ButtonWallaclone ButtonWallaclone__Green' 
                            disabled={sold || props.isUpdating} 
                            onClick={props.setBookAdvert}
                            startIcon={<BookmarkBorderOutlinedIcon/>}>
                            {!booked?t('Book'):t('Cancel Book')}
                    </Button>
                    <Button type='button' 
                            variant='contained' 
                            className='ButtonWallaclone ButtonWallaclone__Green' 
                            disabled={props.isUpdating} 
                            onClick={props.setSellAdvert}
                            startIcon={<AttachMoneyOutlinedIcon/>}>
                            {!sold?t('Sold'):t('Cancel Sold')}
                    </Button>
                    <Button type='button' 
                            variant='contained' 
                            className='ButtonWallaclone ButtonWallaclone__Red' 
                            disabled={props.isUpdating} 
                            onClick={props.setDeleteAdvert}
                            startIcon={<DeleteOutlineOutlinedIcon/>}>
                            {t('Delete')}
                    </Button>
                </React.Fragment>
            }
            </div>
            <div className='AdvertDetail__Footer'>
                <div className='AdvertDetail__Price'>
                    <p className='Text'>{t('Price')}</p>
                    <p className='Price'>{price} <span>€</span></p>
                </div>
                <Moment className='AdvertDetail__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
            </div>
        </article>
    );
}

AdvertDetail.propTypes = {
  advert: PropTypes.instanceOf(Advert).isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
}

export default withNamespaces()(AdvertDetail);