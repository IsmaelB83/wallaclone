// NPM Modules
import React, { useState } from 'react';
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
import ModalConfirm from '../ModalConfirm';
// Own modules
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
import Advert from '../../models/Advert';
// Assets
import imgReserved from '../../assets/images/reserved.png'
import imgSold from '../../assets/images/sold.png'
// CSS
import './styles.css';

/**
 * Functional component to render an advert card
 */
export default function AdvertCardSmall (props) {
    
    // Reservar producto
    const setFavorite = () => {
        props.onDeleteFavorite(props.slug)
    }

    // Reservar producto
    const bookAdvert = () => {
        const advert = new Advert({...props});
        advert.booked = !advert.booked;
        props.editAdvert(advert, props.session.jwt);
    }

    // Sell advert
    const sellAdvert = () => {
        const advert = new Advert({...props});
        advert.sold = !advert.sold;
        props.editAdvert(advert, props.session.jwt); 
    }

    // Go to edit
    const toEdit = () => {
        props.history.push(`/advert/edit/${props.slug}`);
    }

    // Delete advert
    const deleteAdvert = () => {
        setShowModal(false);
        props.deleteAdvert(props.slug, props.session.jwt);
    }

    // Show modal
    const showModalConfirmation = () => {
        setShowModal(true);
    }
    
    // Hide modal
    const [showModal, setShowModal] = useState(false);
    const hideModalConfirmation = () => {
        setShowModal(false);
    }

    return(
        <React.Fragment>
            <article id={`adslug_${props.slug}`} className='AdvertCardSmall'>
                <header className='AdvertCardSmall__Caption'>
                    <Link to={`/advert/edit/${props.slug}`}>
                        <img className='AdvertCardSmall__Img' src={props.photo} alt='caption'/>
                    </Link>
                    { ( props.booked || props.sold ) &&
                        <div className='AdvertCardSmall__Status'>
                            { props.booked && <img src={imgReserved} alt='reserved'/> }
                            { props.sold && <img src={imgSold} alt='sold'/> }
                        </div>
                    }
                </header>
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
                            <Link to={`/advert/edit/${props.slug}`}>
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
                        { !props.edit &&    
                            <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
                                    variant='contained' onClick={setFavorite}>
                                <DeleteIcon/>
                            </Button>
                        }
                        { props.edit &&
                            <React.Fragment>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToBlue ${props.booked && 
                                        'ButtonWallakeep__ClearToBlue--active'}`} disabled={props.sold} variant='contained' onClick={bookAdvert}>
                                    <BookmarkBorderOutlinedIcon/>
                                </Button>
                                <Button type='button' className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToRed 
                                        ${props.sold && 'ButtonWallakeep__ClearToRed--active'}`} variant='contained' onClick={sellAdvert}>
                                    <AttachMoneyOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGreen' 
                                        disabled={props.sold} variant='contained' onClick={toEdit}>
                                    <EditOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray' 
                                        disabled={props.sold} variant='contained' onClick={showModalConfirmation}>
                                    <DeleteOutlineOutlinedIcon/>
                                </Button>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </article>
            { showModal && <ModalConfirm onConfirm={deleteAdvert} onCancel={hideModalConfirmation}/> }
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