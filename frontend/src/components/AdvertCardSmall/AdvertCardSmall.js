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
import DeleteIcon from '@material-ui/icons/Delete'; 
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
// Own components
// Own modules
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Assets
import imgReserved from '../../assets/images/reserved.png'
import imgSold from '../../assets/images/sold.png'
// CSS
import './styles.css';

/**
 * Functional component to render an advert card
 */
export default function AdvertCardSmall (props) {
    
    return(
        <React.Fragment>
            <article id={`adslug_${props.slug}`} className='AdvertCardSmall'>
                <Link to={`/advert/${props.slug}`}>
                    <header className='AdvertCardSmall__Caption'>
                            <img className='AdvertCardSmall__Img' src={props.photo} alt='caption'/>
                        { ( props.booked || props.sold ) &&
                            <div className='AdvertCardSmall__Status'>
                                { props.booked && <img src={imgReserved} alt='reserved'/> }
                                { props.sold && <img src={imgSold} alt='sold'/> }
                            </div>
                        }
                    </header>
                </Link>
                <div className='AdvertCardSmall__Body'>
                    <div className='AdvertCardSmall__Date'>
                        <p className='Title'>Publicado</p>
                        <Moment format="DD/MM/YYYY" className='SubTitle'>{props.createdAt}</Moment>
                    </div>
                    <div className='AdvertCardSmall__Date'>
                        <p className='Title'>Actualizado</p>
                        <Moment format="DD/MM/YYYY" className='SubTitle'>{props.updatedAt}</Moment>
                    </div>
                    <div className='AdvertCardSmall__Main'>
                        <div className='AdvertCardSmall__Title'>
                            <p>{props.price} €</p>
                            <Link to={`/advert/${props.slug}`}>
                                <h2>{props.name}</h2>
                            </Link>
                        </div>
                        <div className='AdvertCardSmall__Tags'>
                            {   props.tags && 
                                props.tags.map((value,i) => {
                                    return  <Chip
                                                key={i}
                                                size="small"
                                                label={value}
                                                className={`Ad__Tag Ad__Tag--${value}`}
                                            />
                                })
                            }
                        </div>
                    </div>
                    
                    <div className='AdvertCardSmall__Actions'>
                        { props.showFavorite &&
                            <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
                                    variant='contained' onClick={()=>props.onDeleteFavorite(props.slug)}>
                                <DeleteIcon/>
                            </Button>
                        }
                        { props.showEdit &&
                            <React.Fragment>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToBlue ${props.booked && 
                                        'ButtonWallakeep__ClearToBlue--active'}`} disabled={props.sold} variant='contained' onClick={()=>props.onBookAdvert(props.slug)}>
                                    <BookmarkBorderOutlinedIcon/>
                                </Button>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToRed 
                                        ${props.sold && 'ButtonWallakeep__ClearToRed--active'}`} variant='contained' onClick={()=>props.onSellAdvert(props.slug)}>
                                    <AttachMoneyOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGreen' 
                                        disabled={props.sold} variant='contained' onClick={()=>props.history.push(`/advert/edit/${props.slug}`)}>
                                    <EditOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
                                        disabled={props.sold} variant='contained' onClick={()=>props.onDeleteAdvert(props.slug)}>
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
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf([ADVERT_CONSTANTS.TYPE.BUY, ADVERT_CONSTANTS.TYPE.SELL]).isRequired,
}