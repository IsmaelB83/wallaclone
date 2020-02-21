// NPM Modules
import React from 'react';
import i18n from '../../../utils/i18n';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// Material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumIcon from '@material-ui/icons/Forum';
// Own components
import AdvertChip from '../../AdvertChip';
import CardAvatar from '../CardAvatar/CardAvatar';
import CardImage from '../CardImage/CardImage';
import CardTags from '../CardTags/CardTags';
// Own modules
// Models
// Assets
// CSS
import './styles.css';


// Functional component to render an advert card
export default function CardTile (props) {

    // Props destructuring
    const { slug, name, thumbnail, tags, price, sold, booked, type, favorite, user, createdAt } = props.advert;
    const { isLogin, isMyAdvert } = props;
    const { onOpenChat, onFavoriteAdvert } = props;

    // Render
    return(
        <article id={`adslug_${slug}`} className='CardTile'>
            <header className='CardTile__Header'>
                <p className='CardTile__Price'>{price} <span className='CardTile__Currency'>€</span></p>
                <CardImage slug={slug} sold={sold} booked={booked} photo={thumbnail}/>
            </header>
            <div className='CardTile__Content'>
                <div className='CardTile__ContentType'>
                    <AdvertChip type='type' value={type}/>
                    { isLogin && !isMyAdvert &&
                        <div className='CardTile__Actions'>
                            <button className='ButtonIcon' onClick={onOpenChat}>
                                <ForumIcon className='ChatIcon'/>
                            </button>
                            <button className='ButtonIcon' onClick={onFavoriteAdvert}>
                                <FavoriteIcon className={`FavoriteIcon FavoriteIcon--${favorite?'On':'Off'}`}/>
                            </button>
                        </div>
                    }
                </div>                
                <div className='CardTile_ContentTitle'>
                    <Link to={`advert/${slug}`} className='CardTile__Title'><h2>{name}</h2></Link>
                </div>
                <CardTags tags={tags} />
            </div>
            <div className='CardTile__Footer'>
                <CardAvatar login={user.login} name={user.name} avatar={user.avatar}/>
                <Moment className='CardTile__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
            </div>
        </article>
    );
}