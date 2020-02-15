// NPM Modules
import React, { useState, useRef } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from "react-router-dom";
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../forms/InputForm';
import Form from '../forms/Form';
// Models
// Own modules
// Assets
import imagePhoto from '../../assets/images/user.png';
// CSS
import './styles.css';

// Formulario de perfil de usuario
function ProfileForm(props) {
   
    const { t } = props;
    const submit = (inputs) => props.onSubmit(inputs);

    // Open input file
    const openInputFile = () => refInputFile.current.click();
  
    // Handle close modal
    const refInputFile = useRef(undefined);
    const [photoTemp, setPhotoTemp] = useState(props.user.photo);
    const changeInputFile = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const aux = ev.target.files[0];
        setPhotoTemp(URL.createObjectURL(aux));
    }

    // Render
    return (
        <Form className='ProfileForm' onSubmit={submit} initial={props.user}>
            <div className='ProfileForm__Avatar'>
                <span className='ProfileForm__Avatar--overlay' onClick={openInputFile}>{t('change your avatar')}</span>
                <input type='file' id='file' ref={refInputFile} style={{display: 'none'}} onChange={changeInputFile} />
                <img src={photoTemp || imagePhoto } alt='avatar'/>
            </div>
            <div className='ProfileForm__Inputs'>
                <InputForm name='name' type='text' placeholder={t('type your name')} required icon={<FaceIcon/>}/>
                <InputForm name='login' type='text' placeholder={t('type your login')} required icon={<PermIdentityIcon/>}/>
                <InputForm name='email' type='email' placeholder={t('type your email')} required icon={<MailOutlineIcon/>}/>
                <div className='ProfileForm__Password'>
                    <p className='Title'>{t('Change Password')}</p>
                    <InputForm name='password_old' type='password' placeholder={t('type your current password')} autoComplete='on' icon={<LockOpenIcon/>}/>
                    <InputForm name='password_new_1' type='password' placeholder={t('type your new password')} autoComplete='on' icon={<LockOpenIcon/>}/>
                    <InputForm name='password_new_2' type='password' placeholder={t('repeat your new password')} autoComplete='on' icon={<LockOpenIcon/>}/>
                </div>
            </div>
            <div className='ProfileForm__Buttons'>
                <Button type='submit' variant='contained' color='primary'>{props.t('Accept')}</Button>
                <Button type='button' variant='contained' component={Link} to={'/'}>{props.t('Cancel')}</Button>
                <Button type='button' variant='contained' color='secondary' onClick={props.onRequestDeleteAccount} className=''>
                {props.t('Delete Account')}
                </Button>
            </div>
        </Form>
    );
}

export default withNamespaces()(ProfileForm);