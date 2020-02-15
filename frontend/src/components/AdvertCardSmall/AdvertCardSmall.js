// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete'; 
import Button from '@material-ui/core/Button';
// Own components
import AdvertChip from '../AdvertChip';
// Own modules
// Models
import Advert, { ADVERT_CONSTANTS as CONSTANTS } from '../../models/Advert';
// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
function AdvertCardSmall (props) {
    
    // Translate
    const { t } = props;

    // Props destructuring
    const { slug, name, thumbnail, tags, price, sold, type, booked, favorite, createdAt, updatedAt, user } = props.advert;

    // Render
    return(
        <React.Fragment>
            <article id={`adslug_${slug}`} className='CardList'>
                <header className='CardList__Header'>
                    <Link to={`/advert/${slug}`}><img className='CardList__Img' src={thumbnail} alt='caption'/></Link>
                    { ( sold || booked ) && <AdvertChip type='status' value={sold?CONSTANTS.STATUS.SOLD:CONSTANTS.STATUS.BOOKED}/> } 
                    { <AdvertChip type='type' value={type}/> } 
                </header>
                <div className='CardList__Body'>
                    <div className='CardList__Dates'>
                        <div className='CardList__Date'>
                            <p className='Title'>{t('Created')}</p>
                            <Moment format="DD/MM/YYYY" className='SubTitle'>{createdAt}</Moment>
                        </div>
                        <div className='CardList__Date'>
                            <p className='Title'>{t('Updated')}</p>
                            <Moment format="DD/MM/YYYY" className='SubTitle'>{updatedAt}</Moment>
                        </div>
                    </div>
                    <div className='CardList__Main'>
                        <div className='CardList__Title'>
                            <Link to={`/advert/${slug}`}>
                                <h2>{name}</h2>
                            </Link>
                            <div className='CardList__Price'>
                                <p>{price} €</p><span>-</span><p>{user.name}</p>
                            </div>
                            
                        </div>
                        <div className='CardList__Tags'>
                            {   tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/>) }
                        </div>
                    </div>
                    <div className='CardList__Actions'>
                        { props.showFavorite &&
                            <Button type='button' variant='contained' className='ButtonWc ButtonWc__Clear ButtonWc__ClearToNone'
                                onClick={props.setFavoriteAdvert}>
                                <FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'Off'}`}/>
                            </Button>
                        }
                        { props.showDeleteFavorite &&
                            <Button type='button' className='ButtonWc ButtonWc__Clear ButtonWc__ClearToGray' 
                                    variant='contained' onClick={()=>props.onDeleteFavorite(slug)}>
                                <DeleteIcon/>
                            </Button>
                        }
                        { props.showEdit &&
                            <React.Fragment>
                                <Button type='button' className={`ButtonWc ButtonWc__Clear ButtonWc__ClearToBlue ${booked && 
                                        'ButtonWc__ClearToBlue--active'}`} disabled={sold} variant='contained' onClick={props.setBookAdvert}>
                                    <BookmarkBorderOutlinedIcon/>
                                </Button>
                                <Button type='button' className={`ButtonWc ButtonWc__Clear ButtonWc__ClearToRed 
                                        ${sold && 'ButtonWc__ClearToRed--active'}`} variant='contained' onClick={props.setSellAdvert}>
                                    <AttachMoneyOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWc ButtonWc__Clear ButtonWc__ClearToGreen' 
                                        disabled={sold} variant='contained' component={Link} to={`/advert/edit/${slug}`}>
                                    <EditOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWc ButtonWc__Clear ButtonWc__ClearToGray' 
                                        disabled={sold} variant='contained' onClick={props.setDeleteAdvert}>
                                    <DeleteOutlineOutlinedIcon/>
                                </Button>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </article>
        </React.Fragment>
    );
}

AdvertCardSmall.propTypes = {
    advert: PropTypes.instanceOf(Advert).isRequired
}

export default withNamespaces()(AdvertCardSmall);