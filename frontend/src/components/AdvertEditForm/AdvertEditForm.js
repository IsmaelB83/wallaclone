// NPM Modules
import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
// Material UI
import EuroIcon from '@material-ui/icons/Euro';
import Button from '@material-ui/core/Button';
// Own components
import Form from '../forms/Form';
import InputForm from '../forms/InputForm';
import SelectForm from '../forms/SelectForm';
import TextAreaForm from '../forms/TextAreaForm';
import SelectMultipleForm from '../forms/SelectMultipleForm';
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Own modules
// Assets
import photoDefault from '../../assets/images/product.png';
// CSS
import './styles.css';

// Formulario de perfil de usuario
export default function AdvertEditForm(props) {
   
    // Props destructuring
    const { t } = props;
    const submit = (inputs) => {
        if (fileTemp) {
            inputs.file = fileTemp;
            inputs.photo = '';
            inputs.thumbnail = '';
        }
        props.onSubmit(inputs);
    }

    // Open input file
    const openInputFile = () => refInputFile.current.click();
  
    // Handle close modal
    const refInputFile = useRef(undefined);
    const [fileTemp, setFileTemp] = useState();
    const [photoTemp, setPhotoTemp] = useState(props.advert.photo);
    const changeInputFile = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const aux = ev.target.files[0];
        setFileTemp(aux);
        setPhotoTemp(URL.createObjectURL(aux));
    }

    // Render
    return (
        <Form className='AdvertEditForm' validate onSubmit={submit} initial={props.advert}>
            <div className='AdvertEditForm__Photo'>
                <span className='AdvertEditForm__Photo--overlay' onClick={openInputFile}>{t('change advert photo')}</span>
                <input type='file' id='file' ref={refInputFile} style={{display: 'none'}} onChange={changeInputFile} />
                <img src={photoTemp || photoDefault} alt='thumbnail'/>
            </div>
            <div className='AdvertEditForm__Inputs'>
                <SelectForm name='type' label={t('Type')} options={[ADVERT_CONSTANTS.TYPE.BUY, ADVERT_CONSTANTS.TYPE.SELL]} initial={ADVERT_CONSTANTS.TYPE.SELL} required/>
                <InputForm name='name' type='text' label={t('Name')} maxLength={"40"} required/>
                <SelectMultipleForm name='tags' label={t('Tags')} options={props.tags} initial={[]} chip='tag' required/>
                <InputForm name='price' type='number' label={t('Price')} required maxLength={10} endAdornment={<EuroIcon/>}/>
                <TextAreaForm name='description' label={t('Description')} placeholder={t('Enter an advert description')} maxLength={"150"} required rows={2}/>
            </div>
            <div className='AdvertEditForm__Buttons'>
                <Button type='submit' variant='contained' color='primary'> {props.t('Save')} </Button>
                <Button type='button' variant='contained' color='secondary' component={Link} to='/'> {props.t('Cancel')} </Button>
            </div>
        </Form>
    );
}