// NPM Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import i18n from '../../utils/i18n';
import moment from 'moment';
// Material UI
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import ViewListIcon from '@material-ui/icons/ViewList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// Own modules
// Assets
import imageLogo from '../../assets/images/logo2.png';
import imageAvatar from '../../assets/images/user.png';
import imageES from '../../assets/images/es.png';
import imageGB from '../../assets/images/gb.png';
// CSS
import './styles.css';

/**
 * Componente NavBar (uso del hook useState)
 */
function NavBar(props) {

    // Función traducción
    const { t } = props;

    // Estado del componente funcional mediante el 'useState hook'
    const [anchorUserMenu, setAnchorUserMenu] = useState(null);
    
    // Change language
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        moment.locale('es');
    }
      
    // Render del componente
    return (
        <AppBar title='Wallaclone' position='static' className='NavBar'>
        <Container>
        <Toolbar className='NavBar__Toolbar'>
            <Link to='/' className='NavBar__Brand'><img src={imageLogo} alt='logo' className='NavBar__Brand'/></Link>
            <div className='NavBar__Right'>
                <div className='NavBar__Flags'>
                    <IconButton onClick={() => changeLanguage('es')}><img src={imageES} alt='es' className='NavBar__Brand'/></IconButton>
                    <IconButton onClick={() => changeLanguage('en')}><img src={imageGB} alt='gb' className='NavBar__Brand'/></IconButton>
                </div>
                { props.session.email &&
                    <div className='NavBar__Account'>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='menu-NavBar'
                            aria-haspopup='true'
                            onClick={ (ev) => setAnchorUserMenu(ev.currentTarget) }
                            color='inherit'
                            className='NavBar__User' 
                            >
                                <Avatar className='Avatar' alt={props.session.name} src={imageAvatar}/>
                                <span className='NavBar__User--hiddenXS'>{props.session.name}</span>
                            <KeyboardArrowDownIcon/>
                        </IconButton>
                        <Menu
                        className='NavBar__Menu'
                        id='menu-navbar'
                        anchorEl={anchorUserMenu}
                        keepMounted
                        open={anchorUserMenu?true:false}
                        onClose={ () => setAnchorUserMenu(null) }
                        >
                        <MenuItem className='NavBar__MenuItem' component={Link} to='/advert/create' onClick={() => setAnchorUserMenu(null)}>
                            <ListItemIcon className='NavBar__MenuItemIcon'>
                            <PostAddIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText className='NavBar__MenuItemText' primary={t('Add advert')} />
                        </MenuItem>
                        <MenuItem className='NavBar__MenuItem' component={Link} to={`/published/${props.session.login}`} onClick={() => setAnchorUserMenu(null)}>
                            <ListItemIcon className='NavBar__MenuItemIcon'>
                            <ViewListIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText className='NavBar__MenuItemText' primary={t('My adverts')} />
                        </MenuItem>
                        <MenuItem className='NavBar__MenuItem' component={Link} to='/favorites' onClick={() => setAnchorUserMenu(null)}>
                            <ListItemIcon className='NavBar__MenuItemIcon'>
                            <FavoriteIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText className='NavBar__MenuItemText' primary={t('Favorites')} />
                        </MenuItem>
                        <MenuItem className='NavBar__MenuItem' component={Link} to='/profile' onClick={() => setAnchorUserMenu(null)}>
                            <ListItemIcon className='NavBar__MenuItemIcon'>
                            <AccountCircleIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText className='NavBar__MenuItemText' primary={t('Profile')} />
                        </MenuItem>
                        <MenuItem className='NavBar__MenuItem' component={Link} to='/' onClick={() => props.logout(props.session.jwt)}>
                            <ListItemIcon className='NavBar__MenuItemIcon'>
                            <ExitToAppIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText className='NavBar__MenuItemText' primary={t('Logout')} />
                        </MenuItem>
                        </Menu>
                    </div>
                }
                { !props.session.email &&
                    <div className='NavBar__Login'>
                        <IconButton color='inherit' className='NavBar__User' component={Link} to='/login'>
                            <PermIdentityIcon/> <span className='NavBar__User--hiddenXS'>{t('LOGIN')}</span>
                        </IconButton>
                    </div>
                }
            </div>
        </Toolbar>
        </Container>
        </AppBar>
    );
}

export default withNamespaces()(NavBar);