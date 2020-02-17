// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import ViewListIcon from '@material-ui/icons/ViewList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import ChatIcon from '@material-ui/icons/Chat';
// Own components
// Assets
// CSS
import './styles.css';

// Componente NavBar
export default function Footer(props) {

    // Función traducción
    const { t } = props;
     
    // Render del componente
    return (
        <footer title='Wallaclone' className='Footer'>
            <Container>
            { props.session && props.session.avatar &&
                <div className='Footer__Menu'>
                    <MenuItem className='Footer__MenuItem' component={Link} to={`/published/${props.session.login}`}>
                        <ViewListIcon fontSize='small' />
                        <span>{t('My adverts')}</span>
                    </MenuItem>
                    <MenuItem className='Footer__MenuItem' component={Link} to='/history'>
                        <TrendingUpIcon fontSize='small' />
                        <span>{t('Sold History')}</span>
                    </MenuItem>
                    <MenuItem className='Footer__MenuItem' component={Link} to='/favorites'>
                        <FavoriteIcon fontSize='small' />
                        <span>{t('Favorites')}</span>
                    </MenuItem>
                    <MenuItem className='Footer__MenuItem' component={Link} to='/profile'>
                        <ChatIcon fontSize='small' />
                        <span>{t('Messages')}</span>
                    </MenuItem>
                    <MenuItem className='Footer__MenuItem' component={Link} to='/profile'>
                        <Avatar className='Avatar' alt='avatar' src={props.session.avatar}/>
                        <span>{t('Profile')}</span>
                    </MenuItem>
                </div>
            }
            { ( !props.session || !props.session.avatar ) &&
                <div className='Footer__Content'>
                    <div className='Footer__Email'>
                        <MailOutlineIcon className='Mail__Icon'/>
                        <a href='mailto: ismaelbernal83@gmail.com'>ismaelbernal83@gmail.com</a>
                    </div>
                    <div className='SocialLinks'>
                        <a className='SocialLinks__link SocialLinks__link--facebook' href='https://laestanciaazul.com'><HomeIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--github' href='https://github.com/IsmaelB83'><GitHubIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--linkedin' href='https://www.linkedin.com/in/ismael-bernal-10497a51/'><LinkedInIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--instagram' href='https://www.instagram.com/isma83_/'><InstagramIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--twitter' href='https://twitter.com/Ismab83'><TwitterIcon /></a>
                    </div>
                </div>
            }
            </Container>
        </footer>
    );
}