// NPM Modules
import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
// Material UI
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
// Own components
import InputForm from '../InputForm';
import Form from '../Form';
// Models
// Own modules
// Assets
import imagePhoto from '../../../assets/images/user.png';
// CSS
import './styles.css';

// Formulario de perfil de usuario
export default function ProfileForm(props) {
   
    const { t } = props;
    const submit = (inputs) => {
        if (fileTemp) {
            inputs.file = fileTemp;
            inputs.avatar = '';
        }
        props.onSubmit(inputs);
    }

    // Open input file
    const openInputFile = () => refInputFile.current.click();
  
    // Handle close modal
    const refInputFile = useRef(undefined);
    const [fileTemp, setFileTemp] = useState();
    const [photoTemp, setPhotoTemp] = useState(props.user.avatar);
    const changeInputFile = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const aux = ev.target.files[0];
        setFileTemp(aux);
        setPhotoTemp(URL.createObjectURL(aux));
    }

    // Render
    return (
        <Form className='ProfileForm' onSubmit={submit} initial={props.user}>
            <div className='ProfileForm__Photo'>
                <span className='ProfileForm__Photo--overlay' onClick={openInputFile}>{t('change your avatar')}</span>
                <input type='file' id='file' ref={refInputFile} style={{display: 'none'}} onChange={changeInputFile} />
                <img src={photoTemp || imagePhoto } alt='avatar'/>
            </div>
            <div className='ProfileForm__Inputs'>
                <InputForm name='name' type='text' placeholder={t('type your name')} maxLength={"30"} required startIcon={<FaceIcon/>}/>
                <InputForm name='login' type='text' placeholder={t('type your login')} maxLength={"15"} required startIcon={<PermIdentityIcon/>}/>
                <InputForm name='email' type='email' placeholder={t('type your email')} maxLength={"150"} required startIcon={<MailOutlineIcon/>}/>
                <div className='ProfileForm__Password'>
                    <p className='Title'>{t('Change Password')}</p>
                    <InputForm name='password_old' type='password' placeholder={t('type your current password')} maxLength={"15"} autoComplete='on' startIcon={<LockOpenIcon/>}/>
                    <InputForm name='password_new_1' type='password' placeholder={t('type your new password')} maxLength={"15"} autoComplete='on' startIcon={<LockOpenIcon/>}/>
                    <InputForm name='password_new_2' type='password' placeholder={t('repeat your new password')} maxLength={"15"} autoComplete='on' startIcon={<LockOpenIcon/>}/>
                </div>
            </div>
            <div className='ProfileForm__Buttons'>
                <Button type='submit' variant='contained' color='primary'>{props.t('Accept')}</Button>
                <Button type='button' variant='contained' color='secondary' component={Link} to={'/'}>{props.t('Cancel')}</Button>
                <Button type='button' variant='contained' className='ButtonStandard ButtonStandard__Red' onClick={props.onRequestDeleteAccount}>{props.t('Delete Account')}</Button>
            </div>
        </Form>
    );
}