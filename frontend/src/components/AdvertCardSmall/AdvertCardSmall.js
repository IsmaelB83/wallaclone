// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
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
import Advert, { ADVERT_CONSTANTS } from '../../models/Advert';
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render an advert card
 */
export default function AdvertCardSmall (props) {
    
    const { slug, name, photo, tags, price, sold, booked, type, favorite, user, createdAt, updatedAt } = props.advert;

    return(
        <React.Fragment>
            <article id={`adslug_${slug}`} className='AdvertCardSmall'>
                <Link to={`/advert/${slug}`}>
                    <header className='AdvertCardSmall__Caption'>
                        <img className='AdvertCardSmall__Img' src={photo} alt='caption'/>
                        { ( sold || booked ) && <AdvertChip type='status' value={type?ADVERT_CONSTANTS.STATUS.SOLD:ADVERT_CONSTANTS.STATUS.BOOKED}/> } 
                    </header>
                </Link>
                <div className='AdvertCardSmall__Body'>
                    <div className='AdvertCardSmall__Date'>
                        <p className='Title'>Publicado</p>
                        <Moment format="DD/MM/YYYY" className='SubTitle'>{createdAt}</Moment>
                    </div>
                    <div className='AdvertCardSmall__Date'>
                        <p className='Title'>Actualizado</p>
                        <Moment format="DD/MM/YYYY" className='SubTitle'>{updatedAt}</Moment>
                    </div>
                    <div className='AdvertCardSmall__Main'>
                        <div className='AdvertCardSmall__Title'>
                            <p>{price} €</p>
                            <Link to={`/advert/${slug}`}>
                                <h2>{name}</h2>
                            </Link>
                        </div>
                        <div className='AdvertCardSmall__Tags'>
                            {   tags.map((value,i) => <AdvertChip type='tag' value={value}/>) }
                        </div>
                    </div>
                    
                    <div className='AdvertCardSmall__Actions'>
                        { props.showFavorite &&
                            <Button type='button' variant='contained' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToNone'
                                onClick={()=>props.onFavoriteAdvert(slug)}>
                                <FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'Off'}`}/>
                            </Button>
                        }
                        { props.showDeleteFavorite &&
                            <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
                                    variant='contained' onClick={()=>props.onDeleteFavorite(slug)}>
                                <DeleteIcon/>
                            </Button>
                        }
                        { props.showEdit &&
                            <React.Fragment>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToBlue ${booked && 
                                        'ButtonWallakeep__ClearToBlue--active'}`} disabled={sold} variant='contained' onClick={()=>props.onBookAdvert(slug)}>
                                    <BookmarkBorderOutlinedIcon/>
                                </Button>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToRed 
                                        ${sold && 'ButtonWallakeep__ClearToRed--active'}`} variant='contained' onClick={()=>props.onSellAdvert(slug)}>
                                    <AttachMoneyOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGreen' 
                                        disabled={sold} variant='contained' onClick={()=>props.history.push(`/advert/edit/${slug}`)}>
                                    <EditOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
                                        disabled={sold} variant='contained' onClick={()=>props.onDeleteAdvert(slug)}>
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