// NPM Modules
import React, { useState } from 'react';
// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
// Own Components
import AdvertChip from '../AdvertChip';
// Own modules
// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';
// Assets
// CSS
import './styles.css';

// Panel de búsquedas
export default function SearchPanel(props) {

    // Translate
    const { t } = props;

    // Initial state del componente
    const initialState = {
        name: '',
        type: ADVERT_CONSTANTS.TYPE.ALL,
        tag: ADVERT_CONSTANTS.TAG.ALL,
        priceFrom: 0,
        priceTo: 0
    }

    // Uso del hook useState
    const [inputs, setInputs] = useState(initialState);

    // Cambio en alguno de los campo del formulario
    const handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        const formInputs = {...inputs, [name]: value};
        setInputs(formInputs);
        // Los campos numérico NO lanzan busqueda automática (salvo que estén en blanco). El resto de campos lanzan búsqueda en tiempo real
        if (!name.startsWith('price') || (name.startsWith('price') && inputs[name] === '')) {
            props.onSetFilters(formInputs);
        }
    }  

    // Reseteo el estado a los valores originales de búsqueda
    const handleInputReset = () => {
        const formInputs = initialState;
        formInputs.tag = ADVERT_CONSTANTS.TAG.ALL;
        setInputs(formInputs)
        props.onSetFilters(formInputs);
        props.onSearchAdverts();
    }
  
    /**
     * Reseteo el estado a los valores originales de búsqueda
     */
    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.onSearchAdverts(inputs);
    }

    // Render del componente
    return (
        <form className='SearchPanel' onSubmit={handleSubmit}>
            <h2>{t('Filter criteria')}</h2>
            <div className='InputSearch'>
                <SearchIcon className='InputSearch__Icon InputSearch__Icon--start'/>
                <input 
                    id='filter_name'
                    name='name'
                    type='text' 
                    value={inputs.name}
                    onChange={handleInputChange}
                    className='InputSearch__Input'
                    autoComplete='off'
                    placeholder={t('Search adverts by name')}
                />
            </div>   
            <div className='SearchPanel__Filters'>
                <FormControl>
                    <InputLabel shrink htmlFor='type'>{t('Type')}</InputLabel>
                    <Select
                        id='filter_type'
                        name= 'type'
                        onChange={handleInputChange}
                        className='SearchPanel__Type'
                        value={inputs.type}
                        displayEmpty
                    >
                        <MenuItem key={ADVERT_CONSTANTS.TYPE.ALL} value={ADVERT_CONSTANTS.TYPE.ALL}>
                            <AdvertChip type='type' value={ADVERT_CONSTANTS.TYPE.ALL}/>
                        </MenuItem>
                        <MenuItem key={ADVERT_CONSTANTS.TYPE.BUY} value={ADVERT_CONSTANTS.TYPE.BUY}>
                            <AdvertChip type='type' value={ADVERT_CONSTANTS.TYPE.BUY}/>
                        </MenuItem>
                        <MenuItem key={ADVERT_CONSTANTS.TYPE.SELL} value={ADVERT_CONSTANTS.TYPE.SELL}>
                            <AdvertChip type='type' value={ADVERT_CONSTANTS.TYPE.SELL}/>
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel shrink htmlFor='tag'>{t('Tag')}</InputLabel>
                    <Select
                        id='filter_tag'
                        name='tag'
                        value={inputs.tag}
                        onChange={handleInputChange}
                        displayEmpty
                    >
                        <MenuItem key={ADVERT_CONSTANTS.TAG.ALL} value={ADVERT_CONSTANTS.TAG.ALL}>
                            <AdvertChip type='tag' value={ADVERT_CONSTANTS.TAG.ALL}/>
                        </MenuItem>
                        {   props.tags.map((value, key) => <MenuItem key={key} value={value}><AdvertChip type='tag' value={value}/></MenuItem>) }
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='minPrice'>{t('Price from')}</InputLabel>
                    <Input
                        id='filter_minPrice'
                        name='minPrice'
                        type='number'
                        value={parseFloat(inputs.minPrice) || 0}
                        onChange={handleInputChange}
                        endAdornment={<InputAdornment position='start'>€</InputAdornment>}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='maxPrice'>{t('Price to')}</InputLabel>
                    <Input
                        id='filter_maxPrice'
                        name='maxPrice'
                        type='number'
                        value={parseFloat(inputs.maxPrice) || 0}
                        onChange={handleInputChange}
                        endAdornment={<InputAdornment position='start'>€</InputAdornment>}
                />
                </FormControl>
            </div> 
            <div className='SearchPanel__Footer'>
                <Button type='submit' variant='contained' color='primary' startIcon={<SearchIcon />}>{t('Search')}</Button>
                <Button variant='contained' color='secondary' onClick={handleInputReset} startIcon={<ClearIcon/>}> {t('Reset')} </Button>
            </div>
        </form>
    );
}