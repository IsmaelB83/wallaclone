// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// Material UI
import Button from '@material-ui/core/Button';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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

    // Delete advert
    const deleteAdvert = () => {
        props.deleteAdvert(props.advert._id, props.session.jwt);
    }

    return(
        <article className='AdvertCardSmall'>
            <header className='AdvertCardSmall__Caption'>
                <Link to={`/advert/edit/${props._id}`}>
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
                <div className='AdvertCardSmall__Title'>
                    <p>{props.price} €</p>
                    <Link to={`/advert/edit/${props._id}`}>
                        <h2>{props.name}</h2>
                    </Link>
                </div>
                <div className='AdvertCardSmall__Actions'>
                    <Button type='button' className='Button__Blue' variant='contained' onClick={bookAdvert}>
                      <BookmarkBorderOutlinedIcon/>
                    </Button>
                    <Button type='button' className='Button__Red' variant='contained' onClick={sellAdvert}>
                      <AttachMoneyOutlinedIcon/>
                    </Button>
                    <Link to={`/advert/edit/${props._id}`}>
                        <Button type='button' className='Button__Green' variant='contained'>
                            <EditOutlinedIcon/>
                        </Button>
                    </Link>
                    <Button type='button' className='Button__Gray' variant='contained' onClick={deleteAdvert}>
                      <DeleteOutlineOutlinedIcon/>
                    </Button>
                </div>
            </div>
        </article>
    );
}

AdvertCardSmall.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf([ADVERT_CONSTANTS.TYPE.BUY, ADVERT_CONSTANTS.TYPE.SELL]).isRequired,
}