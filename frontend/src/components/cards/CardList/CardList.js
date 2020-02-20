// NPM Modules
import React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import i18n from '../../../utils/i18n';
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import ForumIcon from '@material-ui/icons/Forum';
// Own components
import AdvertChip from '../../AdvertChip';
import CardImage from '../CardImage/CardImage';
import CardAvatar from '../CardAvatar/CardAvatar';
import CardTags from '../CardTags/CardTags';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

// Functional component to render an advert card
export default function CardList (props) {
    
    // Props destructuring
    const { slug, name, thumbnail, tags, price, sold, type, booked, favorite, createdAt, user } = props.advert;
    const { setFavoriteAdvert, setBookAdvert, setSellAdvert, setDeleteAdvert, openChat } = props;
    const { isMyAdvert, isLogin } = props;

    // Render
    return(
        <React.Fragment>
            <article id={`adslug_${slug}`} className='CardList'>
                <header className='CardList__Header'>
                    <CardImage slug={slug} sold={sold} booked={booked} photo={thumbnail}/>
                    <p className='CardList__Price'>{price} €</p>
                    <AdvertChip type='type' value={type}/>
                </header>
                <div className='CardList__Body'>
                    <div className='CardList__Content'>
                        <Link to={`advert/${slug}`} className='CardList__Title'><h2>{name}</h2></Link>
                        <Moment className='CardList__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
                        <CardTags tags={tags} />
                    </div>
                    <div className='CardList__Footer'>
                        { !isMyAdvert &&
                            <CardAvatar login={user.login} name={user.name} avatar={user.avatar}/>
                        }
                        { !isMyAdvert && isLogin &&
                            <div>
                                <Button type='button' className='CardList__Favorite' onClick={openChat}>
                                    <ForumIcon className='ChatIcon'/>
                                </Button>
                                <Button type='button' className='CardList__Favorite' onClick={setFavoriteAdvert}>
                                    <FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'Off'}`}/>
                                </Button>
                            </div>
                        }
                        { isMyAdvert &&
                            <div className='CardList__EditButtons'>
                                <Button type='button' className={`ButtonWc ButtonWc__Clear ButtonWc__ClearToBlue ${booked && 
                                        'ButtonWc__ClearToBlue--active'}`} disabled={sold} variant='contained' onClick={setBookAdvert}>
                                    <BookmarkBorderOutlinedIcon/>
                                </Button>
                                <Button type='button' className={`ButtonWc ButtonWc__Clear ButtonWc__ClearToRed ${sold && 'ButtonWc__ClearToRed--active'}`} 
                                        disabled={booked} variant='contained' onClick={setSellAdvert}>
                                    <AttachMoneyOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWc ButtonWc__Clear ButtonWc__ClearToGreen' 
                                        disabled={sold} variant='contained' component={Link} to={`/advert/edit/${slug}`}>
                                    <EditOutlinedIcon/>
                                </Button>
                                <Button type='button' className='ButtonWc ButtonWc__Clear ButtonWc__ClearToGray' 
                                        disabled={sold} variant='contained' onClick={setDeleteAdvert}>
                                    <DeleteOutlineOutlinedIcon/>
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </article>
        </React.Fragment>
    );
}