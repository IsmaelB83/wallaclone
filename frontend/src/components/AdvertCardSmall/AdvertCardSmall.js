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
import Advert, { ADVERT_CONSTANTS as CONSTANTS } from '../../models/Advert';
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render an advert card
 */
export default function AdvettCardSmall (props) {
    
    // Props destructuring
    const { slug, name, thumbnail, tags, price, sold, type, booked, favorite, createdAt, updatedAt } = props.advert;

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
                            <p className='Title'>Publicado</p>
                            <Moment format="DD/MM/YYYY" className='SubTitle'>{createdAt}</Moment>
                        </div>
                        <div className='CardList__Date'>
                            <p className='Title'>Actualizado</p>
                            <Moment format="DD/MM/YYYY" className='SubTitle'>{updatedAt}</Moment>
                        </div>
                    </div>
                    <div className='CardList__Main'>
                        <div className='CardList__Title'>
                            <p>{price} €</p>
                            <Link to={`/advert/${slug}`}>
                                <h2>{name}</h2>
                            </Link>
                        </div>
                        <div className='CardList__Tags'>
                            {   tags.map((value,i) => <AdvertChip key={i} type='tag' value={value}/>) }
                        </div>
                    </div>
                    <div className='CardList__Actions'>
                        { props.showFavorite &&
                            <Button type='button' variant='contained' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToNone'
                                onClick={props.setFavoriteAdvert}>
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
                                        'ButtonWallakeep__ClearToBlue--active'}`} disabled={sold} variant='contained' onClick={props.setBookAdvert}>
                                    <BookmarkBorderOutlinedIcon/>
                                </Button>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToRed 
                                        ${sold && 'ButtonWallakeep__ClearToRed--active'}`} variant='contained' onClick={props.setSellAdvert}>
                                    <AttachMoneyOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGreen' 
                                        disabled={sold} variant='contained' onClick={()=>props.history.push(`/advert/edit/${slug}`)}>
                                    <EditOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
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

AdvettCardSmall.propTypes = {
    advert: PropTypes.instanceOf(Advert).isRequired
}