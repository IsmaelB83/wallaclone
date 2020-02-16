// NPM Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ProfileForm from '../../components/ProfileForm';
import ModalConfirm from '../../components/ModalConfirm';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
// Models
import Session from '../../models/Session';
// Own modules
// Assets
// CSS
import './styles.css';

// Profile
function Profile(props) {

    // Translate 
    const { t } = props;

    // Delete account
    const [showModalDelete, setShowModalDelete] = useState(false);
    const requestDeleteAccount = () => setShowModalDelete(true);
    const cancelDeleteAccount = () => setShowModalDelete(false);
    const confirmDeleteAccount = () => {
        this.setState({showModalDelete: false});
        props.deleteAccount(props.session._id)
        .then(res => props.enqueueSnackbar(t('Your account and all its related data is deleted'), { variant: 'success', }))
        .catch(error => props.enqueueSnackbar(t('Error deleting account ERROR', {error}), { variant: 'error', }));
    };
     
    // Submit (save data)
    const submitProfile = (inputs) => {
      // Creo usuario desde inputs
      const { password_old, password_new_1, password_new_2 } = inputs;
      const user = new Session(inputs);
      // ¿Está intentando realizar un cambio de contraseña?
      if (password_new_1 || password_new_2) {
        if (password_new_1 !== password_new_2) return props.enqueueSnackbar(t('Error. Both passwords should match'), { variant: 'error' });        
        if (password_old === '') return props.enqueueSnackbar(t('You should enter your current password to change it'), { variant: 'error' });        
        user.password = password_new_1;
      }
      // Dispatch update user
      props.editUser(user)
        .then (res => props.enqueueSnackbar(t('User updated successfully'), { variant: 'success' }))
        .catch (error => props.enqueueSnackbar(t('Error updating user data ERROR', {error}), { variant: 'error', }));
    }

    return (
        <React.Fragment>
        <NavBar session={props.session} onLogout={props.logout}/>
        <Container className='Container__Fill'>
            <main className='Main__Section Profile'>
                <ProfileForm    noValidate 
                                autoComplete='off' 
                                className='Profile__Form'
                                user={props.session}
                                onSubmit={submitProfile} 
                                onRequestDeleteAccount={requestDeleteAccount}/>
                { props.isUpdating &&
                    <Loading text={t('Updating user data...')}/> 
                }
                { showModalDelete && 
                    <ModalConfirm   onConfirm={confirmDeleteAccount} 
                                    onCancel={cancelDeleteAccount} 
                                    visible={true} type='warning'
                                    title={t('Are you sure you want to delete your account?')}
                    /> 
                }
            </main>
        </Container>
        <Footer session={props.session} onLogout={props.logout}/>
        </React.Fragment>
    );
}

Profile.propTypes = {
  tags: PropTypes.array,
  session: PropTypes.object,
  editSession: PropTypes.func,
  logout: PropTypes.func
}

export default withNamespaces()(Profile);