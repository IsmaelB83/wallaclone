// NPM Modules
import React from 'react';
import Modal from 'react-awesome-modal';
// Material UI
import Button from '@material-ui/core/Button';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render an advert card
 */
export default function ModalConfirm (props) {

    return(
        <Modal visible={true} width="640" height="480" effect="fadeInUp" onClickAway={props.onCancel}>
            <h1>¿Está seguro de borrar el anuncio?</h1>
            <Button onClick={props.onConfirm}>Si</Button>
            <Button onClick={props.onCancel}>No</Button>
        </Modal>
    );
}

/*
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

<Dialog open={this.state.openModal} className='AdvertEdit__Modal'>
    <DialogTitle className='Modal_Title'>
        URL de la imagen
    </DialogTitle>
    <DialogContent className='Modal__Content'>
        <DialogContentText>
        La API de nodepop no admite carga de imagenes locales por el momento. Por favor, indique la URL a la imagen que desea añadir al anuncio
        </DialogContentText>
        <TextField
        autoFocus
        name='photoTemp'
        value={this.state.photoTemp}
        onChange={(ev)=>{this.setState({photoTemp: ev.target.value})}}
        margin='dense'
        label='URL Imagen'
        type='text'
        fullWidth
        />
    </DialogContent>
    <DialogActions className='Modal__Actions'>
        <Button onClick={this.handleChangePhoto} variant='contained' startIcon={<CheckIcon />} className='ButtonWallakeep ButtonWallakeep__Green'>
        Aceptar
        </Button>
        <Button onClick={this.handleSwitchOpen} variant='contained' startIcon={<CancelIcon />} color='secondary'>
        Cancelar
        </Button>
    </DialogActions>
</Dialog> */