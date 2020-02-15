// NPM Modules
import React, { useState, useRef } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from "react-router-dom";
// Material UI
import EuroIcon from '@material-ui/icons/Euro';
import Button from '@material-ui/core/Button';
// Own components
import Form from '../forms/Form';
import InputForm from '../forms/InputForm';
import SelectForm from '../forms/SelectForm';
import TextAreaForm from '../forms/TextAreaForm';
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Own modules
// Assets
import photoDefault from '../../assets/images/product.png';
// CSS
import './styles.css';

// Formulario de perfil de usuario
function AdvertEditForm(props) {
   
    const { t } = props;
    const submit = (inputs) => props.onSubmit(inputs);

    // Open input file
    const openInputFile = () => refInputFile.current.click();
  
    // Handle close modal
    const refInputFile = useRef(undefined);
    const [photoTemp, setPhotoTemp] = useState(undefined);
    const changeInputFile = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const aux = ev.target.files[0];
        setPhotoTemp(URL.createObjectURL(aux));
    }

    // Render
    return (
        <Form className='AdvertEditForm' onSubmit={submit} initial={props.advert}>
            <div className='AdvertEditForm__Avatar'>
                <span className='AdvertEditForm__Avatar--overlay' onClick={openInputFile}>{t('change advert photo')}</span>
                <input type='file' id='file' ref={refInputFile} style={{display: 'none'}} onChange={changeInputFile} />
                <img src={photoDefault} alt='thumbnail'/>
            </div>
            <div className='AdvertEditForm__Inputs'>
                <SelectForm name='type' label={t('Type')} options={[ADVERT_CONSTANTS.TYPE.BUY, ADVERT_CONSTANTS.TYPE.SELL]} initial={ADVERT_CONSTANTS.TYPE.BUY} required/>
                <InputForm name='name' type='text' label={t('Name')} required/>
                <SelectForm name='tags' multiple label={t('Tags')} options={props.tags} initial={[]} required/>
                <InputForm name='price' type='number' label={t('Price')} required endAdornment={<EuroIcon/>}/>
                <TextAreaForm name='description' label={t('Description')} helperText={t('Enter an advert description')} required rows={2}/>
            </div>
            <div className='AdvertEditForm__Buttons'>
                <Button type='submit' variant='contained' color='primary'> {props.t('Save')} </Button>
                <Button type='button' variant='contained' color='secondary' component={Link} to='/'> {props.t('Cancel')} </Button>
            </div>
        </Form>
    );
}

export default withNamespaces()(AdvertEditForm);