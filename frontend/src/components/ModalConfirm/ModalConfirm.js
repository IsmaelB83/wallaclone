// NPM Modules
import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// Own modules
// Models
// Assets
import imgWarning from '../../assets/images/warning.png';
import imgConfirmation from '../../assets/images/confirmation.png';
// CSS
import './styles.css';

// Functional component to render an advert card
function ModalConfirm (props) {
    
    // Translate
    const { t } = props;
    
    // Actions
    const [visible, setVisible] = useState(props.visible);
    const confirm = () => { setVisible(false); props.onConfirm(); }
    const cancel = () => { setVisible(false); props.onCancel(); }

    // Render
    return(
        <Dialog className='ModalConfirm' open={visible} onClose={cancel}>
            <div className='ModalConfirm__Wrapper'>
                <img src={props.type==='warning'?imgWarning:imgConfirmation} className='ModalConfirm__Image' alt='wallaclone-logo' />
                <DialogTitle className='ModalConfirm__Title'>{props.title}</DialogTitle>
                <DialogActions className='ModalConfirm__Actions'>
                    <Button onClick={confirm} variant='contained' className='ButtonWallaclone ButtonWallaclone__Green'>{t('Aceptar')}</Button>
                    <Button onClick={cancel} variant='contained' color='secondary'>{t('Cancelar')}</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default withNamespaces()(ModalConfirm);